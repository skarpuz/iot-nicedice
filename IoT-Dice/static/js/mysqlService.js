/**
 * This JS file handles the connection with the database
 */

 const mysql = require('mysql');

 const pool = mysql.createPool({
     host: process.env.HOST,
     user: process.env.USER,
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
     port: process.env.DB_PORT
 });
 
 function getConnection(callback) {
 
     pool.getConnection((err, conn) => {
         if (err) {
             return callback(err);
         }
 
         console.log("\nRetrieve database connection..");
         console.log(conn.state);
 
         callback(err, conn);
     });
 }