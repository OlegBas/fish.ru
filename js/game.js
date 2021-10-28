var time; //Оставшееся игровое время в секундах
var score;	//Счет
var count_fishs; //Количество рыб
var fish = []; //массив рыб
var paused = true;

var timer_interval_id;
var create_interval_id;

//Функция запускающая игру (сбрасывает все переменные в начало, снимает паузу, активируем запуск fps)
function start_game(){
	//Сброс переменных в начальные значения
	time = 100; //Оставшееся игровое время в секундах
	score = 0;	//Счет
	count_fishs = 0;	//Количествоы рыб

	//Устанавливаем имя игрока
	$('#header_player').html('Игрок: '+$('#player').val());

	//Снимаем паузу и запускаем обратный отсчет
	paused = false;
	timer_interval_id = setInterval(function(){
		if (!paused){
			if(time<=0){//проверка "Закончилось ли время?"
				endGame();
		}
		else{
			m=Math.floor(time/60)
			if(m<10)
			{
				m='0'+m;
			}
			s=time%60
			if(s<10)
			{
				s='0'+s;
			}
			$('#header_time').html('Время: '+m +":" + s);
			time--;
		} 
	}
}, 1000);

	//Запускаем попытку создания рыбы каждые 1500 милисекунд
	CreateFush(600); //Свойство - количество миллисекунд между попытками
}
function endGame() {
	$.ajax({
		  url: "php/save_score.php",
		  type: "POST",
		  data: {player_name: $("#player").val(), player_score : score},
		  success: function(result){
		        $("#records").html(result);
		    }
		});
	paused=true;
	clearInterval(timer_interval_id);
	clearInterval(create_interval_id);
	$('#game_zone').css({display : "none"});
	$('#records_zone').css({display : "block"});

}

function CreateFush(timeout) {
	create_interval_id = setInterval(function() {
		if(!paused){
			//Генерация рыб
			if (count_fishs<10){
				fish[fish.length] = new Fish(fish.length);
			}
		}
	}, timeout)
}

$(function(){
	//------------------------------------СЛУШАТЕЛИ----------------------------------------
	//Проверка ввода имени
	$('#player').on("keyup", function(){
		if($('#player').val()==''){
			$('#b_start').prop('disabled',true);
			$('#b_start').prop('class','b_disabled');
		}
		else
		{
			$('#b_start').prop('disabled',false);
			$('#b_start').prop('class','b_active');
		}
	});
	//Нажатие на кнопку "СТАРТ"
	$('#b_start').click(function(){
		//показываем игровую зону
		$('#reg_zone').css({display : "none"});
		$('#game_zone').css({display : "block"});
		//Запускаем игру
		start_game();
	});
	//Нажатие на кнопку паузы
	$('#b_pause').click(function(){
		paused=!paused;
		if(paused){
			$('#b_pause').val('Продолжить');
		}
		else{
			$('#b_pause').val('Пауза');
		}
	});
	//Нажатие на кнопку паузы через "пробел"
	$('body').keydown(function(e){
		if(e.keyCode == 32 && $("#game_zone").css('display') == "block"){
			paused=!paused;
			if(paused){
				$('#b_pause').val('Продолжить');
			}
			else{
				$('#b_pause').val('Пауза');
			}
		}
	});
	$('#help_zone').click(function(){
		paused=true;
		if(paused)
		$('#b_pause').val('Продолжить');
		window.open('/help.html');
	});
});

class Fish{
	constructor(id){
		var t =this;
		count_fishs++;
		this.id = id;
		this.killed=false;
		this.start_time = time;

		this.x;
		this.y;
		this.new_x;
		this.new_y;

		//Устанавливаем создаваемой рыбе начальные координаты
		this.type = randomInteger(1,3); //вернет случайный размер рыбы 1, 2 или 3
		switch(this.type){
			case 1:
			this.width = 42;
			this.height = 39;
			break
			case 2:
			this.width = 80;
			this.height = 59;
			break
			case 3:
			this.width = 110;
			this.height = 100;
			break
		}

		$('#game').append("<span class='fish' onclick='fish_kill("+this.id+")' id='fish_"+this.id+"'></span>");//Добавляем рыбу в игру

		//зная размеры картинки с рыбой, получим, что она может появиться:
		// по ширине X от 0 до ширина игровой зоны(800) - ширина рыбы
		this.x =  randomInteger(0,800-this.width);
		// по высоте Y от 50 до высота игровой зоны(600) - высота рыбы  (c 50 т.к. 50px высота верхней шапки игры)
		this.y =  randomInteger(50,600-this.height);
		
		$("#fish_" + this.id).css({
			'background-image' : "url(../images/"+this.type+".png)", 
			'width' : this.width, 
			'height' : this.height,
			'left' : this.x,
			'top' : this.y
		});
		t.time_live_id = setInterval(function(){
			if(t.start_time-time>10){
				dead(t.id);
				clearInterval(t.time_live_id);
			}
		},1000);
		t.move();
	}
	move(){
		var t =this;
		if(!t.killed){
			if(!paused){
				//Установим случайные значения, куда рыба должна переместиться
				this.old_x = this.x;
				this.old_y = this.y;
				this.new_x = randomInteger(0,800-this.width);
				this.new_y = randomInteger(50,600-this.height);
				if(t.new_x - t.old_x > 0){
					$("#fish_" + this.id).css({'background-image' : "url(../images/"+this.type+"_right.png)"});
				}
				else{
					$("#fish_" + this.id).css({'background-image' : "url(../images/"+this.type+".png)"});
				}
				var s = 0;
			}
		t.time_move_id = setInterval(function(){
			if (s<50 && !paused){
				t.x += (t.new_x - t.old_x)/50;
				t.y += (t.new_y - t.old_y)/50;
				$("#fish_" + t.id).css({
					'left' : t.x,
					'top' : t.y
				});
				s++;
			}
			else{
				clearInterval(t.time_move_id);
				t.move();
			}
		},100);
	}
}
}
function dead(id){
	if(!paused){
		$("#fish_" + id).css({'display' : "none"});
		count_fishs--;
		fish[id].killed=true;
	}
}

function fish_kill(id){
	if(!paused){
		$("#fish_" + id).css({'display' : "none"});
		count_fishs--;
		fish[id].killed=true;
		if(fish[id].type == 1){
			score +=3;
		}else if(fish[id].type == 2){
			score +=2;
		}else if(fish[id].type == 3){
			score +=1;
		}
		$("#header_score").html("Счёт: "+score);
	}
}
//Функция возвращает случайное число от min до max
function randomInteger(min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}