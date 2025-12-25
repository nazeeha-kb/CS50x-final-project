from flask import Flask,jsonify,request
from flask_cors import CORS

import sqlite3

# create app instance - configure app
app = Flask(__name__)
# enabling CORS to allow requests
CORS(app)

DB_path = f"C:\repos\CS50x-final-project\server\mindmint.db"

# Database Setup
 
def init_db():   
    conn = sqlite3.connect(DB_path)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username TEXT NOT NULL, hash TEXT NOT NULL, cash NUMERIC NOT NULL DEFAULT 10000.00);
        CREATE UNIQUE INDEX username ON users (username)
''')
    conn.commit()
    conn.close()



# json - a list of dicts
tasks = [
]

# Tasks API route
# If POST then read the tasks and append
@app.route("/api/tasks",methods=["POST", "GET"])
def dashboard():

    global tasks

    if request.method == "POST":

        new_task = request.get_json()

        # TODO: add to db, if new task exists
        if new_task:

            # validation: checking for empty input text field, if missing status code 400
            if new_task["taskName"] == "":
                return jsonify ({"field":"taskName", "code":"REQUIRED"}),400
            
            else:
                # Giving the tasks enumerating ids
                # TODO: enumerate directly in SQL
                # If the data list is empty, start with ID 1
                if len(tasks) == 0:
                    new_task["id"] = 1
                else:
                    # Get the last task's ID and add 1
                    last_task = tasks[-1]  # the most recently added task
                    new_task["id"] = last_task["id"] + 1
                
                # Calculating "priority_score" in order to calculate priority level.
                new_task["priority_score"] = round((new_task["urgency"]*0.6) + (new_task["energy"]*0.2) + (new_task["time"]*0.2))

                tasks.append(new_task)
                return jsonify ({"message": "Task added", "task":new_task}),201
            
        else:
            return jsonify({"error: Invalid JSON"}),400
    else:
        return jsonify(tasks)
    

# Prioritize and return top 3 tasks
    
@app.route("/api/prioritize",methods=["GET"])
def prioritize_api():
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






# Running app
if __name__ == "__main__":
    app.run(debug=True) # debug=True since we're in dev mode