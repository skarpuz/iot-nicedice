/**
 * This JS file contains logic for the index.html file
 */

let prevTimestamp = 0;

/**
 * Update the image based on the current number rolled
 * 
 * @param rolledNumber The current number rolled
 */
function updateImage(rolledNumber) {
    const lastRollImage = document.getElementsByClassName(`lastrollimg`).item(0);
    lastRollImage.src = `../images/dice${rolledNumber}.jpg`;
}

/**
 * Update the counter of the current number rolled
 * 
 * @param rolledNumber The current number rolled
 * @param numberCount The number of times the <rolledNumber> has been rolled up until now
 */
function updateCounter(rolledNumber, numberCount) {
    const counter = document.getElementsByClassName(`statistic-side${rolledNumber}`).item(0);
    counter.innerHTML = numberCount;
}

/**
 * Fetch dice data and call the loadHTMLTable function with that data
 */
function updateHTMLTable() {
    fetch("http://localhost:5000/dicedata")
        .then((jsonResponse) => jsonResponse.json()) //.json() returns the result of taking JSON as input and parsing it to produce a JavaScript object
        .then((responseObject) => loadHTMLTable(responseObject.data));
}

/**
 * Construct an HTML table containing the dice data of all rolls
 * 
 * @param arrayOfRolls An array of all rolls up until now
 */
function loadHTMLTable(arrayOfRolls) {
    const table = document.getElementsByClassName("dicedata-table-body").item(0);

    if (arrayOfRolls.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No data</td></tr>";
        return;
    }

    let tableHtml = "";

    arrayOfRolls.forEach((roll) => {

        const rollDate = new Date(roll.date).toLocaleString([], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        tableHtml += "<tr>";
        tableHtml += `<td>${roll.number}</td>`;
        tableHtml += `<td>${rollDate}</td>`;
        tableHtml += `<td>${roll.time}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

/**
 * Get the information of the latest dice roll
 * 
 * @returns The number, time and date of the latest dice roll
 */
async function getLatestRoll() {
    const response = await fetch("/latestroll");
    const latestroll = await response.json(); //.json() returns the result of taking JSON as input and parsing it to produce a JavaScript object

    return latestroll.roll;
}

/**
 * Get the number of times <rolledNumber> has been rolled up until now
 * 
 * @param rolledNumber The number that is rolled at the current dice roll
 * @returns The number of times this number has been rolled up until now
 */
async function getNumberCount(rolledNumber) {
    const response = await fetch(`/numbercount?number=${rolledNumber}`);
    const numberCount = await response.json(); //.json() returns the result of taking JSON as input and parsing it to produce a JavaScript object

    return numberCount.count;
}

/**
 * General update function that calls the update functions for the separate components that need to be updated on the page
 */
async function update() {
    const latestRoll = await getLatestRoll();

    // At start up the database is cleared, meaning getLatestRoll() has no data to fetch.
    // In that case the number 0 is returned, a non-valid dice number.
    // If the number of the latest roll is 0, we do not update the page.
    if (latestRoll.number == 0) {
        return;
    }

    const rolledNumber = latestRoll.number;
    const currTimestamp = latestRoll.time;
    const numberCount = await getNumberCount(rolledNumber);

    // Only update the page if there is a new roll.
    if (prevTimestamp !== currTimestamp) {
        updateImage(rolledNumber);
        updateCounter(rolledNumber, numberCount);
        updateHTMLTable();
        prevTimestamp = currTimestamp;
    }
}

/**
 * Update the page every two seconds
 */
$(document).ready(async function refresh() {
    await update();
    setTimeout(refresh, 2000); // function refers to itself
});