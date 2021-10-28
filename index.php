<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Подводный мир</title>
	<link rel="stylesheet" href="css/style.css">
	<script type='text/javascript' src='js/jquery-3.2.1.min.js'></script>
	<script type='text/javascript' src='js/game.js'></script>
</head>
<body>
	<div id='help_zone'>?</div>
	<div id="reg_zone">
		<div id="reb_block">
			<form action="#" name='reg_form'>
				<h3>Подводный мир</h3>
				<input type="text" name="player" id='player' placeholder="Введите имя игрока">
				<input type="button" name="b_start" id="b_start" class='b_disabled' value='Начать' disabled>
			</form>
		</div>
	</div>
	<div id="game_zone">
		<div id="warp_game">
			<div id="game_header">
				<div class='header_el' id='header_time'>Время: 00:00</div>
				<div class='header_el' id='header_player'>Игрок: Firus</div>
				<div class='header_el' id='header_score'>Счёт: 0</div>
				<div class='header_el' id='header_pause'><input type='button' id='b_pause' name='b_pause' value='Пауза'></div>
			</div>
			<div id='game'>
			</div>
		</div>
	</div>
	<div id="records_zone">
		<div id="records_block">
				<h3>Результаты</h3>
				<hr>
				<div id='records'>
					
				</div>
				<hr>
		</div>
	</div>
</body>
</html>