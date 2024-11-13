from flask import Blueprint, request, jsonify
from app import bcrypt, db, jwt
from models import User
from flask_jwt_extended import (
    create_access_token, get_jwt_identity, get_jwt, jwt_required,
    JWTManager, set_access_cookies, unset_jwt_cookies
)

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

@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    user = db.session.execute(db.select(User).where(User.username == username)).scalar()
    if (bcrypt.check_password_hash(user.password, data["password"])):
        response = jsonify({"message": "User logged in successfully"})
        access_token = create_access_token(identity=user.id)
        set_access_cookies(response, access_token)
        return response
    return jsonify({"message": "Username or password was invalid"}), 403

@auth_routes.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@auth_routes.route("/users", methods=["GET"])
def get_users():
    users = db.session.execute(db.select(User).order_by(User.username)).scalars()
    user_list = [user.to_dict() for user in users]
    return jsonify({"users": user_list})