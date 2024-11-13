from flask_socketio import SocketIO, emit
from flask import request
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User
from app import db

socketio = SocketIO(cors_allowed_origins="*")

connected_users = {}

@socketio.on('connect')
@jwt_required()
def handle_connect():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)

    connected_users[request.sid] = user.username
    print(connected_users)
    print('Client connected')
    emit('connection_message', user.username)

    emit('active_count', len(connected_users), broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    print(f'Client: {connected_users[request.sid]} disconnected')
    del connected_users[request.sid]

    emit('active_count', len(connected_users), broadcast=True)

@socketio.on('chat message')
@jwt_required()
def handle_chat_message(data):
    print(f"Received chat message: {data}")
    username = connected_users[request.sid]
    emit('chat message', {"username": username, "message": data, "time": datetime.now().strftime("%Y-%m-%dT%H:%M:%S") }, broadcast=True)
