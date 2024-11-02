from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import hashlib
import sqlite3
import os

def generate_password_hash(password):
    # Create a SHA-256 hash object
    sha256_hash = hashlib.sha256()
    # Update the hash object with the bytes of the password
    sha256_hash.update(password.encode('utf-8'))
    # Return the hexadecimal digest of the hash
    return sha256_hash.hexdigest()

def check_password_hash(stored_hash, input_password):
    # Hash the input password
    hashed_input_password = generate_password_hash(input_password)
    # Compare the hashed input password with the stored hash
    return stored_hash == hashed_input_password

app = Flask(__name__)
CORS(app)

# Configure SQLite database
DATABASE = 'ProjectFinderDB.sqlite'

# JWT configuration
app.config['JWT_SECRET_KEY'] = 'Qg1xVpUrSIksaaFAKtHWX8Nj1LU1X8J8IK+PBZAGgW2OBUEJPx5zQSkdAvtBXRd/PnD7EO8lUHdWFL3nKmZCmw=='
jwt = JWTManager(app)

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Allows accessing columns by name
    return conn

@app.route('/api/auth/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT password_hash FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()

    if user and check_password_hash(user['password_hash'], password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401

@app.route('/api/register', methods=['POST'])
def register():
    firstname = request.json.get('firstname')
    surname = request.json.get('surname')
    password = request.json.get('password')
    email = request.json.get('email')

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"msg": "User already exists."}), 400

        password_hash = generate_password_hash(password)
        cursor.execute("INSERT INTO users (firstname, surname, password_hash, email) VALUES (?, ?, ?, ?)", (firstname, surname, password_hash, email))
        conn.commit()

    return jsonify({"msg": "User registered successfully."}), 201

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(msg="This is a protected route."), 200


# Getting 
@app.route('/api/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(user), 200

if __name__ == '__main__':
    if not os.path.exists(DATABASE):
        with open(DATABASE, 'w'): pass  # Create the database file if it doesn't exist
    app.run(debug=True)