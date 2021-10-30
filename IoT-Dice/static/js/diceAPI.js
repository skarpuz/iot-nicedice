/**
 * This JS file contains logic for retrieving the simulated die roll from the http:api.iot.hva-robots.nl/dice API
 * 
 * Example JSON response from the API
 * {
 *   "success":true,
 *   "data":
 *       {
 *           "dice":4
 *       }
 *   }
 * 
 */
const axios = require("axios");

/**
 * Call the roll-dice endpoint and retrieve the rolled number
 * 
 * @param callback The callback function to execute once this function is done
 */
function rollDice(callback) {
  axios.get("http://api.iot.hva-robots.nl/dice")
    .then((response) => {

      // Retrieve the response data object
      const responseData = response.data;

      // Retrieve the actual rolled number by accessing the response object (see JSON example above)
      const number = responseData.data.dice;

      callback(number);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
}

exports.rollDice = rollDice;