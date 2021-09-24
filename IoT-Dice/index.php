<!DOCTYPE html>

<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>🎲 Nice-Dice</title>
    <link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=IM+Fell+DW+Pica" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

<body id="body">

	<header id="header">
		<nav class="navbar navbar-style">
			<div class="container">
				<div class="navbar-header">
					<a href=""><img class="logo" src="images/dicelogo.png"></a>
					<p class="NiceDice"> Nice Dice </p>
				</div>
			</div>
		</nav>
	</header>

	<p class="lastroll-title">Last roll:</p>


		<div class="lastroll">
			<img class="lastrollimg" src="images/dice3.jpg">
		</div>


	<p class="statistics-title"> Statistics: </p>

	<div class="statistics-info">
		<div class="dice-dots">
			<img class="diceside" src="images/dice1.jpg">
			<p class="statistic-side1">4</p>
		</div>

		<div class="dice-dots">
			<img class="diceside" src="images/dice2.jpg">
			<p class="statistic-side2">7</p>
		</div>

		<div class="dice-dots">
			<img class="diceside" src="images/dice3.jpg">
			<p class="statistic-side3">2</p>
		</div>

		<div class="dice-dots">
			<img class="diceside" src="images/dice4.jpg">
			<p class="statistic-side4">9</p>
		</div>

		<div class="dice-dots">
			<img class="diceside" src="images/dice5.jpg">
			<p class="statistic-side5">6</p>
		</div>

		<div class="dice-dots">
			<img class="diceside" src="images/dice6.jpg">
			<p class="statistic-side6">1</p>
		</div>
	
	</div>
		
		
		
		

    <script src="js/main.js" type="text/javascript" charset="utf-8" async defer></script>
</body>

<footer id="footer">
	<?php
$host = "localhost";
$user = "root";
$pass = "root";
$db_name = "iot-dice";

 //create connection
$connection = mysqli_connect($host, $user, $pass, $db_name);

 //test if connection failed
if(mysqli_connect_errno()){
die("connection failed: "
. mysqli_connect_error()
. " (" . mysqli_connect_errno()
. ")");
}
//get results from database
$result = mysqli_query($connection,"SELECT * FROM dice");
$all_property = array(); //declare an array for saving property

 //showing property
echo '
<table class="table">
<thead>
<tr>
<th scope="col">Id</th>
<th scope="col">Latest roll</th>
<th scope="col">Date</th>
<th scope="col">Time</th>
</tr>
</thead>
<tbody>';
//showing all data
while ($row = mysqli_fetch_array($result)) {
echo "<tr>";
echo "<td>" . $row['id'] . "</td>";
echo "<td>" . $row['latest_roll'] . "</td>";
echo "<td>" . $row['date'] . "</td>";
echo "<td>" . $row['time'] . "</td>";
//get items using property value
echo '</tr>';
}
echo "</table>";
?>
</footer>

</html>

