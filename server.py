from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game')
def route_game():
    return render_template('gamepage.html')


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8002,
        debug=True,
    )