from flask import Flask
from message import socketio
from flask_bcrypt import Bcrypt

# Flask app and sqlalchemy init
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
socketio.init_app(app)
from models import db
db.init_app(app)
with app.app_context():
    db.create_all()

bcrypt = Bcrypt(app)
from myauth import auth_routes
app.register_blueprint(auth_routes)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
