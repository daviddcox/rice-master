from flask_socketio import SocketIO, emit
from flask import request

socketio = SocketIO(cors_allowed_origins="*")

connected_users = {}
user_id = 0

@socketio.on('connect')
def handle_connect():
    global user_id
    connected_users[request.sid] = user_id
    print(connected_users)
    print('Client connected')
    emit('connection_message', user_id)
    user_id += 1

@socketio.on('disconnect')
def handle_disconnect():
    print(f'Client: {connected_users[request.sid]} disconnected')
    del connected_users[request.sid]

@socketio.on('chat message')
def handle_chat_message(data):
    print(f"Received chat message: {data}")
    user_id = connected_users[request.sid]
    emit('chat message', {"user_id": user_id, "message": data}, broadcast=True)
