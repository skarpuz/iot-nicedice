document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/dicedata')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});
/**
 * This JS file contains logic for the index.html file
 */

/**
 * Update the image based on the current number rolled
 * 
 * @param rolledNumber The current number rolled
 */
function updateImage(rolledNumber) {
    const lastRollImage = document.getElementsByClassName(`lastrollimg`).item(0);
    lastRollImage.src = `../images/dice${rolledNumber}.jpg`;
}

function loadHTMLTable(data) {
    const table = document.getElementsByClassName('dicedata-table-body').item(0);

    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(item => {
        tableHtml += "<tr>";
        tableHtml += `<td>${item["number"]}</td>`;
        tableHtml += `<td>${new Date(item['date']).toLocaleString([], {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</td>`;
        tableHtml += `<td>${item['time']}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}