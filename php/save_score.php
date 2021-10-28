<?php
$name = $_POST['player_name'];
$score = $_POST['player_score'];
// Соединяемся, выбираем базу данных
$mysqli = new mysqli("localhost", "root", "", "game");
// Выполняем SQL-запрос
$q = "INSERT INTO `players` (`name`, `score`) VALUES ('$name', '$score')";
$result = $mysqli->query($q);
$id = $mysqli->insert_id;

$q = "SELECT  `id` ,  `name` ,  `score` 
FROM  `players` 
WHERE 1 
ORDER BY score DESC
";
$result = $mysqli->query($q);
// Выводим результаты в html
$i=1;
while ($row = $result->fetch_row()) {
	if($row[0] == $id){
		break;
	}
	$i++;
}
//i - место игрока
$result = $mysqli->query($q);
if ($i <10){	
	for ($mesto = 1; $mesto < 11; $mesto++){
		$row = $result->fetch_row();
		if ($mesto == $i)
		{
			echo "<div class='e_table' id='my_score'>$mesto. $row[1] --- $row[2]</div>";
		}
		else
		{
			echo "<div class='e_table'>$mesto. $row[1] --- $row[2]</div>";
		}
	}
}
else{
	for ($mesto = 1; $mesto < 10; $mesto++){
		$row = $result->fetch_row();
		echo "<div class='e_table'>$mesto. $row[1] --- $row[2]</div>";
	}
	echo "<div class='e_table' id='my_score'>$i. $name --- $score</div>";
}

?>