from datetime import datetime, timedelta, timezone

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Flask app init
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config["JWT_COOKIE_SECURE"] = False # For http only; set to True for PRD
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SECRET_KEY"] = "SECRET KEY" # TODO: add env variable for key!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

# SQLAlchemy init
from models import db
db.init_app(app)
with app.app_context():
    db.create_all()

# Auth init
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
from myauth import auth_routes
app.register_blueprint(auth_routes)

# Messages init
from message import socketio
socketio.init_app(app)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
