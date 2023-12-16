from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import random

def generate_maintenance_report(file_path):
    # Create a PDF document
    pdf_canvas = canvas.Canvas(file_path, pagesize=letter)
    
    # Set font and size
    pdf_canvas.setFont("Helvetica-Bold", 30)

    # Add content to the PDF
    pdf_canvas.drawString(100, 750, "Maintenance Report")

    pdf_canvas.setFont("Helvetica", 19)
    # Simulate errors/malfunctions based on random probabilities
    error_probabilities = {
        "Temperature Sensor": random.uniform(0, 1),
        "Humidity Sensor": random.uniform(0, 1),
        "Smoke Sensor": random.uniform(0, 1)
    }

    def draw_multiline_text(text, x, y, max_width, line_height, pdf_canvas):
        # Function to draw multiline text within specified width
        lines = text.split("\n")
        for line in lines:
            # Split the line into words
            words = line.split()
            current_line = ""
            for word in words:
                # Calculate the width of the current line with the new word
                current_line_width = pdf_canvas.stringWidth(current_line + " " + word, "Helvetica", 12)
                if current_line_width <= max_width:
                    # If the current line with the new word fits within the max_width, add the word
                    current_line += " " + word if current_line else word
                else:
                    # If adding the new word exceeds max_width, start a new line
                    pdf_canvas.drawString(x, y, current_line)
                    y -= line_height
                    current_line = word

            # Draw the remaining part of the line
            pdf_canvas.drawString(x, y, current_line)
            y -= line_height


    pdf_canvas.drawString(100, 720, "Sensor Malfunctions:")     #depois trocar o nome para o da room
    pdf_canvas.setFont("Helvetica-Bold", 12)
    y_position = 700
    # Check each sensor for malfunctions
    for sensor, probability in error_probabilities.items():
        if probability > 0.8:  # Adjust the threshold as needed
            pdf_canvas.drawString(160, y_position, f"- {sensor}: Malfunction detected")
            y_position -= 15
        else:
            pdf_canvas.drawString(160, y_position, f"- {sensor}: No malfunctions detected")
            y_position -= 15
        

    # Add more sections as needed
            
    pdf_canvas.setFont("Helvetica", 19)
    y_position -= 15
    if error_probabilities["Temperature Sensor"] > 0.8 or error_probabilities["Humidity Sensor"] > 0.8 or error_probabilities["Smoke Sensor"] > 0.8:
        pdf_canvas.drawString(100, y_position, "Report data:")
        y_position -= 30
        pdf_canvas.setFont("Helvetica", 12)

        if error_probabilities["Temperature Sensor"] > 0.8:
            pdf_canvas.setFont("Helvetica-Bold", 14)
            pdf_canvas.drawString(100, y_position, "Temperature:")
            pdf_canvas.setFont("Helvetica", 12)
            y_position -= 15
            report_textT = random.uniform(0, 1)
            if report_textT > 0.8:
                pdf_canvas.drawString(100, y_position, f"- Warning: Signal Interference")
                y_position -= 15
                description = (
                    "- Description: The wireless sensor is experiencing signal interference "
                    "from other wireless devices, which is causing inaccurate readings. "
                    "This could be due to a high number of devices operating in the same "
                    "frequency range or physical obstacles that are blocking the signal"
                )

                draw_multiline_text(description, 100, y_position, 400, 15,pdf_canvas)
                y_position -= 60
            elif report_textT > 0.5:
                pdf_canvas.drawString(100, y_position, f"- Warning: Battery Drain")
                y_position -= 15
                description = (
                    "- Description: The sensor's battery is draining faster than expected, "
                    "which is causing the sensor to shut down. This could be due to a sudden "
                    "increase in sensor activity or a malfunction in the sensor itself."
                )

                draw_multiline_text(description, 100, y_position, 400, 15,pdf_canvas)
                y_position -= 60
            else:
                pdf_canvas.drawString(100, y_position, f"- Warning: Sensor Overload")
                y_position -= 15
                description = (
                    "- Description: The humidity sensor is overloaded and is not able to accurately "
                    "measure the humidity levels. This could be due to a sudden increase in humidity "
                    "or a malfunction in the sensor itself."
                )
                draw_multiline_text(description, 100, y_position, 400, 15,pdf_canvas)
                y_position -= 60

        if error_probabilities["Humidity Sensor"] > 0.8:
            pdf_canvas.setFont("Helvetica-Bold", 14)
            pdf_canvas.drawString(100, y_position, "Humidity:")
            pdf_canvas.setFont("Helvetica", 12)
            y_position -= 15
            report_textH = random.uniform(0, 1)
            if report_textH > 0.8:
                pdf_canvas.drawString(100, y_position, f"- Warning: Signal Interference")
                y_position -= 15
                description = (
                    "- Description: The wireless sensor is experiencing signal interference from other "
                    "wireless devices, which is causing inaccurate readings. This could be due to a high "
                    "number of devices operating in the same frequency range or physical obstacles that "
                    "are blocking the signal."
                )
                draw_multiline_text(description, 100, y_position, 400, 15,pdf_canvas)
                y_position -= 60
            elif report_textH > 0.5:
                pdf_canvas.drawString(100, y_position, f"- Warning: Battery Drain")
                y_position -= 15
                description = (
                    f"- Description: The sensor's battery is draining faster than expected, which is causing "
                    f"the sensor to shut down. This could be due to a sudden increase in sensor activity or a "
                    f"malfunction in the sensor itself."
                )
                draw_multiline_text(description, 100, y_position, 400, 15,pdf_canvas)
                y_position -= 60
            else:
                pdf_canvas.drawString(100, y_position, f"- Warning: Measure Malfunction")
                y_position -= 15
                description = (
                    "Description: The temperature sensor is malfunctioning and is not able to accurately "
                    "measure the temperature. This could be due to a sudden change in temperature or a "
                    "malfunction in the sensor itself."
                )
                draw_multiline_text(description, 100, y_position, 400, 15,pdf_canvas)
                y_position -= 60
        if error_probabilities["Smoke Sensor"] > 0.8:
            pdf_canvas.setFont("Helvetica-Bold", 14)
            pdf_canvas.drawString(100, y_position, "Smoke:")
            pdf_canvas.setFont("Helvetica", 12)
            y_position -= 15
            report_textS = random.uniform(0, 1)
            if report_textS > 0.8:
                pdf_canvas.drawString(100, y_position, f"- Warning: Signal Interference")
                y_position -= 15
                description = (
                    "Description: The wireless sensor is experiencing signal interference from other "
                    "wireless devices, which is causing inaccurate readings. This could be due to a high "
                    "number of devices operating in the same frequency range or physical obstacles that "
                    "are blocking the signal"
                )
                draw_multiline_text(description, 100, y_position, 400, 15, pdf_canvas)
                y_position -= 60
            elif report_textS > 0.5:
                pdf_canvas.drawString(100, y_position, f"- Warning: Battery Drain")
                y_position -= 15
                description = (
                    "Description: The sensor's battery is draining faster than expected, which is causing "
                    "the sensor to shut down. This could be due to a sudden increase in sensor activity or "
                    "a malfunction in the sensor itself."
                )
                draw_multiline_text(description, 100, y_position, 400, 15, pdf_canvas)
                y_position -= 60
            else:
                pdf_canvas.drawString(100, y_position, f"- Warning: Smoke Detection Malfunction")
                y_position -= 15
                description = (
                    "Description: The smoke sensor is malfunctioning and is not able to accurately detect "
                    "the presence of smoke. This could be due to a sudden increase in smoke levels or a "
                    "malfunction in the sensor itself."
                )
                draw_multiline_text(description, 100, y_position, 400, 15, pdf_canvas)
                y_position -= 60

    # Save the PDF
    pdf_canvas.save()


if __name__ == "__main__":
    # Output file path
    output_file_path = "maintenance_report.pdf"

    # Generate PDF maintenance report
    generate_maintenance_report(output_file_path)

    print(f"Maintenance report generated successfully at: {output_file_path}")
