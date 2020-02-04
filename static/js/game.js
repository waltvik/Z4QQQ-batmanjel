var progbar = {
    top: 600,
    left: 600
};

document.onkeydown = function (e) {
    console.log(e.key);
    if (progbar.left >= 0 && progbar.left <= 1240) {
        if (e.key === 'ArrowLeft') {
            if (progbar.left > 0) {
                console.log(progbar.left)

                console.log('omg left key');
                progbar.left = progbar.left - 10;
            }
        }

        else if (e.key === 'ArrowRight') {
            if (progbar.left < 1240) {
                console.log(progbar.left)

                console.log('omg right key');
                progbar.left = progbar.left + 10;
                }
        }
    }
    drawHero();
}

function drawHero() {
            document.getElementById('progbar').style.left = progbar.left + 'px';
            document.getElementById('progbar').style.top = progbar.top + 'px';
        }