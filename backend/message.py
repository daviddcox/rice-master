from flask import Flask, request, jsonify
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

conencted_users = {}
user_id = 0

@app.route('/')
def index():
    return "Flask SocketIO server is running."

@socketio.on('connect')
def handle_connect():
    global user_id
    conencted_users[request.sid] = user_id 
    user_id += 1
    print(conencted_users)
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print(f'Client: {conencted_users[request.sid]} disconnected')
    del conencted_users[request.sid]

@socketio.on('chat message')
def handle_chat_message(data):
    print(f"Received chat message: {data}")
    user_id = conencted_users[request.sid]

    emit('chat message', { "user_id": user_id, 'message': data }, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
