/**
 * This JS file contains logic for the CRUD operations
 */
 const mysqlConnection = require("./mysqlService");

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

 exports.getDiceData = READ;