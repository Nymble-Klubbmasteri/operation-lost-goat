'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt, { hash } from "bcrypt";
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { getGCSClient } from './gcs';
import sharp from 'sharp';
import { getStreckPrice } from './data';


const bucketName = process.env.GCS_BUCKET_NAME!;
const storage = getGCSClient().bucket(bucketName);

async function uploadToGCS(file: File, filename: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileRef = storage.file(filename);

  const pngBuffer = await sharp(buffer).png().toBuffer();


  await fileRef.save(pngBuffer, {
    resumable: false,
    public: true,
    metadata: { contentType: file.type }}
  );

  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

export type InvoiceState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type UserState = {
  errors?: {
    id?: string[];
    name?: string[];
    email?: string[];
    balance?: string[];
    password?: string[];
    admin?: string[];
    role?: string[];
    image_nice?: string[];
    image_chaotic?: string[];
  };
  message?: string | null;
}

export type EventState = {
  errors?: {
    id?: string[];
    name?: string[];
    start_work_time?: string[];
    start_event_time?: string[];
    end_event_time?: string[];
    end_work_time?: string[];
    locations?: string[];
    responsible?: string[];
    type?: string[];
    sought_workers?: string[];
    date?: string[],
    notes?: string[];
  }
}
 
const InvoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),  
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select an invoice status.', 
    }),
  date: z.string(),
});

const UserFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  balance: z.coerce.number({
    required_error: "balance is required",
    invalid_type_error: "balance must be a number",}),
  password: z.string(),
  role: z.string(),
  admin: z.string(),
  likes: z.string(),
  dislikes: z.string(),
  title: z.string(),
  nickname: z.string()
});

const EventFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  start_work_time: z.string(),
  start_event_time: z.string(),
  end_work_time: z.string(),
  end_event_time: z.string(),
  locations: z.string(),
  responsible: z.string(),
  sought_workers: z.coerce.number(),
  type: z.coerce.number(),
  date: z.string(),
  notes: z.string(),
  workers: z.string().array()
});
 
const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
export async function createInvoice(prevState: InvoiceState, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

    // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
      await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
      return {
          message: 'Database failed to create invoice.',
      };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const CreateUser = UserFormSchema.omit({id: true, image_chaotic_url: true, image_nice_url: true, likes: true, dislikes: true});
export async function createUser(prevState: UserState, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    balance: formData.get('balance'),
    password: formData.get('password'),
    role: formData.get('role'),
    admin: formData.get('admin'),
    title: formData.get('title'),
    nickname: formData.get('nickname'),

  });

  // console.log("hi! create_user 1");
  if (!validatedFields.success) {
    console.error("Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice',
    };
  }
  // console.log("hi! create_user 2");

  // Prepare Data for insertion into the database
  const {name, email, balance, password, role, admin, title, nickname} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("hi! create_user 3");

  try {
    await sql`
      INSERT INTO users (name, email, password, balance, role, admin, title, nickname)
      VALUES (${name}, ${email}, ${hashedPassword}, ${balance}, ${role}, ${admin}, ${title}, ${nickname})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database failed to create user',
    };
  }
  // console.log("hi! create_user 4");

  revalidatePath('/dashboard/admin/users');
  redirect('/dashboard/admin/users');
}

const CreateEvent = EventFormSchema.omit({id: true, workers: true});
export async function createEvent(prevState: EventState, formData: FormData) {
  const validatedFields = CreateEvent.safeParse({
    name: formData.get('name'),
    date: formData.get('date'),
    start_work_time: formData.get('start_work_time'),
    start_event_time: formData.get('start_event_time'),
    end_work_time: formData.get('end_work_time'),
    end_event_time: formData.get('end_event_time'),
    locations: formData.get('locations'),
    responsible: formData.get('responsible'),
    type: formData.get('type'),
    sought_workers: formData.get('sought_workers'),
    notes: formData.get('notes')
  });

  // console.log("hi! create_event 1");
  if (!validatedFields.success) {
    console.error("Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice',
    };
  }
  // console.log("hi! create_event 2");

  // Prepare Data for insertion into the database
  const { name, date, start_work_time, start_event_time, end_work_time, end_event_time, locations, responsible, type, sought_workers, notes } = validatedFields.data;
  // console.log("hi! create_event 3");

  try {
    await sql`
      INSERT INTO events (name, date, start_work_time, start_event_time, end_work_time, end_event_time, locations, type, sought_workers, notes)
      VALUES (${name}, ${date}, ${start_work_time}, ${start_event_time}, ${end_work_time}, ${end_event_time}, ${locations}, ${type}, ${sought_workers}, ${notes})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database failed to create event',
    };
  }
  // console.log("hi! create_event 4");

  revalidatePath('/dashboard/admin/events');
  redirect('/dashboard/admin/events');
}

  // Use Zod to update the expected types
const UpdateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
export async function updateInvoice(
  id: string,
  prevState: InvoiceState,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


const UpdateUser = UserFormSchema.omit({id: true, image_chaotic_url: true, image_nice_url: true, likes: true, dislikes: true})
export async function updateUser(
  id: string,
  prevState: UserState,
  formData: FormData,  
) {

  const validatedFields = UpdateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    balance: formData.get('balance'),
    password: formData.get('password'),
    role: formData.get('role'),
    admin: formData.get('admin'),
    nickname: formData.get('nickname'),
    title: formData.get('title')
  });


  if (!validatedFields.success){
    console.error("Errors:", validatedFields.error.flatten().fieldErrors);
    console.error("Balance type: ",typeof formData.get('balance'))
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update user.',
    };
  }


  var { name, email, balance, password, role, admin, nickname, title } = validatedFields.data;
  email = email.toLowerCase();

  if (password.length >= 6) {
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("update: role:", role, "admin:", admin);
    try {
      await sql`
        UPDATE users
        SET name = ${name}, email = ${email}, balance = ${balance}, password = ${hashedPassword}, role = ${role}, admin = ${admin}, nickname = ${nickname}, title = ${title}
        WHERE id = ${id} 
      `;
  
    } catch (error) {
      console.error("Update user error 1: ", error);
      return {message: 'Database Error: Failed to Update User'};
    }
  } else {
    // console.log("update: role:", role, "admin:", admin);
    try {
      await sql`
        UPDATE users
        SET name = ${name}, email = ${email}, balance = ${balance}, role = ${role}, admin = ${admin}, nickname = ${nickname}, title = ${title}
        WHERE id = ${id}
      `;
  
    } catch (error) {
      console.error("Update user error 2: ", error);
      return {message: 'Database Error: Failed to Update User'};
    }
  } 

  revalidatePath('/dashboard/admin/users');
  redirect('/dashboard/admin/users');
}

const UpdateProfile = UserFormSchema.omit({id: true, balance: true, role: true, admin: true, title: true})
export async function updateProfile(
  id: string,
  prevState: UserState,
  formData: FormData,  
) {
  const validatedFields = UpdateProfile.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    likes: formData.get('likes'),
    dislikes: formData.get('dislikes'),
    nickname: formData.get('nickname')
  });

  if (!validatedFields.success) {
    console.error("Validated fields error:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update user.',
    };
  }

  var { name, email, password, likes, dislikes, nickname } = validatedFields.data;
  email = email.toLowerCase();
  // console.log("likes:", likes);
  // console.log("dislikes:", dislikes);


  // ⬇️ Handle file uploads
  const niceFile = formData.get('image_nice') as File | null;
  const chaoticFile = formData.get('image_chaotic') as File | null;

  let niceUrl = null;
  let chaoticUrl = null;

  if (niceFile && niceFile.size > 0) {
    const filename = `users/nice-${id}.png`;
    niceUrl = await uploadToGCS(niceFile, filename);
  }

  if (chaoticFile && chaoticFile.size > 0) {
    const filename = `users/chaotic-${id}.png`;
    chaoticUrl = await uploadToGCS(chaoticFile, filename);
  }

  var hashedPassword;
  // ⬇️ Update user record with optional image URLs
  if (password.length >= 6) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // await sql`
  // ALTER TABLE users
  // ADD nickname VARCHAR(255);
  // `;
  // console.log("hash: ", hashedPassword);
  // console.log("niceurl: ", niceUrl);
  // console.log("chaoticurl: ", chaoticUrl);

  try {
    // const res = await sql`${sql_string}`;
    var res2;
    var res3;
    var res4;
    const res1 = await sql`
      UPDATE users
      SET
        name = ${name},
        email = ${email},
        likes = ${likes},
        dislikes = ${dislikes},
        nickname = ${nickname}
      WHERE id = ${id}
    `;
    if (hashedPassword ) {
      res2 = await sql`
        UPDATE users
        SET
          password = ${hashedPassword}
        WHERE id = ${id}
      `;
    }
    if (niceUrl ) {
      res3 = await sql`
        UPDATE users
        SET
          image_nice_url = ${niceUrl}
        WHERE id = ${id}
      `;
    }
    if (chaoticUrl ) {
      res4 = await sql`
        UPDATE users
        SET
          image_chaotic_url = ${chaoticUrl}
        WHERE id = ${id}
      `;
    }

    // console.log("result from updating user basics: ", res1);
    // if (res2) {
    //   console.log("result from updating user password: ", res2);
    // }
    // if (res3) {
    //   console.log("result from updating user nice url: ", res3);
    // }
    // if (res4) {
    //   console.log("result from updating user chaotic url: ", res4);
    // }
  } catch (error) {
    // console.log("AAAAAAAAH");
    console.log("error: ", error);
    console.error("Error:", error);
    return { message: 'Database Error: Failed to Update User' };
  }
  revalidatePath('/dashboard/profile');
  redirect('/dashboard/profile');
}

const UpdateEvent = EventFormSchema.omit({id: true, workers: true})
export async function updateEvent(
  id: string,
  prevState: EventState,
  formData: FormData,  
) {

  const validatedFields = UpdateEvent.safeParse({
    name: formData.get('name'),
    date: formData.get('date'),
    start_work_time: formData.get('start_work_time'),
    start_event_time: formData.get('start_event_time'),
    end_work_time: formData.get('end_work_time'),
    end_event_time: formData.get('end_event_time'),
    locations: formData.get('locations'),
    type: formData.get('type'),
    sought_workers: formData.get('sought_workers'),
    responsible: formData.get('responsible'),
    notes: formData.get('notes')
  });


  if (!validatedFields.success){
    console.error("Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update event.',
    };
  }


  const { name, date, start_work_time, start_event_time, end_work_time, end_event_time, locations, responsible, type, sought_workers, notes } = validatedFields.data;
  try {
    await sql`
      UPDATE events
      SET 
        name = ${name},
        start_work_time = ${start_work_time},
        start_event_time = ${start_event_time},
        end_event_time = ${end_event_time},
        end_work_time = ${end_work_time},
        locations = ${locations},
        responsible = ${responsible},
        type = ${type},
        sought_workers = ${sought_workers},
        date = ${date},
        notes = ${notes}
      WHERE id = ${id} 
    `;

  } catch (error) {
    console.error('Updating event failed:', error);
    return {message: 'Database Error: Failed to Update Event'};
  }

  revalidatePath('/dashboard/admin/events');
  redirect('/dashboard/admin/events');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');      
    } catch (error) {
        return {
            message: 'Database failed to delete invoice.',
        };
    }

}

export async function deleteUser(id: string) {
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath('/dasboard/admin/users');
  } catch (error) {
    return {
      message: 'Database failed to delete user',
    };
  }
}

export async function deleteEvent(id: string) {
  try {
    await sql`DELETE FROM events WHERE id = ${id}`;
    revalidatePath('/dasboard/admin/events');
  } catch (error) {
    return {
      message: 'Database failed to delete event',
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function strecka(id: string, num_streck: number) {
  try {
    const sp = await getStreckPrice();
    let spv = 20;
    if (sp?.value) {
      spv = sp.value as unknown as number;
    }

    // Fetch the user's current balance
    if (num_streck < 1) {
      revalidatePath('/dashboard');
    } else {
      for (let index = 0; index < num_streck; index++) {
        const result = await sql`SELECT balance FROM users WHERE id = ${id}`;
        const balance = result.rows[0]?.balance ?? 0;
    
        // Determine the deduction amount
        const deduction = balance < 0 ? spv + 5 : spv;
    
        // Update the balance
        await sql`
          UPDATE users 
          SET balance = balance - ${deduction} 
          WHERE id = ${id}`;
        await sql`
          INSERT INTO streck (user_id, amount)
          VALUES (${id}, ${deduction})
        `;
      }
      revalidatePath('/dasboard');
    }
  } catch (error) {
    console.error("Strecka, error:", error);
    return {
      message: 'Database failed to strecka',
    };
  }
}

export async function AddUserToEvent(event_id: string, user_id: string) {
  // console.log("add user to event 1");
  try {
    await sql`
      UPDATE events
      SET workers = 
        CASE 
          WHEN array_position(workers, ${user_id}::uuid) IS NULL 
          THEN array_append(workers, ${user_id}::uuid) 
          ELSE workers 
        END
      WHERE id = ${event_id}::uuid;
    `;
    // console.log("added");
    // const event = await sql`
    //   SELECT
    //     events.id,
    //     events.name,
    //     events.workers
    //   FROM events
    //   WHERE events.id = ${event_id}::uuid;
    // `;
    // console.log("added user to event", event.rows[0]);

  } catch (error) {
    // console.log(error);
    console.error("Error adding user to event:", error);
    return { success: false, message: "Failed to add user to event." };
  }
  // console.log("add user to event 2");
  revalidatePath(`dashboard/events/${event_id}/see`);
}

export async function RemoveUserFromEvent(event_id: string, user_id: string) {
  try {
    await sql`
      UPDATE events
      SET workers = array_remove(workers, ${user_id}::uuid)
      WHERE id = ${event_id}::uuid AND ${user_id} = ANY(workers)
    `;
  } catch (error) {
    console.error('Error removing user from event:', error);
    return { success: false, message: 'Failed to remove user from event' };
  }
  revalidatePath(`dashboard/events/${event_id}/see`);
}

export async function AdminRemoveUserFromEvent(event_id: string, user_id: string) {
  try {
    await sql`
      UPDATE events
      SET workers = array_remove(workers, ${user_id}::uuid)
      WHERE id = ${event_id}::uuid AND ${user_id} = ANY(workers)
    `;
  } catch (error) {
    console.error('Error removing user from event:', error);
    return { success: false, message: 'Failed to remove user from event' };
  }
  revalidatePath(`dashboard/admin/events/${event_id}/edit`);
}

export async function updateSetting(key: string, value: string) {
  await sql`
    UPDATE settings
    SET value = ${value}
    WHERE key = ${key}
  `;
  revalidatePath('/dashboard/admin/administration'); 
  redirect('/dashboard/admin/administration');
}

export async function resetStrecklistaPermanent() {
  //scaaaaarrryyyyy
  try {
    await sql`DROP TABLE IF EXISTS streck`;
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // create the "streck" table if it doesnt exist
    await sql`
      CREATE TABLE IF NOT EXISTS streck (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        time DATE DEFAULT NOW(),
        amount INT
      );
      UPDATE users
      SET
        balance = 0
    `;
  } catch (error) {
    console.error("error when reseting strecklista:", error);
  }
  
}