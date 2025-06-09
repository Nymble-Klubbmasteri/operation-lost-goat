import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  UsersTable,
  UserForm,
  UserField,
  EventsTable,
  EventForm,
  DisplayUser,
  Setting
} from '@/app/lib/definitions';
import { formatCurrency } from '@/app/lib/utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    const data = await sql<Revenue>`SELECT * FROM revenue`;



    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    // console.log(invoice); // Invoice is an empty array []
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchUserById(id: string) {
  noStore();
  try {
    const data = await sql<UserForm>`
      SELECT
        id,
        name,
        email,
        balance,
        role,
        admin,
        image_nice_url,
        image_chaotic_url,
        nickname,
        likes,
        dislikes,
        title,
        priority
      FROM users
      WHERE users.id = ${id};
    `;

    const user = data.rows.map((user) => ({
      ...user
    }));
    // console.log("fetched user: ", user[0]);
    return user[0];

  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch user.');
  }
  
}

export async function fetchEventById(id: string) {
  noStore();
  try {
    const data = await sql<EventForm>`
      SELECT
        events.id,
        events.name,
        events.date,
        events.start_work_time,
        events.start_event_time,
        events.end_work_time,
        events.end_event_time,
        events.locations,
        events.responsible,
        events.type,
        events.sought_workers,
        events.notes,
        events.workers,
        events.open
      FROM events
      WHERE events.id = ${id};
    `;

    const event = data.rows.map((event) => ({
      ...event
    }));
    return event[0];

  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch event.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchUsers() {
  noStore();
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchEventsPages(query: string) {
  noStore();
  try {
    const count = await
    sql`
      SELECT COUNT(*)
        FROM events
        WHERE
          events.name ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error;', error);
    throw new Error('Failed to fetch number of events.');
  }
}

export async function fetchUsersPages(query: string) {
  noStore();
  try {
    const count = await 
    sql`
      SELECT COUNT(*)
        FROM users
        WHERE 
          users.email ILIKE ${`%${query}%`} OR
          users.name ILIKE ${`%${query}%`} OR
          users.balance::text ILIKE ${`%${query}%`} 
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch number of users.');
  }
}

export async function fetchStreckUsersPages(query: string) {
  noStore();
  try {
    const count = await 
    sql`
      SELECT COUNT(*)
        FROM users
        WHERE 
          (users.email ILIKE ${`%${query}%`} OR
          users.name ILIKE ${`%${query}%`} OR
          users.balance::text ILIKE ${`%${query}%`}) AND
          (users.role ILIKE 'Marskalk' OR 
          users.role ILIKE 'WraQ' OR
          users.role ILIKE 'Qnekt')
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch number of users.');
  }
}

export async function fetchFilteredUsers(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await sql<UsersTable>`
      SELECT
        users.id,
        users.name,
        users.email,
        users.image_nice_url,
        users.image_chaotic_url,
        users.balance,
        users.role
      FROM users
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR 
        users.role ILIKE ${`%${query}%`} OR 
        users.balance::text ILIKE ${`%${query}%`} 
      ORDER BY users.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return users.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchStreckFilteredUsers(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await sql<UsersTable>`
      SELECT
        users.id,
        users.name,
        users.email,
        users.image_nice_url,
        users.image_chaotic_url,
        users.balance,
        users.role
      FROM users
      WHERE
        (users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR 
        users.role ILIKE ${`%${query}%`} OR 
        users.balance::text ILIKE ${`%${query}%`}) AND
        (users.role ILIKE 'Marskalk' OR
        users.role ILIKE 'WraQ' OR
        users.role ILIKE 'Qnekt')
      ORDER BY users.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return users.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchFilteredEvents(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const events = await sql<EventsTable>`
      SELECT
        events.id,
        events.name,
        events.date,
        events.type,
        events.open
      FROM events
      WHERE
        events.name ILIKE ${`%${query}%`}
      ORDER BY events.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return events.rows;
  } catch (error) {
    // console.log('Error:', error);
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events.');
  }
}



export async function fetchBalanceByID(id: string) {
  noStore();
  try {
    const balance = await sql`
      SELECT users.balance
      FROM users
      WHERE
        users.id = ${id}
    `;

    return balance.rows[0];
  } catch (error) {
    // console.log('Database Balance error:', error);
    console.error('Database error:', error);
    throw new Error('Failed to fetch balance');
  }
}

export async function fetchUserNamesByIDs(ids: string[]) {
  noStore();

  try {
    const results = await Promise.all(
      ids.map(async (id) => {
        const name = await sql`
          SELECT name
          FROM users
          WHERE users.id = ${id};
        `;
        return name.rows[0]?.name; // optional chaining in case no result
      })
    );

    return results.filter(Boolean); // removes undefined if any id didn't exist
  } catch (error) {
    console.error('Failed to fetch user names Error:', error);
    return [];
  }
}

export async function fetchUserStrecks(id: string) {
  noStore();

  try {
    const result = await sql`
      SELECT *
      FROM streck
      WHERE
        streck.user_id = ${id}
    `;

    return result.rows;
  } catch (error) {
    console.error("Database All User's Streck Fetching Error:", error);
    throw new Error('Failed to fetch users streck');
  }
}

export async function fetchUserLogs(id: string) {
  noStore();

  try {
    const result = await sql`
      SELECT logs.*, admins.name AS admin_name
      FROM logs
      LEFT JOIN users AS admins ON logs.admin_id = admins.id
      WHERE logs.user_id = ${id}
    `;
    // console.log("logs:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Database All User's Logs Fetching Error:", error);
    throw new Error('Failed to fetch users logs');
  }
}

export async function fetchAllStreck() {
  noStore();
  try {
    const result = await sql`
      SELECT *
      FROM streck
    `;

    return result.rows;
  } catch (error) {
    console.error('Database All Streck Fetching Error:', error);
    throw new Error('Failed to fetch all streck');
  }
}

export async function getTopList() {
  noStore();
  try {
    const result = await sql`
      SELECT 
        u.id, 
        u.nickname, 
        u.role,
        COALESCE(SUM(s.num_streck), 0) as streck_count
      FROM 
        users u
      LEFT JOIN 
        streck s ON u.id = s.user_id
      WHERE
        u.role = 'Marskalk' OR u.role = 'WraQ' OR u.role = 'Qnekt'
      GROUP BY 
        u.id, u.nickname, u.role
      HAVING 
        COALESCE(SUM(s.num_streck), 0) > 0
      ORDER BY 
        streck_count DESC
      LIMIT 10
    `;
    //        COALESCE(SUM(s.amount), 0) as total_amount

    // console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error('Failed to fetch Top List, error: ', error);
    throw new Error('Failed to fetch top list');
  }
}

export async function fetchUsersForDisplay() {
  noStore();
  try {
    const res = await sql<DisplayUser>`
      SELECT
        name,
        role,
        image_nice_url,
        image_chaotic_url,
        likes,
        dislikes
      FROM users
    `;
    return res.rows;
  } catch (error) {
    console.error("Error fetching users for display:", error);
  }
}

export async function fetchMembersByRole(role: string){
  noStore();
  try {
    // This runs on the server side only
    const result = await sql<DisplayUser>`
      SELECT 
        *
      FROM users
      WHERE role = ${role}
      ORDER BY
        priority ASC
    `;

    // console.log("results fetch users by role:", result.rows, "---");
    
    // Convert the result to DisplayUser array
    return result.rows.map(row => ({
      // name: row.name,
      // role: row.role,
      // image_nice_url: row.image_nice_url,
      // image_chaotic_url: row.image_chaotic_url,
      // likes: row.likes,
      // dislikes: row.dislikes,
      // nickname: row.nickname,
      // title: row.title
      ...row
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch members with role: ${role}`);
  }
}

export async function getTopListByYear() {
  noStore();
  try {
    const current_year = new Date().toISOString().split('T')[0];

    const result = await sql`
      SELECT 
        u.id, 
        u.nickname, 
        u.role,
        COALESCE(SUM(s.num_streck), 0) as streck_count
      FROM 
        users u
      LEFT JOIN 
        streck s ON u.id = s.user_id
      WHERE
        u.role = 'Marskalk' OR u.role = 'WraQ' OR u.role = 'Qnekt' AND s.time > ${current_year}
      GROUP BY 
        u.id, u.nickname
      HAVING 
        COALESCE(SUM(s.num_streck), 0) > 0
      ORDER BY 
        streck_count DESC
      LIMIT 10
    `;
    //        COALESCE(SUM(s.amount), 0) as total_amount


    // console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error('Failed to fetch Top List by year, error: ', error);
    throw new Error('Failed to fetch top list by year');
  }
}

export async function getTopListLast24Hours() {
  noStore();
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const result = await sql`
      SELECT 
        u.id, 
        u.nickname, 
        u.role,
        COALESCE(SUM(s.num_streck), 0) as streck_count
      FROM 
        users u
      LEFT JOIN 
        streck s ON u.id = s.user_id
      WHERE
        (u.role = 'Marskalk' OR u.role = 'WraQ' OR u.role = 'Qnekt')
        AND s.time > ${twentyFourHoursAgo}
      GROUP BY 
        u.id, u.nickname
      HAVING 
        COALESCE(SUM(s.num_streck), 0) > 0
      ORDER BY 
        streck_count DESC
    `;

    return result.rows;
  } catch (error) {
    console.error('Failed to fetch Top List for last 24 hours, error: ', error);
    throw new Error('Failed to fetch top list for last 24 hours');
  }
}

export async function getUpcomingPub() {
  try {
    const res = await sql<EventsTable>`
      SELECT 
        *
      FROM
        events
      WHERE
        type = 1 OR type = 2
      ORDER BY date DESC
      LIMIT 1
    `;

    // console.log("Latest event:", res.rows[0]);
    return res.rows[0];
    
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch upcoming event.');
  }
}

export async function getStreckPrice() {
  noStore();
  try {
    const res = await sql<Setting>`
    SELECT
      *
    FROM
      settings
    WHERE
      key = 'streck_price'
    `;
    return res.rows[0];
  } catch (error) {
    console.error("Error fetching streck price: ", error);
  }
}

export async function getSwishNumber() {
  noStore();
  try {
    const res = await sql<Setting>`
    SELECT
      *
    FROM
      settings
    WHERE
      key = 'swish_number'
    `;
    return res.rows[0];
  } catch (error) {
    console.error("Error fetching swish_number: ", error);
  }
}

export async function fetchUserEvents(userId: string) {
  noStore();

  try {
    const userEvents = await sql<{
      id: string;
      name: string;
      date: string;
      type: number;
    }>`
      SELECT
        id,
        name,
        date,
        type
      FROM events
      WHERE ${userId} = ANY(workers)
      ORDER BY date DESC
    `;

    return userEvents.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user events.');
  }
}