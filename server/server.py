# For handling file path
import os
import sqlite3

from flask import Flask,jsonify,request, session
from flask_cors import CORS
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

# create app instance - configure app
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# enabling CORS to allow request
CORS(app, origins=["http://localhost:5173"],  supports_credentials=True)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_path = os.path.join(BASE_DIR, "mindmint.db")

# We don't need init_db since we created the db with CLI

# Get the user for login from database
def get_user(username):
    conn = sqlite3.connect(DB_path)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ?',(username,))
    user = cursor.fetchall()
    conn.close()
    return user


# Get usernames for validatoni from database
def get_usernames(username):
    conn = sqlite3.connect(DB_path)
    cursor = conn.cursor()
    cursor.execute('SELECT username FROM users WHERE username = ?',(username,))
    user = cursor.fetchall()
    conn.close()
    return user


# Add a user to database
def add_user(username, hash):
    conn = sqlite3.connect(DB_path)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (username, hash) VALUES (?, ?)',(username, hash))
    conn.commit()
    conn.close()

# TODO: Update user's password

# Add tasks to DB
def insert_tasks(taskName, priority_score, energy, urgency, time):
    conn = sqlite3.connect(DB_path)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO tasks (taskName, priority_score, energy, urgency, time, user_id) VALUES (?,?,?,?,?,1)', (taskName, priority_score, energy, urgency, time))
    conn.commit()
    conn.close()

# Add a user to database
def get_tasks():
    conn = sqlite3.connect(DB_path)
    cursor = conn.cursor()
    cursor.execute('SELECT taskName, priority_score FROM tasks')
    tasks = cursor.fetchall()
    conn.close()
    return tasks

# Delete Tasks - when a session is over
def delete_tasks(id):
    conn = sqlite3.connect(DB_path)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tasks WHERE id = ?', (id))
    conn.commit()
    conn.close()

    
# TODO: Delete user

# json - a list of dicts
tasks = [
]

# 
@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/api/add_task",methods=["POST", "GET"])
def add_task_route():

    """Dashboard - Adding tasks"""

    global tasks

# If POST then read the tasks and append
    if request.method == "POST":

        new_task = request.get_json()

        # TODO: add to db, if new task exists
        if new_task:

            # validation: checking for empty input text field, if missing status code 400
            if new_task["taskName"] == "":
                return jsonify ({"field":"taskName", "code":"REQUIRED"}),400
            
            else:
                # Calculating "priority_score" in order to calculate priority level.
                new_task["priority_score"] = round((new_task["urgency"]*0.6) + (new_task["energy"]*0.2) + (new_task["time"]*0.2))
                insert_tasks(new_task["taskName"], new_task["priority_score"], new_task["energy"], new_task["urgency"], new_task["time"])
                tasks.append(new_task)
                return jsonify ({"message": "Task added", "task":new_task}),201
            
        else:
            return jsonify({"error: Invalid JSON"}),400
    else:
        return jsonify(get_tasks())
    

# Prioritize and return top 3 tasks
    
@app.route("/api/prioritize",methods=["GET"])
def prioritize_tasks():
    global tasks
     # Calculate the top 3 tasks from tasks array
    # We can just sort the array in order of priority_score and select top 3

    # defining a funciton to pass as a key in sort
    def get_priority(task):
        return task["priority_score"]

    #sorting with python's sort
    sorted_tasks = sorted(tasks, key=get_priority, reverse=True)

    top_tasks = []
    priority = ["First","Second", "Third"] 

    # store top 3 tasks in top_tasks array
    if len(sorted_tasks) > 3:
        for i in range(3):
            top_tasks.append(sorted_tasks[i])
    else:
        top_tasks = sorted_tasks

    # for each value in top_tasks set priority
    # run a loop for lentght of top tasks and take the i from priority and set respectively
    for i in range(len(top_tasks)):
        top_tasks[i]["priority"] = priority[i]
    
    # If GET then send the data to be displayed
    return jsonify(top_tasks)


@app.route("/api/logout", methods=["POST"])
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # send success message
    return jsonify({"success": True}), 200



@app.route("/api/signup", methods=["POST"])
def singup():

    """Sign in the user"""

    # Getting the data from FE
    data = request.get_json()
    if not data:
        return jsonify({"code": "INVALID_JSON"}), 400

    # Form validation - return error message if field missing
    
    username = data.get("username")
    password = data.get("password")
    confirmation = data.get("confirmation")

    if not username:
        return jsonify({"field":"username", "code":"REQUIRED"}),400

    if not password:
        return jsonify({"field":"password", "code":"REQUIRED"}),400

    if not confirmation:
        return jsonify({"field":"confirmation", "code":"REQUIRED"}),400

    # If passwords don't match return error
    if password != confirmation:
        return jsonify({"field":"password", "code":"INVALID"}),400

    # If username is taken return apology
    rows = get_usernames(username)

    if len(rows) != 0:
        return jsonify({"field":"username", "code":"TAKEN"}),400

    # Generate hash password
    hash = generate_password_hash(password)

    # Insert user into the database
    add_user(username, hash)

    # Logging the user in
    users = get_user(username)
    # from the rows logging in the first user
    session["user_id"] = users[0][0]

    print("Sign in Successful!")
    
    # Send success message if logged in
    return jsonify({"success": True}), 200


@app.route("/api/login", methods=["POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # Get the data from FE
    data = request.get_json()

    if not data:
        return jsonify({"code": "INVALID_JSON"}), 400
    
    # Extracting username
    username = data.get("username")
    password = data.get("password")

    # Ensure username was submitted
    if not username:
        return jsonify({"field":"username", "code":"REQUIRED"}),400

    # Ensure password was submitted
    elif not password:
        return jsonify({"field":"password", "code":"REQUIRED"}),400

    # Query database for username
    rows = get_user(username)

    # Ensure username exists and password is correct
    if len(rows) != 1 or not check_password_hash(
        rows[0][2], password
    ):
        return jsonify({"field":"INVALID_CREDENTIALS", "code":"INVALID"}),400

    # Remember which user has logged in
    session["user_id"] = rows[0][0]

    print("user_id", rows[0][0])

    # Send success message if logged in
    return jsonify({"success": True}), 200

@app.route("/api/auth/status")
def authStatus():
    """Check if user is logged in"""

    if "user_id" not in session:
        print("logged out")
        return jsonify({"logged_in": False}), 200
    else:
        print("logged in")
        return jsonify({
            "logged_in": True,
        })
       


# Running app
if __name__ == "__main__":
    app.run(debug=True) # debug=True since we're in dev mode