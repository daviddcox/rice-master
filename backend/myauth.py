from flask import Blueprint, request, jsonify
from app import bcrypt, db
from models import User

auth_routes = Blueprint('main', __name__)

@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    hashed_pass = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    print(username, hashed_pass)
    user = User(username=username,password=hashed_pass)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 200

@auth_routes.route("/users", methods=["GET"])
def get_users():
    users = db.session.execute(db.select(User).order_by(User.username)).scalars()
    user_list = [user.to_dict() for user in users]
    return jsonify({"users": user_list})