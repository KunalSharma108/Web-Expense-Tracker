from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route("/isOnline", methods=["GET"])
def isOnline():
    return "nothing"


if __name__ == "__main__":
    app.run(debug=True)
