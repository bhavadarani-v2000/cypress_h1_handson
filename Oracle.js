// db2Helper.js
const ibmdb = require('ibm_db');

// Replace with your DB2 connection details
const db2Config = {
  database: 'DATABASE_NAME',
  hostname: 'HOSTNAME',
  port: 50000, // default DB2 port
  protocol: 'TCPIP',
  uid: 'USERNAME',
  pwd: 'PASSWORD',
};

const queryDB2 = async (query) => {
  let conn;
  try {
    conn = await ibmdb.open(db2Config);
    const data = await conn.query(query);
    return data;
  } catch (error) {
    throw error;
  } finally {
    if (conn) await conn.close();
  }
};

module.exports = { queryDB2 };
