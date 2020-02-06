var music= document.getElementById("music");
var unmuteButton=document.getElementById("unmutedButton");

var progbar = {
    top: 75,
    left: 40
};

var enemies = [];


var blue = {
    background: "url('/static/assets/blueblock2.png')",
    score: 1
};

var orange = {
    background: "url('/static/assets/orangeblock.png')",
    score: -1
};

var red = {
    background: "url('/static/assets/redblock.png')",
    score: 0
}

var sprites = [blue, orange, red]

document.onkeydown = function (e) {
    console.log(e.key);
    if (progbar.left >= 0 && progbar.left <= 77.5) {
        if (e.key === 'ArrowLeft') {
            if (progbar.left > 0) {
                console.log(progbar.left);
                progbar.left = progbar.left - 0.5;
            }
        }

        else if (e.key === 'ArrowRight') {
            if (progbar.left < 77.5) {
                console.log(progbar.left);
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
        document.getElementById('enemies').innerHTML += `<div class='enemy' style="left:${enemies[i].left}%; top:${enemies[i].top}%; background-image:${enemies[i].background}"></div>`;
    }
}

function moveEnemies() {
    for(var i = 0 ; i < enemies.length ; i++ ) {
        enemies[i].top = enemies[i].top + 5;
    }
}


function randomizer() {
    return Math.floor(Math.random()*98)+1;
}


function choose_random_sprite() {
    return sprites[Math.floor(Math.random() * sprites.length)];
}

function changeBackground() {

document.body.style.backgroundImage = "url('/static/assets/bsod.jpg')";

}

function collisionDetection() {
    for (var enemy = 0; enemy < enemies.length; enemy++) {
            if (
                enemies[enemy].left >= progbar.left &&
                enemies[enemy].left <= progbar.left + 22 &&
                enemies[enemy].top >= progbar.top &&
                enemies[enemy].top <= progbar.top + 15
            ) {
                var progress_container = document.getElementById('progresss');
                var barzz = document.getElementById("progresss");
                console.log(barzz);
                if (enemies[enemy].score === 1) {
                    const barbar = document.createElement('div');
                    barbar.classList.add('progressbar');
                    progress_container.appendChild(barbar);
                }
                else if (enemies[enemy].score === -1 && document.getElementById("progresss")) {
                    progress_container.removeChild(progress_container.firstChild);
                    console.log('remove child');
                }
                else if (enemies[enemy].score === 0){
                    var alma = changeBackground();
                    console.log(alma)
                }
                enemies.splice(enemy, 1);
            }
        }
}


function end_of_screen() {
    for (var enemy = 0; enemy < enemies.length; enemy++) {
        if (
                    enemies[enemy].top > 90
                ) {
                    enemies.splice(enemy, 1);
                }
    }
}


function endgame() {
    console.log('vége');
    var x = document.getElementById("progbar");
    x.style.display = "none";
    var y = document.getElementById("enemies");
    y.style.display = "none";
    var z = document.getElementById("music");
    z.style.display = "none";
    var d = document.getElementById("unmutedButton");
    d.style.display = "none";
}

var i = 0;

function gameLoop() {
        i++;
        if (i%10 === 0) {
            var new_sprite = choose_random_sprite();
            enemies.push({left: randomizer(), top: 0, background: new_sprite.background, score: new_sprite.score});
        }
        bckgrnd = document.getElementsByTagName('body');
        if (bckgrnd.item(0).style.backgroundImage) {
            console.log(bckgrnd.item(0).style.backgroundImage)
            endgame();
        }
        else {
            setTimeout(gameLoop, 300);
        }

        moveEnemies();
        drawEnemies();
        collisionDetection();
        end_of_screen();
    }

unmuteButton.addEventListener('click', function() {
    if (music.muted === true){
        unmuteButton.src = "/static/assets/soundon.png";
        music.loop = true;
        music.muted = false;
        music.play();}
    else {unmuteButton.src = "/static/assets/nosound.jpg";
        music.muted = true;
    }
});

gameLoop();
console.log('running loop')