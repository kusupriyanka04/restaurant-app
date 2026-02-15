// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "restaurant_db",
//   password: "YOUR_PASSWORD",
//   port: 5432,
// });

// module.exports = pool;

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

console.log('Supabase URL:', process.env.SUPABASE_URL ? 'OK' : 'Missing');
console.log('Supabase Key:', process.env.SUPABASE_SERVICE_KEY ? 'OK' : 'Missing');

module.exports = supabase;

