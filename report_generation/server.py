from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

SECRET_KEY = "palavra_passe_ultra_secreta"
app.config['SECRET_KEY'] = SECRET_KEY

@app.route('/sensorsafe/generate_report', methods=['POST'])
def generate_report():
    auth = request.headers.get('Authorization')

    if auth != SECRET_KEY or not auth:
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    print("Received data:")
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    print("Starting server...")
    app.run(host='0.0.0.0',port=9999)
    print("Server stopped")
