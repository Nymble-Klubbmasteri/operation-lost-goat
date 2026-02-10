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
  food_pref: string;
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
  reserves: string[];
};

export type Streck = {
  id: string;
  user_id: string;
  amount: number;
  num_streck: number;
  date: Date;
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
}

export type UserField = {
  id: string;
  name: string;
};

export type EventField = {
  id: string;
  name: string;
}

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
  food_pref: string;
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
  reserves: string[];
  payment: number;
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

export type TimeReport = {
  event_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
}

export type Item = {
  id: number;
  name: string;
  price: number;
  price_l2: number;
  type: number;
}
