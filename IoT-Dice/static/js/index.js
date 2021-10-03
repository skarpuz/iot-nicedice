document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/dicedata')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

function loadHTMLTable(data) {
    console.log(data);
}