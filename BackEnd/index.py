from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route("/isOnline", methods=["GET"])
async def isOnline():
    result = True

    if result == True:
        return "online"
    else:
        return "offline"


if __name__ == "__main__":
    app.run(debug=True)
