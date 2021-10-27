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

exports.create = CREATE;
exports.getDiceData = READ;
exports.update = UPDATE;
exports.delete = DELETE;