

// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    
  },
  {
    name: 'User2',
    email: 'user2@nextmail.com',
    password: '123456',
        
  },
  {
    name: 'User3',
    email: 'user3@nextmail.com',
    password: '123456',
    
  },
  {
    name: 'User4',
    email: 'user4@nextmail.com',
    password: '123456',
    
  },
  {
    name: 'User5',
    email: 'user5@nextmail.com',
    password: '123456',
    
  },
  {
    name: 'User6',
    email: 'user6@nextmail.com',
    password: '123456',
    
  },
  {
    name: 'User7',
    email: 'user7@nextmail.com',
    password: '123456',
    
  },
  {
    name: 'User8',
    email: 'user8@nextmail.com',
    password: '123456',
    
  },
  {
    name: 'Proggo',
    email: 'event@ths.kth.se',
    password: 'Nymble1519',
    admin: "Yes",
  }
];

const events = [
  {
    name: 'Fredagspub 1/1',
    start_work_time: '16:00',
    start_event_time: '17:00',
    end_event_time: '01:00',
    end_work_time: '02:00',
    locations: 'Puben',
    type: 0,
    sought_workers: 4,
    date: '2024-01-01',
    notes: 'Vanlig pub'
  },
  {
    name: 'Noirstäd 2/1',
    start_work_time: '13',
    start_event_time: '13',
    end_event_time: '17',
    end_work_time: '17',
    locations: 'Noir',
    type: 0,
    sought_workers: 999,
    date: '2024-01-02',
    notes: 'Städa noir'
  },
  {
    name: 'PAKS',
    start_work_time: 'Alltid',
    start_event_time: 'Alltid',
    end_event_time: 'Aldrig',
    end_work_time: 'Aldrig',
    locations: 'Överallt',
    type: 0,
    sought_workers: 999,
    date: '2024-09-02',
    notes: 'DSVDV'
  },
  {
    name: 'Betalpass',
    start_work_time: '16:00',
    start_event_time: '17:00',
    end_event_time: '01:00',
    end_work_time: '02:00',
    locations: 'Puben',
    type: 1,
    sought_workers: 3,
    date: '2024-01-03',
    notes: 'Ngn AW typ'
  },
]

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: './placeholder/evil-rabbit.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url:'./placeholder/evil-rabbit.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: './placeholder/evil-rabbit.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: './placeholder/evil-rabbit.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: './placeholder/evil-rabbit.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/./placeholder/evil-rabbit.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: './placeholder/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: './placeholder/evil-rabbit.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: './placeholder/evil-rabbit.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: './placeholder/evil-rabbit.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  customers,
  invoices,
  revenue,
  events,
};
