var music= document.getElementById("music");
var unmuteButton=document.getElementById("unmutedButton");

var progbar = {
    top: 75,
    left: 40
};

var currentScore = 0;

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
};

var sprites = [blue, orange, red]

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
        document.getElementById('enemies').innerHTML += `<div class='enemy' style="left:${enemies[i].left}%; top:${enemies[i].top}%; background-image:${enemies[i].background}"></div>`;
    }
}

function moveEnemies() {
    for(var i = 0 ; i < enemies.length ; i++ ) {
        enemies[i].top = enemies[i].top + enemies[i].speed;
    }
}


function randomizer() {
    return Math.floor(Math.random()*98)+1;
}


function sprite_speeder() {
    return Math.floor(Math.random()*20)+1;
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

                if (enemies[enemy].score === 1) {
                    const barbar = document.createElement('div');
                    barbar.classList.add('progressbar');
                    progress_container.appendChild(barbar);
                    currentScore ++;
                }

                else if (enemies[enemy].score === -1) {
                    var x = document.getElementById("progresss").childElementCount;
                    console.log(x);
                    if (x !== 0){
                        progress_container.removeChild(progress_container.lastChild);
                        if (currentScore === 0) {
                            currentScore = 0
                        }
                        else{
                            currentScore --
                        }
                        }
                    }

                else if (enemies[enemy].score === 0){
                    changeBackground();
                    endgame();
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
    var x = document.getElementById("progbar");
    x.style.display = "none";
    var y = document.getElementById("enemies");
    y.style.display = "none";
    var z = document.getElementById("music");
    z.style.display = "none";
    var d = document.getElementById("unmutedButton");
    d.style.display = "none";
    var b = document.getElementById("backbtn");
    b.style.display = "block";


}

function winCheck() {
    if (currentScore === 17){
        document.body.style.backgroundImage = "url('/static/assets/clippytest2.jpg')"
    }
    else{
        console.log("Score:" + currentScore)
    }
}


var i = 0;

function gameLoop() {
        i++;

        moveEnemies();
        if (i%10 === 0) {
            var new_sprite = choose_random_sprite();
            enemies.push({left: randomizer(), top: 0, background: new_sprite.background, score: new_sprite.score, speed:sprite_speeder()});
        }
        bckgrnd = document.getElementsByTagName('body');
        if (bckgrnd.item(0).style.backgroundImage !== 'url("/static/assets/bsod.jpg")') {
            setTimeout(gameLoop, 300);
        }
        collisionDetection();
        winCheck();
        drawEnemies();
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