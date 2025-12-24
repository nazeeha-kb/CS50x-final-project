from flask import Flask,jsonify,request
from flask_cors import CORS

# create app instance - configure app
app = Flask(__name__)
# enabling CORS to allow requests
CORS(app)

# json - a list of dicts
data = [
]

# Tasks API route
# If POST then read the data and append
@app.route("/api/tasks",methods=["POST", "GET"])
def tasks_api():

    global data

    if request.method == "POST":

        new_task = request.get_json()
        # Giving the tasks enumerating ids
        # TODO: enumerate directly in SQL
        # If the data list is empty, start with ID 1
        if len(data) == 0:
            new_task["id"] = 1
        else:
            # Get the last task's ID and add 1
            last_task = data[-1]  # the most recently added task
            new_task["id"] = last_task["id"] + 1

        # TODO: add to db, if new task exists
        if new_task:
            data.append(new_task)
            return jsonify ({"message": "Task added", "task":new_task}),201
        else:
            return jsonify({"error: Invalid JSON"}),400
    else:
        # If GET then send the data to beye displayed
        return jsonify(data)

# Running app
if __name__ == "__main__":
    app.run(debug=True) # debug=True since we're in dev mode