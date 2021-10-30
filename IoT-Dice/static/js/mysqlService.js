/**
 * This JS file handles the connection with the database
 */

const mysql = require('mysql');

/**
 * Create a pool of MySQL connections
 */
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

/**
 * Retrieve a MySQL connection
 * 
 * @param callback The callback function to execute once this function is done
 */
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

/**
 * Format the variables in the SQL query with the corresponding values
 * 
 * @param sql The SQL query to execute
 * @param inserts Optional values corresponding to optional variables in the @param sql query
 * @returns 
 */
function formatSQL(sql, inserts) {
    return mysql.format(sql, inserts);
}

exports.getConnection = getConnection;
exports.formatSQL = formatSQL;