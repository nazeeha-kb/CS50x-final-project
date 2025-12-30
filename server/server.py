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
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ?',(username,))
    rows = cursor.fetchall()
    user = [dict(row) for row in rows]
    conn.close()
    return user


# Get usernames for validation from database
def get_usernames(username):
    conn = sqlite3.connect(DB_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT username FROM users WHERE username = ?',(username,))
    rows = cursor.fetchall()
    user = [dict(row) for row in rows]
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

# Get tasks from DB
def get_tasks(user_id):
    conn = sqlite3.connect(DB_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT id, taskName, priority, status FROM tasks WHERE user_id = ?',(user_id,))
    rows = cursor.fetchall()
    # this returns an array of dict instead of tuples so we can safely do task.id, etc in fe
    tasks = [dict(row) for row in rows]
    conn.close()
    return tasks

# Update task's status
def update_status(status,user_id,id):
    conn = sqlite3.connect(DB_path)
    cursor = conn.cursor()
    cursor.execute('UPDATE tasks SET status = ? WHERE user_id = ? AND id = ?',(status,user_id,id))
    conn.commit()
    conn.close()
    
# Delete Tasks - when a session is over
def delete_tasks(id):
    conn = sqlite3.connect(DB_path)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tasks WHERE id = ?', (id))
    conn.commit()
    conn.close()

    
# TODO: Delete user

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
            
                # intialize user's task list if doesn't exist
                if "tasks" not in session:
                    session["tasks"] = []
                    new_task["id"] = 1

                elif len(session["tasks"]) < 1:
                    new_task["id"] = 1

                # setting incremental id for tasks
                else:
                    new_task["id"] = session["tasks"][-1]["id"] + 1

                # append task in the array
                session["tasks"].append(new_task)
            
                return jsonify ({"message": "Task added", "task":new_task}),201
            
        else:
            return jsonify({"error: Invalid JSON"}),400
    else:
        # return jsonify(get_tasks())
        return jsonify(session["tasks"])

# Prioritize and return top 3 tasks
    
@app.route("/api/prioritize",methods=["POST","GET"])
def prioritize_tasks():
     # Calculate the top 3 tasks from tasks array
    # We can just sort the array in order of priority_score and select top 3

    # defining a funciton to pass as a key in sort
    def get_priority(task):
        return task["priority_score"]

    #sorting with python's sort
    sorted_tasks = sorted(session["tasks"], key=get_priority, reverse=True)

    top_tasks = []
    priority = ["First","Second", "Third"] 

                
    # store top 3 tasks in top_tasks array
    if len(sorted_tasks) > 3:
        for i in range(3):
            top_tasks.append(sorted_tasks[i])
    else:
        top_tasks = sorted_tasks

    # Clear the tasks array
    session["tasks"] = []

    # for each value in top_tasks set priority
    # run loop len(top_tasks) times, taking i from priority list, and set priority for each task.
    for i in range(len(top_tasks)):
        top_tasks[i]["priority"] = priority[i]

    # Inserting the top tasks into db 
    conn = sqlite3.connect(DB_path)
    cursor = conn.cursor()
    # TODO: Delete previous tasks when all task status = done 
    cursor.execute("DELETE FROM tasks WHERE user_id = ?", (session["user_id"],))
    for task in top_tasks:
            cursor.execute(
        'INSERT INTO tasks (taskName, priority_score, energy, urgency, time, user_id, priority) VALUES (?,?,?,?,?,?,?)',
        (
            task["taskName"],
            task["priority_score"],
            task["energy"],
            task["urgency"],
            task["time"],
            session["user_id"],
            task["priority"]
        )
        )
    
    for task in top_tasks:
        if task["priority"] == "First":
            print("setting priority of",task)
            # first task's status is active
            cursor.execute('UPDATE tasks SET status = ? WHERE user_id = ? AND priority = ?',("active",session["user_id"], "First"))

    conn.commit()
    conn.close()
        
    print(get_tasks(session["user_id"]))
    
    
    return jsonify({"success":True}),200


# Send top tasks to frontend
@app.route("/api/tasks",methods=["GET"])
def tasks():
    # fetch tasks from db and set them to be top_tasks for persistance
    top_tasks = []
    top_tasks = get_tasks(session["user_id"])

    # Send top tasks to frontend
    return jsonify(top_tasks)

@app.route("/api/status_update/<int:id>", methods=["PUT"])
def status_update(id):
    """Update status of task"""
    data = request.get_json()
    status = data.get("status")
    # update task in DB where task.id == id
    update_status(status,session["user_id"],id)
    update_status("active",session["user_id"],id+1)
    return jsonify({"success":True}),200


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
    session["user_id"] = users[0]["id"]

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
        rows[0]["hash"], password
    ):
        return jsonify({"field":"INVALID_CREDENTIALS", "code":"INVALID"}),400

    # Remember which user has logged in
    session["user_id"] = rows[0]["id"]

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