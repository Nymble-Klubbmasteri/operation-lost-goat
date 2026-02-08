import { sql } from '@vercel/postgres';
import {
  User,
  UsersTable,
  UserForm,
  UserField,
  EventsTable,
  EventForm,
  DisplayUser,
  Setting,
  DisplayWorkers
} from '@/app/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 7;

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
        priority,
        food_pref
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
  // try {
  //   let res = await sql`
  //   ALTER TABLE events
  //   ADD reserves UUID[] DEFAULT array[]::UUID[];
  //   `;
  //   console.log(res);
  // } catch (error) {
  //   console.error(error);
  // }

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
        events.reserves
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
  sort: 'name' | 'email' | 'role' | 'balance' = 'name',
  order: 'DESC' | 'ASC' = 'ASC'
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    let queryResult;
    if (sort === 'name' && order === 'ASC') {
      queryResult = await sql<UsersTable>`
        SELECT
          users.id,
          users.name,
          users.email,
          users.image_nice_url,
          users.image_chaotic_url,
          users.balance,
          users.role,
          users.nickname
        FROM users
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.email ILIKE ${`%${query}%`} OR 
          users.role ILIKE ${`%${query}%`} OR 
          users.nickname ILIKE ${`%${query}`} OR
          users.balance::text ILIKE ${`%${query}%`} 
        ORDER BY users.name ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else if (sort === 'name' && order === 'DESC') {
      queryResult = await sql<UsersTable>`
        SELECT
          users.id,
          users.name,
          users.email,
          users.image_nice_url,
          users.image_chaotic_url,
          users.balance,
          users.role,
          users.nickname
        FROM users
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.email ILIKE ${`%${query}%`} OR 
          users.role ILIKE ${`%${query}%`} OR 
          users.nickname ILIKE ${`%${query}`} OR
          users.balance::text ILIKE ${`%${query}%`} 
        ORDER BY users.name DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else if (sort === 'email' && order === 'ASC') {
      queryResult = await sql<UsersTable>`
        SELECT
          users.id,
          users.name,
          users.email,
          users.image_nice_url,
          users.image_chaotic_url,
          users.balance,
          users.role,
          users.nickname
        FROM users
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.email ILIKE ${`%${query}%`} OR 
          users.role ILIKE ${`%${query}%`} OR 
          users.nickname ILIKE ${`%${query}`} OR
          users.balance::text ILIKE ${`%${query}%`} 
        ORDER BY users.email ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else if (sort === 'email' && order === 'DESC') {
      queryResult = await sql<UsersTable>`
        SELECT
          users.id,
          users.name,
          users.email,
          users.image_nice_url,
          users.image_chaotic_url,
          users.balance,
          users.role,
          users.nickname
        FROM users
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.email ILIKE ${`%${query}%`} OR 
          users.role ILIKE ${`%${query}%`} OR 
          users.nickname ILIKE ${`%${query}`} OR
          users.balance::text ILIKE ${`%${query}%`} 
        ORDER BY users.email DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else if (sort === 'role' && order === 'ASC') {
      queryResult = await sql<UsersTable>`
        SELECT
          users.id,
          users.name,
          users.email,
          users.image_nice_url,
          users.image_chaotic_url,
          users.balance,
          users.role,
          users.nickname
        FROM users
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.email ILIKE ${`%${query}%`} OR 
          users.role ILIKE ${`%${query}%`} OR 
          users.nickname ILIKE ${`%${query}`} OR
          users.balance::text ILIKE ${`%${query}%`} 
        ORDER BY users.role ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else if (sort === 'role' && order === 'DESC') {
      queryResult = await sql<UsersTable>`
        SELECT
          users.id,
          users.name,
          users.email,
          users.image_nice_url,
          users.image_chaotic_url,
          users.balance,
          users.role,
          users.nickname
        FROM users
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.email ILIKE ${`%${query}%`} OR 
          users.role ILIKE ${`%${query}%`} OR 
          users.nickname ILIKE ${`%${query}`} OR
          users.balance::text ILIKE ${`%${query}%`} 
        ORDER BY users.role DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else if (sort === 'balance' && order === 'ASC') {
      queryResult = await sql<UsersTable>`
        SELECT
          users.id,
          users.name,
          users.email,
          users.image_nice_url,
          users.image_chaotic_url,
          users.balance,
          users.role,
          users.nickname
        FROM users
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.email ILIKE ${`%${query}%`} OR 
          users.role ILIKE ${`%${query}%`} OR 
          users.nickname ILIKE ${`%${query}`} OR
          users.balance::text ILIKE ${`%${query}%`} 
        ORDER BY users.balance ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else if (sort === 'balance' && order === 'DESC') {
      queryResult = await sql<UsersTable>`
        SELECT
          users.id,
          users.name,
          users.email,
          users.image_nice_url,
          users.image_chaotic_url,
          users.balance,
          users.role,
          users.nickname
        FROM users
        WHERE
          users.name ILIKE ${`%${query}%`} OR
          users.email ILIKE ${`%${query}%`} OR 
          users.role ILIKE ${`%${query}%`} OR 
          users.nickname ILIKE ${`%${query}`} OR
          users.balance::text ILIKE ${`%${query}%`} 
        ORDER BY users.balance DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else {
      throw new Error('This shouldnt happen!');
    }

    return queryResult.rows;
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
  sort: 'name' | 'date' = 'date',
  order: 'DESC' | 'ASC' = 'ASC'
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  try {
    let queryResult;
    if (sort === 'name' && order === 'ASC') {
      queryResult = await sql<EventsTable>`
        SELECT
          events.id,
          events.name,
          events.date,
          events.type
        FROM events
        WHERE
          events.name ILIKE ${`%${query}%`}
          AND date > ${twentyFourHoursAgo}
        ORDER BY events.name ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else if (sort === 'name' && order === 'DESC') {
      queryResult = await sql<EventsTable>`
        SELECT
          events.id,
          events.name,
          events.date,
          events.type
        FROM events
        WHERE
          events.name ILIKE ${`%${query}%`}
          AND date > ${twentyFourHoursAgo}
        ORDER BY events.name DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else if (sort === 'date' && order === 'DESC') {
      queryResult = await sql<EventsTable>`
        SELECT
          events.id,
          events.name,
          events.date,
          events.type
        FROM events
        WHERE
          events.name ILIKE ${`%${query}%`}
          AND date > ${twentyFourHoursAgo}
        ORDER BY events.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else {
      // default or sort === 'date' && order === 'ASC'
      queryResult = await sql<EventsTable>`
        SELECT
          events.id,
          events.name,
          events.date,
          events.type
        FROM events
        WHERE
          events.name ILIKE ${`%${query}%`}
          AND date > ${twentyFourHoursAgo}
        ORDER BY events.date ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    }

    return queryResult.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events.');
  }
}

export async function fetchFilteredEventsAdmin(
  query: string,
  currentPage: number,
  sort: 'name' | 'date' = 'date',
) {
  noStore();
  const orderByColumn = sort === 'name' ? 'name' : 'date';
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();


  try {
    let queryResult;
    if (orderByColumn === 'name') {
      queryResult = await sql<EventsTable>`
        SELECT
          events.id,
          events.name,
          events.date,
          events.type
        FROM events
        WHERE
          events.name ILIKE ${`%${query}%`}
        ORDER BY events.name DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    } else {
      queryResult = await sql<EventsTable>`
        SELECT
          events.id,
          events.name,
          events.date,
          events.type
        FROM events
        WHERE
          events.name ILIKE ${`%${query}%`}
        ORDER BY events.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    }

    return queryResult.rows;
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
        const name = await sql<DisplayWorkers>`
          SELECT name, nickname
          FROM users
          WHERE users.id = ${id};
        `;
        return (name.rows[0]); // optional chaining in case no result
      })
    );
    console.log("res: ", results);
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

export async function getNumStreckUser(id: string) {
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
        u.id = ${id}
      GROUP BY 
        u.id, u.nickname, u.role
      HAVING 
        COALESCE(SUM(s.num_streck), 0) > 0
    `;
    //        COALESCE(SUM(s.amount), 0) as total_amount

    // console.log(result.rows);
    return result.rows[0];
  } catch (error) {
    console.error('Failed to fetch Num streck of user, error: ', error);
    throw new Error('Failed to fetch num streck of user');
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

export async function fetchMembersByRole(role: string) {
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
    const currentYear = new Date().getFullYear();

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
        (u.role = 'Marskalk' OR u.role = 'WraQ' OR u.role = 'Qnekt') AND EXTRACT(YEAR FROM s.time) = ${currentYear}
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
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();


    const res = await sql<EventsTable>`
      SELECT 
        *
      FROM
        events
      WHERE
        (type = 1 OR type = 2)
        AND
        events.date > ${twentyFourHoursAgo}
      ORDER BY date ASC
      LIMIT 1
    `;

    // console.log("Latest event:", res.rows[0]);
    // console.log("twentyfourhoursago: ", twentyFourHoursAgo);
    return res.rows[0];

  } catch (error) {
    console.error(error);
    // return {}
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

export async function fetchBank() {
  noStore();
  try {
    const result = await sql`
      SELECT
        COALESCE(SUM(u.balance), 0) as bank_amount
      FROM
        users u
    `;

    console.log("Bank:", result.rows[0]);
    return result.rows[0]
  } catch (error) {

  }
}

export async function fetchEventsBetweenDates(type: number, date_from: string, date_to: string) {
  noStore();

  try {
    const events_query = await sql<{
      id: string;
      name: string;
      date: string;
      type: number;
      workers: string[];
      notes: string;
      start_work_time: string;
      end_work_time: string;
    }>`
      SELECT
        id,
        name,
        date,
        type,
        workers,
        notes,
        start_work_time,
        end_work_time
      FROM events
      WHERE type = ${type} and date between ${date_from} AND ${date_to}
    `;

    const users_query = await sql<{
      id: string;
      name: string;
    }>`
      SELECT
        id,
        name
      FROM users
    `;

    const events = events_query.rows;
    const users = users_query.rows;
    for (let i = 0; i < events.length; i++) {
      for (let j = 0; j < events[i].workers.length; j++) {
        const e = users.find(e => e.id === events[i].workers[j]);
        if (e === undefined) {
          events[i].workers[j] = "Unknown";
        } else {
          events[i].workers[j] = e.name;
        }
      }
    }

    return events;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events between');
  }
}
