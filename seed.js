const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  events,
} = require('./app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedStreck(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS streck`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // create the "streck" table if it doesnt exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS streck (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        time DATE DEFAULT NOW(),
        amount INT
      );
    `;

    console.log(`Created "streck" table`);
    return createTable;
  } catch (error) {
    console.error('Error seeding streck:', error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS users`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        image_nice_url VARCHAR(255) NOT NULL DEFAULT '',
        image_chaotic_url VARCHAR(255) NOT NULL DEFAULT '',
        likes VARCHAR(255),
        dislikes VARCHAR(255),
        balance INT NOT NULL DEFAULT 0,
        role VARCHAR(255) DEFAULT 'Killing',
        admin VARCHAR(255) DEFAULT 'No'
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (user.admin) {
          return client.sql`
          INSERT INTO users (name, email, password, image_nice_url, image_chaotic_url, admin)
          VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.image_nice_url}, ${user.image_chaotic_url}, ${user.admin})
          ON CONFLICT (id) DO NOTHING;
          `;          
        } else {
          return client.sql`
          INSERT INTO users (name, email, password, image_nice_url, image_chaotic_url)
          VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.image_nice_url}, ${user.image_chaotic_url})
          ON CONFLICT (id) DO NOTHING;
          `;
        }
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedEvents(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS events`;
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      start_work_time VARCHAR(255),
      start_event_time VARCHAR(255),
      end_event_time VARCHAR(255),
      end_work_time VARCHAR(255),
      locations VARCHAR(255),
      responsible UUID,
      type INT DEFAULT 0,
      sought_workers INT DEFAULT 0,
      date DATE DEFAULT NOW(),
      notes VARCHAR(255),
      workers UUID[] DEFAULT array[]::UUID[]
    );
    `;

    console.log(`Created "events" table`);

    // Insert data into the events table
    const insertedEvents = await Promise.all(
      events.map(async (event) => {
        return client.sql`
        INSERT INTO events (
                            name, 
                            start_work_time, 
                            start_event_time, 
                            end_event_time, 
                            end_work_time, 
                            locations, 
                            type,
                            sought_workers,
                            date,
                            notes
                          )
        VALUES (
          ${event.name}, 
          ${event.start_work_time}, 
          ${event.start_event_time}, 
          ${event.end_event_time},
          ${event.end_work_time},
          ${event.locations},
          ${event.type},
          ${event.sought_workers},
          ${event.date},
          ${event.notes}
          )
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );
    console.log(`Seeded ${insertedEvents.length} events`);

    return {
      createTable,
      events: insertedEvents,
    };
  } catch (error) {
    console.error('Error seeding events:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);
  await seedEvents(client);
  await seedStreck(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
