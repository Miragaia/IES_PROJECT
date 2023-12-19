from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from multiprocessing import Process
import time
from io import BytesIO
import os




app = Flask(__name__)
CORS(app, resources={r"/sensorsafe/*": {"origins": "http://localhost:3000"}})

SECRET_KEY = "palavra_passe_ultra_secreta"
app.config['SECRET_KEY'] = SECRET_KEY

#remove report.pdf
def clear_report():
    if os.path.exists("report.pdf"):
        os.remove("report.pdf")
    else:
        print("The file does not exist")

@app.route('/sensorsafe/generate_report', methods=['POST'])
def generate_report():
    auth = request.headers.get('Authorization')

    if auth != SECRET_KEY or not auth:
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    print("Received data:")
    print(data)

    if data is None:
        return jsonify({"error": "No data received"}), 400
    
    # Extract report type and additional data
    report_type = data.get('report_type')
    stats = data.get('stats', [])

    if not report_type:
        return jsonify({"error": "Report type not provided"}), 400
    
    # Clear the temporary directory
    clear_report()
    time.sleep(10)

    # Run the appropriate Python script based on the report type
    if report_type == 'stats':
        stats = []      #meter a receber do front
        # p = Process(target=startReport, args=(report_type, stats))
        # p.start()
        reportData = startReport(report_type, stats)
        print("Starting2 "+ report_type +" report: " + report_type)
        # time.sleep(5)
    elif report_type == 'maintenance':
        stats = []
        # p = Process(target=startReport, args=(report_type, stats))
        # p.start()
        reportData = startReportMan(report_type, stats)
        print("Starting "+ report_type +" report: " + report_type)
        # time.sleep(5)
    else:
        return jsonify({"error": "Invalid report type"}), 400

      # Return the report data with the correct Content-Type
    return jsonify(reportData), 200

def startReport(report_type, stats):
    print("Starting report: " + report_type)
    os.system("python3 generate_report_stats.py ")
    time.sleep(5)

    # Assuming the report is generated in the same directory with the name 'report.pdf'
    with open("report.pdf", "rb") as pdf_file:
        report_data = pdf_file.read()

    report_data_bytearray = bytearray(report_data)
    return {'report_data': report_data_bytearray.decode('latin-1')}

def startReportMan(report_type, stats):
    print("Starting2 report: " + report_type)
    os.system("python3 generate_report_maintenance.py ")
    time.sleep(5)

    # Assuming the report is generated in the same directory with the name 'report.pdf'
    with open("report.pdf", "rb") as pdf_file:
        report_data = pdf_file.read()

    report_data_bytearray = bytearray(report_data)
    return {'report_data': report_data_bytearray.decode('latin-1')}  # Convert bytes to string for JSON

if __name__ == '__main__':
    
    print("Starting server...")
    app.run(host='0.0.0.0',port=9999)
    print("Server stopped")


# pedido é feito para o servidor
    # http://localhost:9999/sensorsafe/generate_report
# com o seguinte formato de header:
    # Authorization: palavra_passe_ultra_secreta
    