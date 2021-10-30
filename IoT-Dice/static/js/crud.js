/**
 * This JS file contains logic for the CRUD operations
 */
const mysqlConnection = require("./mysqlService");

/**
 * CREATE
 * Creates a new entry in the database representing a new die roll.
 */
function CREATE(numberRolled) {
    mysqlConnection.getConnection((err, conn) => {
        if (err) {
            console.log("ERROR!");
            throw err;
        }

        let sql = "INSERT INTO `dicedata`(`number`, `date`, `time`) VALUES (?, ?, ?);";

        let date = new Date();
        let dateString = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);

        let inserts = [
            numberRolled,
            dateString,
            date.toLocaleTimeString(),
        ];

        console.log(inserts);

        sql = mysqlConnection.formatSQL(sql, inserts);

        conn.query(sql, function (err, rows) {
            if (err) {
                throw err;
            }
            console.log("Created a new entry in the database!");
        });

        conn.release();
    });
}

/**
 * READ
 * Reads data from the database. In particular for populating the table on the index.html page.
 */
function READ(callback) {
    mysqlConnection.getConnection((err, conn) => {
        if (err) {
            console.log("ERROR!");
            throw err;
        }

        let sql = "SELECT * from dicedata ORDER BY time DESC;";

        conn.query(sql, function (err, rows) {
            if (err) {
                throw err;
            }

            let arrayDicedata = [];

            rows.forEach((row) => {
                arrayDicedata.push({
                    date: row.date,
                    time: row.time,
                    number: row.number,
                });
            });

            callback(arrayDicedata);
        });

        conn.release();
    });
}

/**
 * UPDATE
 * Not implemented since this app has no need for an UPDATE functionality.
 */
function UPDATE() {
    // Empty
}

/**
 * DELETE
 * Not implemented since this app has no need for a DELETE functionality
 */
function DELETE() {
    // Empty
}

/**
 * Get the number of entries with 'number' equal to 'numberRolled'
 * Basically, this gets the count of how many times a certain number is rolled.
 * 
 * @param {*} numberRolled The number to consider this query for
 */
function getCount(numberRolled, callback) {
    mysqlConnection.getConnection((err, conn) => {
        if (err) {
            console.log("ERROR!");
            throw err;
        }

        let sql = "SELECT * from dicedata WHERE number = ?;";

        let inserts = [numberRolled];
        sql = mysqlConnection.formatSQL(sql, inserts);

        conn.query(sql, function (err, rows) {
            if (err) {
                throw err;
            }

            callback(rows.length);
        });

        conn.release();
    });
}

/**
 * Get the latest roll
 * 
 * @param callback The callback function to execute once this function is done
 */
function getLatestRoll(callback) {
    mysqlConnection.getConnection((err, conn) => {
        if (err) {
            console.log("ERROR!");
            throw err;
        }

        let sql = "SELECT * FROM dicedata ORDER BY time DESC LIMIT 1;";

        conn.query(sql, function (err, rows) {
            if (err) {
                throw err;
            }

            let latestRoll = {};

            if (rows.length != 0) {
                latestRoll = {
                    number: rows[0].number,
                    time: rows[0].time,
                    date: rows[0].date
                };
            } else {
                latestRoll = {
                    number: 0
                }
            }

            callback(latestRoll);
        });

        conn.release();
    });
}

/**
 * Clear the database
 * 
 * @param callback The callback function to execute once this function is done
 */
function clearDB(callback) {
    mysqlConnection.getConnection((err, conn) => {
        if (err) {
            console.log("ERROR!");
            throw err;
        }

        let sql = "DELETE FROM `dicedata`;";

        conn.query(sql, function (err, rows) {
            if (err) {
                throw err;
            }

            callback();
        });

        conn.release();
    });
}

exports.create = CREATE;
exports.getDiceData = READ;
exports.update = UPDATE;
exports.delete = DELETE;
exports.getCount = getCount;
exports.getLatestRoll = getLatestRoll;
exports.clearDB = clearDB;