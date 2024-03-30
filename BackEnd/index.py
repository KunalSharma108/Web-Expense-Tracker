from flask import Flask, jsonify
from flask_cors import CORS
import mysql_commands as MC

app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route("/isOnline", methods=["GET"])
async def isOnline():
    result = await MC.isOnline()

    if result == True:
        return "online"
    else:
        return "offline"


if __name__ == "__main__":
    app.run(debug=True)
