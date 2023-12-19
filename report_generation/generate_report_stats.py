from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_pdf_report_stats(report_data):
    # Create a BytesIO buffer to store the PDF content

    report_data_temperature = [12.21,23.12,34.52,54.03,31.05,21.04,24.53,22.01,23.01,23.02]
    report_data_smoke = [22.21,23.12,34.52,54.03,31.05,21.04,24.53,22.01,23.01,23.02]
    report_data_humidity = [12.21,23.12,34.52,54.03,31.05,21.04,24.53,22.01,23.01,23.02]
    #fazer divisao do que vem do report_data
    #Temperatura
    #Smoke
    #Humidade

    id = 1      #alterar isto para adicionar sempre um id diferente para cada report
    file_path = f"report.pdf"
    pdf_canvas = canvas.Canvas(file_path, pagesize=letter)

    # Set font and size
    pdf_canvas.setFont("Helvetica-Bold", 30)

    # Add content to the PDF
    pdf_canvas.drawString(100, 750, "Room Stats Report")
    # Iterate over report data Temperature and add to PDF
    y_position = 720
    pdf_canvas.setFont("Helvetica", 19)
    pdf_canvas.drawString(100, y_position, "Report data:")
    y_position -= 30
    pdf_canvas.setFont("Helvetica", 12)
    x1_position = 100
    pdf_canvas.drawString(x1_position, y_position, "Temperature:")
    x1_position += 80
    for item in report_data_temperature:
        pdf_canvas.drawString(x1_position, y_position, f" {item}; ")
        x1_position += 40
    y_position -= 15

    y_position -= 30
    x2_position = 100
    pdf_canvas.drawString(x2_position, y_position, "Smoke:")
    x2_position += 50
    for item in report_data_smoke:
        pdf_canvas.drawString(x2_position, y_position, f" {item}; ")
        x2_position += 40
    y_position -= 15

    y_position -= 30
    x3_position = 100
    pdf_canvas.drawString(x3_position, y_position, "Humidity:")
    x3_position += 60
    for item in report_data_humidity:
        pdf_canvas.drawString(x3_position, y_position, f" {item}; ")
        x3_position += 40
    y_position -= 15

    y_position -= 30
    pdf_canvas.drawString(100, y_position, "------------------------------------------------------------------------------------------------------------------>")
    y_position -= 15
    pdf_canvas.drawString(520, y_position, "Time")

    # Save the PDF to the buffer
    pdf_canvas.save()


if __name__ == "__main__":
    # Example report data
    report_data = ["Item 1", "Item 2", "Item 3"]

    # Generate PDF report and get the bytes
    generate_pdf_report_stats(report_data)

    
    print("Report generated successfully.")

