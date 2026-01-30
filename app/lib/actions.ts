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
import { Streck, User } from './definitions';

const bucketName = process.env.GCS_BUCKET_NAME!;
const storage = getGCSClient().bucket(bucketName);

async function uploadToGCS(file: File, filename: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileRef = storage.file(filename);

  const pngBuffer = await sharp(buffer).png().toBuffer();

  await fileRef.save(pngBuffer, {
    resumable: false,
    public: true,
    metadata: { contentType: file.type }
  }
  );

  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

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
    priority?: string[];
    food_pref?: string[];
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
    open?: string[];
  }
}

const UserFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  balance: z.coerce.number({
    required_error: "balance is required",
    invalid_type_error: "balance must be a number",
  }),
  password: z.string(),
  role: z.string(),
  admin: z.string(),
  likes: z.string(),
  dislikes: z.string(),
  title: z.string(),
  nickname: z.string(),
  priority: z.coerce.number(),
  food_pref: z.string(),
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
  workers: z.string().array(),
  open: z.coerce.number(),
  reserves: z.string().array()
});

const CreateUser = UserFormSchema.omit({ id: true, likes: true, dislikes: true, priority: true, food_pref: true });
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

  if (!validatedFields.success) {
    console.error("Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice',
    };
  }

  // Prepare Data for insertion into the database
  var { name, email, balance, password, role, admin, title, nickname } = validatedFields.data;
  email = email.toLocaleLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO users (name, email, password, balance, role, admin, title, nickname, priority)
      VALUES (${name}, ${email}, ${hashedPassword}, ${balance}, ${role}, ${admin}, ${title}, ${nickname}, 10)
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database failed to create user',
    };
  }

  revalidatePath('/dashboard/admin/users');
  redirect('/dashboard/admin/users');
}

const CreateEvent = EventFormSchema.omit({ id: true, workers: true, open: true, reserves: true });
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

  if (!validatedFields.success) {
    console.error("Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice',
    };
  }

  // Prepare Data for insertion into the database
  const { name, date, start_work_time, start_event_time, end_work_time, end_event_time, locations, responsible, type, sought_workers, notes } = validatedFields.data;

  console.log("Create Event, date:", date);

  try {
    await sql`
      INSERT INTO events (name, date, start_work_time, start_event_time, end_work_time, end_event_time, locations, type, sought_workers, notes, responsible)
      VALUES (${name}, ${date}, ${start_work_time}, ${start_event_time}, ${end_work_time}, ${end_event_time}, ${locations}, ${type}, ${sought_workers}, ${notes}, ${responsible})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database failed to create event',
    };
  }

  revalidatePath('/dashboard/admin/events');
  redirect('/dashboard/admin/events');
}

const UpdateUser = UserFormSchema.omit({ id: true, likes: true, dislikes: true })
export async function updateUser(
  id: string,
  admin_id: string,
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
    title: formData.get('title'),
    priority: formData.get('priority'),
    food_pref: formData.get('food_pref'),
  });

  if (!validatedFields.success) {
    console.error("Errors:", validatedFields.error.flatten().fieldErrors);
    console.error("Balance type: ", typeof formData.get('balance'))
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update user.',
    };
  }

  var { name, email, balance, password, role, admin, nickname, title, priority, food_pref } = validatedFields.data;
  email = email.toLowerCase();
  if (priority) {

  } else {
    priority = 10;
  }

  // try {
  //   let r = await sql`
  //   ALTER TABLE users
  //   ADD food_pref TEXT
  //   `;
  //   console.log("add users: ", r);

  //   let r2 = await sql`
  //     SELECT
  //       *
  //     FROM 
  //       users
  //     WHERE
  //       name ILIKE "David Schalin"
  //   `;
  //   console.log("r2: ", r2.rows[0]);
  // } catch (error) {
  //   console.error("ERROR: ", error);
  // }

  // Log balance updates:
  try {
    let res;

    // Run ONCE
    // res = await sql`
    // DROP TABLE IF EXISTS logs
    // `;
    // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // res = await sql`
    // CREATE TABLE IF NOT EXISTS logs(
    //   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    //   user_id UUID NOT NULL,
    //   type TEXT,
    //   value TEXT,
    //   time DATE DEFAULT NOW(),
    //   admin_id UUID NOT NULL
    // );
    // `;

    // Actual code:
    res = await sql<User>`
    SELECT *
    FROM users
    WHERE id = ${id}
    `;
    if ((res.rows[0].balance as unknown as number) != balance) {
      const diff = balance - (res.rows[0].balance as unknown as number);

      await sql`
      INSERT INTO logs(
        user_id,
        type,
        value,
        admin_id
      )
      VALUES(
        ${id},
        'balance_change',
        ${diff},
        ${admin_id}
      )
      `;
    }
  } catch (error) {
    console.error("Error fetching user balance for accounting purposes:", error);
  }

  if (password.length >= 6) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await sql`
        UPDATE users
        SET name = ${name}, email = ${email}, balance = ${balance}, password = ${hashedPassword}, role = ${role}, admin = ${admin}, nickname = ${nickname}, title = ${title}, priority = ${priority}, food_pref = ${food_pref}
        WHERE id = ${id} 
      `;

    } catch (error) {
      console.error("Update user error 1: ", error);
      return { message: 'Database Error: Failed to Update User' };
    }
  } else {
    try {
      await sql`
        UPDATE users
        SET name = ${name}, email = ${email}, balance = ${balance}, role = ${role}, admin = ${admin}, nickname = ${nickname}, title = ${title}, priority = ${priority}, food_pref = ${food_pref}
        WHERE id = ${id}
      `;
    } catch (error) {
      console.error("Update user error 2: ", error);
      return { message: 'Database Error: Failed to Update User' };
    }
  }

  revalidatePath('/dashboard/admin/users');
  redirect('/dashboard/admin/users');
}

const UpdateProfile = UserFormSchema.omit({ id: true, balance: true, role: true, admin: true, title: true, priority: true })
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
    nickname: formData.get('nickname'),
    food_pref: formData.get('food_pref'),
  });

  if (!validatedFields.success) {
    console.error("Validated fields error:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update user.',
    };
  }

  var { name, email, password, likes, dislikes, nickname, food_pref } = validatedFields.data;
  email = email.toLowerCase();

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
        nickname = ${nickname},
        food_pref = ${food_pref}
      WHERE id = ${id}
    `;
    if (hashedPassword) {
      res2 = await sql`
        UPDATE users
        SET
          password = ${hashedPassword}
        WHERE id = ${id}
      `;
    }
    if (niceUrl) {
      res3 = await sql`
        UPDATE users
        SET
          image_nice_url = ${niceUrl}
        WHERE id = ${id}
      `;
    }
    if (chaoticUrl) {
      res4 = await sql`
        UPDATE users
        SET
          image_chaotic_url = ${chaoticUrl}
        WHERE id = ${id}
      `;
    }
  } catch (error) {
    console.log("error: ", error);
    console.error("Error:", error);
    return { message: 'Database Error: Failed to Update User' };
  }
  revalidatePath('/dashboard/profile');
  return { message: 'Profilen uppdaterades!' };
}

const UpdateEvent = EventFormSchema.omit({ id: true, workers: true, reserves: true })
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
    notes: formData.get('notes'),
    open: formData.get('open')
  });


  if (!validatedFields.success) {
    console.error("Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update event.',
    };
  }


  const { name, date, start_work_time, start_event_time, end_work_time, end_event_time, locations, responsible, type, sought_workers, notes, open } = validatedFields.data;
  // run once
  // try {
  //   await sql`
  //   ALTER TABLE events
  //   ADD open INT
  //   `;
  // } catch (error) {
  //   console.log("error altering table: ", error);
  // }

  // console.log("Edit event, date: ", date);

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
        notes = ${notes},
        open = ${open}
      WHERE id = ${id} 
    `;

  } catch (error) {
    console.error('Updating event failed:', error);
    return { message: 'Database Error: Failed to Update Event' };
  }

  revalidatePath('/dashboard/admin/events');
  redirect('/dashboard/admin/events');
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
      switch (error.cause) {
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
      const result = await sql`SELECT balance FROM users WHERE id = ${id}`;
      const balance = result.rows[0]?.balance ?? 0;

      // Determine the deduction amount
      let deduction = num_streck * spv;
      if (balance < 0) {
        deduction += num_streck * 5;
      }
      else if (balance - deduction < -1 * spv) {
        const new_num = (((balance - (balance % spv)) / spv) + 1)
        deduction += 5 * (num_streck - new_num);
      }

      // Update the balance
      await sql`
      UPDATE users 
      SET balance = balance - ${deduction} 
      WHERE id = ${id}`;

      await sql`
          INSERT INTO streck (user_id, amount, num_streck)
          VALUES (${id}, ${deduction}, ${num_streck})
        `;
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
  var max_workers = -1;
  var num_workers = -1;
  try {
    let res = await sql`
      SELECT 
        id,
        workers,
        sought_workers
      FROM events
      WHERE id = ${event_id};
    `;

    max_workers = res.rows[0].sought_workers;
    num_workers = res.rows[0].workers.length;
  } catch (error) {
    console.error("Error adding user to event, error fetching event:", error);
    return { success: false, message: "Failed to add user to event., error fetching event" };
  }
  try {
    if (num_workers >= max_workers) {
      await sql`
        UPDATE events
        SET reserves = 
          CASE 
            WHEN array_position(reserves, ${user_id}::uuid) IS NULL 
            THEN array_append(reserves, ${user_id}::uuid) 
            ELSE reserves 
          END
        WHERE id = ${event_id}::uuid;
      `;
    } else {
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
    }
  } catch (error) {
    console.error("Error adding user to event:", error);
    return { success: false, message: "Failed to add user to event." };
  }
  revalidatePath(`dashboard/events/${event_id}/see`);
}

export async function RemoveUserFromEvent(event_id: string, user_id: string) {
  try {
    // Step 1: Fetch current workers and reserves
    const result = await sql<{
      workers: string[],
      reserves: string[]
    }>`SELECT workers, reserves FROM events WHERE id = ${event_id}::uuid`;

    const { workers, reserves } = result.rows[0];

    const wasInWorkers = workers.includes(user_id);
    const wasInReserves = reserves.includes(user_id);

    // Step 2: Remove user from both arrays
    await sql`
      UPDATE events
      SET workers = array_remove(workers, ${user_id}::uuid),
          reserves = array_remove(reserves, ${user_id}::uuid)
      WHERE id = ${event_id}::uuid
    `;

    // Step 3: Promote a reserve if user was removed from workers only
    if (wasInWorkers && !wasInReserves && reserves.length > 0) {
      const promotedUser = reserves[0];
      await sql`
        UPDATE events
        SET workers = array_append(workers, ${promotedUser}::uuid),
            reserves = array_remove(reserves, ${promotedUser}::uuid)
        WHERE id = ${event_id}::uuid
      `;
    }

    revalidatePath(`/dashboard/events/${event_id}/see`);
    return { success: true };
  } catch (error) {
    console.error('Error removing user from event:', error);
    return { success: false, message: 'Failed to remove user from event' };
  }
}

export async function AdminRemoveUserFromEvent(event_id: string, user_id: string) {
  try {
    // Step 1: Fetch current workers and reserves
    const result = await sql<{
      workers: string[],
      reserves: string[]
    }>`SELECT workers, reserves FROM events WHERE id = ${event_id}::uuid`;

    const { workers, reserves } = result.rows[0];

    const wasInWorkers = workers.includes(user_id);
    const wasInReserves = reserves.includes(user_id);

    // Step 2: Remove user from both arrays if present
    await sql`
      UPDATE events
      SET workers = array_remove(workers, ${user_id}::uuid),
          reserves = array_remove(reserves, ${user_id}::uuid)
      WHERE id = ${event_id}::uuid
    `;

    // Step 3: Promote first user from reserves if user was removed from workers and reserves still has users
    if (wasInWorkers && !wasInReserves && reserves.length > 0) {
      const promotedUser = reserves[0];
      await sql`
        UPDATE events
        SET workers = array_append(workers, ${promotedUser}::uuid),
            reserves = array_remove(reserves, ${promotedUser}::uuid)
        WHERE id = ${event_id}::uuid
      `;
    }

    revalidatePath(`/dashboard/admin/events/${event_id}/edit`);
    return { success: true };
  } catch (error) {
    console.error('Error removing user from event:', error);
    return { success: false, message: 'Failed to remove user from event' };
  }
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
    await sql`DROP TABLE IF EXISTS logs`;
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // create the "streck" table if it doesnt exist
    await sql`
      CREATE TABLE IF NOT EXISTS streck (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        time DATE DEFAULT NOW(),
        num_streck INT,
        amount INT
      )
    `;
    await sql`
      UPDATE users
      SET
        balance = 0
    `;

    await sql`
    CREATE TABLE IF NOT EXISTS logs(
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      admin_id UUID NOT NULL,
      type TEXT,
      value TEXT,
      time DATE DEFAULT NOW()
    );
    `;
  } catch (error) {
    console.error("error when reseting strecklista:", error);
  }
}

export async function updateBalance(user_id: string, admin_id: string, diff: string) {
  try {
    let res = await sql`
      SELECT
        balance
      FROM
        users
      WHERE
        id = ${user_id}
    `;
    let old_balance = Number((res.rows[0].balance));
    // console.log("old balance:", old_balance);
    let difff = Number(diff);
    let new_balance = old_balance + difff;
    // console.log("new balance:", new_balance);
    await sql`
      UPDATE
        users
      SET
        balance = ${new_balance}
      WHERE
        id = ${user_id}
    `;

    await sql`
    INSERT INTO logs(
      user_id,
      type,
      value,
      admin_id
    )
    VALUES(
      ${user_id},
      'balance_change',
      ${diff},
      ${admin_id}
    )
    `;

  } catch (error) {
    console.error("Error updating balance of user with id:", user_id, "error:", error);
  }
}

export async function removeStreck(streck_id: string, user_id: string) {
  try {
    let streck = await sql<Streck>`
    SELECT *
    FROM streck
    WHERE id = ${streck_id}
    `;

    const amount = streck.rows[0].amount;
    const user_id = streck.rows[0].user_id;
    await sql`
    UPDATE users
    SET balance = balance + ${amount} 
    WHERE id = ${user_id}`;

    await sql`
    DELETE FROM streck WHERE id = ${streck_id}
    `;
  } catch (error) {
    console.error("Error removing streck with id:", streck_id, "error:", error);
  }

  revalidatePath(`/dashboard/admin/listan/${user_id}`)
}
