var music= document.getElementById("music");
var unmuteButton=document.getElementById("unmutedButton");
var progbar = {
    top: 75,
    left: 40
};

var enemies = [
    { left: randomizer(), top: 0 }
];

document.onkeydown = function (e) {
    if (progbar.left >= 0 && progbar.left <= 77.5) {
        if (e.key === 'ArrowLeft') {
            if (progbar.left > 0) {
                progbar.left = progbar.left - 0.5;
            }
        }

        else if (e.key === 'ArrowRight') {
            if (progbar.left < 77.5) {
                progbar.left = progbar.left + 0.5;
                }
        }
    }
    drawHero();
};

function drawHero() {
            document.getElementById('progbar').style.left = progbar.left + '%';
            document.getElementById('progbar').style.top = progbar.top + '%';
        }


function drawEnemies() {
    document.getElementById('enemies').innerHTML = "";
    for(var i = 0 ; i < enemies.length ; i++ ) {
        document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[i].left}%; top:${enemies[i].top}%'></div>`;
    }
}

function moveEnemies() {
    for(var i = 0 ; i < enemies.length ; i++ ) {
        enemies[i].top = enemies[i].top + 5;
    }
}


function randomizer() {
    return Math.floor(Math.random()*120)+1;
}


function collisionDetection() {
    for (var enemy = 0; enemy < enemies.length; enemy++) {
            if (
                enemies[enemy].left >= progbar.left &&
                enemies[enemy].left <= progbar.left + 37 &&
                enemies[enemy].top >= progbar.top &&
                enemies[enemy].top <= progbar.top + 10
            ) {
                enemies.splice(enemy, 1);
            }
        }
}


var i = 0;

function gameLoop() {
            i++;
                if (i%10 === 0) {
                    enemies.push({left: randomizer(), top: 0})
                }
                    setTimeout(gameLoop, 500);
                    moveEnemies();
                    collisionDetection();
                    drawEnemies();}


unmuteButton.addEventListener('click', function() {

    music.currentTime = 0;
    music.loop = true;
    music.muted = false;
    music.play();
  });
gameLoop();