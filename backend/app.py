from flask import Flask
from message import socketio

app = Flask(__name__)
socketio.init_app(app)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
