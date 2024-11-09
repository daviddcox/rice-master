from flask import Flask
from message import socketio


if __name__ == '__main__':
    print("Starting server...")

    app = Flask(__name__)
    socketio.init_app(app)

    socketio.run(app, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True) # TODO figure out how to make this prod ready
