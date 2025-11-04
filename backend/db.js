const { Pool } = require("pg");

const pool = new Pool({
  user: "leeleeliang",  
  host: "localhost",
  database: "dishes_db",
  password: "",
  port: 5432,
});

module.exports = pool;