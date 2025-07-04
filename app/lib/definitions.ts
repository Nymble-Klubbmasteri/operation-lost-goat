// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  image_nice_url: string;
  image_chaotic_url: string;
  balance: string;
  role: string;
  admin: string;
  nickname: string;
  priority: number;
};

export type DisplayUser = {
  name: string;
  image_nice_url: string;
  image_chaotic_url: string;
  role: string;
  likes: string;
  dislikes: string;
  nickname: string;
  title: string;
  priority: number;
}

export type DisplayEvent = {
  name: string;
  date: string;
}

export type DisplayWorkers = {
  name: string;
  nickname: string;
}

export type Event = {
  id: string;
  name: string;
  start_work_time: string;
  start_event_time: string;
  end_event_time: string;
  end_work_time: string;
  locations: string;
  responsible: string;
  type: number;
  sought_workers: number;
  date: Date;
  notes: string;
  workers: string[];
  open: number;
};

export type Streck = {
  id: string;
  user_id: string;
  amount: number;
  num_streck: number;
  date: Date;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type UsersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  balance: number;
  role: string;
}

export type FormattedUsersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  balance: number;
}

export type EventsTable = {
  id: string;
  name: string;
  date: string;
  type: number;
  open: number;
}

export type CustomerField = {
  id: string;
  name: string;
};

export type UserField = {
  id: string;
  name: string;
};

export type EventField = {
  id: string;
  name: string;
}

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type UserForm = {
  id: string;
  name: string;
  email: string;
  balance: number;
  password: string;
  role: string;
  admin: string;
  image_nice_url: string;
  image_chaotic_url: string;
  likes: string;
  dislikes: string;
  nickname: string;
  title: string;
  priority: number;
}

export type EventForm = {
  id: string;
  name: string;
  start_work_time: string;
  start_event_time: string;
  end_event_time: string;
  end_work_time: string;
  locations: string;
  responsible: string;
  type: number;
  sought_workers: number;
  date: string,
  notes: string;
  workers: string[];
  open: number;
};

export type Setting = {
  key: string;
  value: string;
}

export type UpdateBalanceForm = {
  user_id: string;
  diff: string;
  admin_id: string;
}