var progbar = {
    top: 75,
    left: 40
};

document.onkeydown = function (e) {
    console.log(e.key);
    if (progbar.left >= 0 && progbar.left <= 77.5) {
        if (e.key === 'ArrowLeft') {
            if (progbar.left > 0) {
                console.log(progbar.left)

                console.log('omg left key');
                progbar.left = progbar.left - 0.5;
            }
        }

        else if (e.key === 'ArrowRight') {
            if (progbar.left < 77.5) {
                console.log(progbar.left)

                console.log('omg right key');
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