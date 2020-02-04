var progbar = {
    top: 75,
    left: 40
};

var enemies = [
    { left: randomizer(), top: 100 },
    { left: randomizer(), top: 100 },
    { left: randomizer(), top: 100 }
];

document.onkeydown = function (e) {
    console.log(e.key);
    if (progbar.left >= 0 && progbar.left <= 77.5) {
        if (e.key === 'ArrowLeft') {
            if (progbar.left > 0) {
                console.log(progbar.left)
                progbar.left = progbar.left - 0.5;
            }
        }

        else if (e.key === 'ArrowRight') {
            if (progbar.left < 77.5) {
                console.log(progbar.left)
                progbar.left = progbar.left + 0.5;
                }
        }
    }
    drawHero();
}

function drawHero() {
            document.getElementById('progbar').style.left = progbar.left + '%';
            document.getElementById('progbar').style.top = progbar.top + '%';
        }


function drawEnemies() {
    document.getElementById('enemies').innerHTML = ""
    for(var i = 0 ; i < enemies.length ; i++ ) {
        document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[i].left}%; top:${enemies[i].top}px'></div>`;
    }
}

function moveEnemies() {
    for(var i = 0 ; i < enemies.length ; i++ ) {
        enemies[i].top = enemies[i].top + 10;
    }
}


function randomizer() {
    return Math.floor(Math.random()*97)+1;
}


function gameLoop() {
            setTimeout(gameLoop, 100)
            moveEnemies();
            drawEnemies();
        }

gameLoop()