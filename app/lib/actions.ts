'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";

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

const CreateUser = UserFormSchema.omit({id: true});
export async function createUser(prevState: UserState, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    balance: formData.get('balance'),
    password: formData.get('password')
  });

  console.log("hi! create_user 1");
  if (!validatedFields.success) {
    console.log("Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice',
    };
  }
  console.log("hi! create_user 2");

  // Prepare Data for insertion into the database
  const {name, email, balance, password} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hi! create_user 3");

  try {
    await sql`
      INSERT INTO users (name, email, password, balance)
      VALUES (${name}, ${email}, ${hashedPassword}, ${balance})
    `;
  } catch (error) {
    console.log(error);
    return {
      message: 'Database failed to create user',
    };
  }
  console.log("hi! create_user 4");

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

const CreateEvent = EventFormSchema.omit({id: true});
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

  console.log("hi! create_event 1");
  if (!validatedFields.success) {
    console.log("Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice',
    };
  }
  console.log("hi! create_event 2");

  // Prepare Data for insertion into the database
  const { name, date, start_work_time, start_event_time, end_work_time, end_event_time, locations, responsible, type, sought_workers, notes } = validatedFields.data;
  console.log("hi! create_event 3");

  try {
    await sql`
      INSERT INTO events (name, date, start_work_time, start_event_time, end_work_time, end_event_time, locations, type, sought_workers, notes)
      VALUES (${name}, ${date}, ${start_work_time}, ${start_event_time}, ${end_work_time}, ${end_event_time}, ${locations}, ${type}, ${sought_workers}, ${notes})
    `;
  } catch (error) {
    console.log(error);
    return {
      message: 'Database failed to create event',
    };
  }
  console.log("hi! create_event 4");

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


const UpdateUser = UserFormSchema.omit({id: true})
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
  });


  if (!validatedFields.success){
    console.log("Errors:", validatedFields.error.flatten().fieldErrors);
    console.log("Balance type: ",typeof formData.get('balance'))
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update user.',
    };
  }


  const { name, email, balance, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}, balance = ${balance}, password = ${hashedPassword}
      WHERE id = ${id} 
    `;

  } catch (error) {
    return {message: 'Database Error: Failed to Update User'};
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

const UpdateEvent = EventFormSchema.omit({id: true})
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
    notes: formData.get('notes')
  });


  if (!validatedFields.success){
    console.log("Errors:", validatedFields.error.flatten().fieldErrors);
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
        date = ${date},
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
      WHERE id = ${id} 
    `;

  } catch (error) {
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
    revalidatePath('/dasboard/users');
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

export async function strecka(id: string) {
  try {
    await sql`
    UPDATE users 
    SET balance = balance - 20 
    WHERE id = ${id}`;
  }  catch (error) {
    console.log("Strecka, error:", error);
    return {
      message: 'Database failed to strecka',
    };
  }
}