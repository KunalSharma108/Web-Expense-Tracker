from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")


@app.route("/members", methods=["GET"])
def members():
    data = {"members": ["member 1", "member 2", "membere 3"]}
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
