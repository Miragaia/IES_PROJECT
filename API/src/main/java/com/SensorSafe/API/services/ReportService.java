package com.SensorSafe.API.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.SensorSafe.API.model.report.ReportType;
import com.SensorSafe.API.model.device.Device;
import com.SensorSafe.API.model.report.Report;
import com.SensorSafe.API.model.report.ReportSensorItem;
import com.SensorSafe.API.repository.ReportRepository;

import com.SensorSafe.API.model.report.Report;
import com.SensorSafe.API.midleware.rabbitmq.RabbitMQHandler;
import com.SensorSafe.API.midleware.rabbitmq.RabbitMQNotificationReact;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

@Service
public class ReportService {
    
    private final ReportRepository reportRepository;
    private final RabbitMQHandler rabbitMQHandler;

    @Autowired
    public ReportService(ReportRepository reportRepository, RabbitMQHandler rabbitMQHandler) {
        this.reportRepository = reportRepository;
        this.rabbitMQHandler = rabbitMQHandler;
    }

    public Report saveReport(Report report){
        return reportRepository.save(report);
    }

    public List<Report> getAllReports(){
        return reportRepository.findAll();
    }

    public List<Report> getReportsByType(ReportType type){
        return reportRepository.findByType(type);
    }

    public Report getReportById(ObjectId id){
        return reportRepository.findByReportId(id);
    }

    public void generateReport(String username) throws IOException {
        // Trigger the Python script
        System.out.println("Generating report for user: " + username);
        Process pythonProcess = triggerPythonScript(username);

        // Note: The actual report generation logic may happen asynchronously in the Python script
        System.out.println("Waiting for report to be generated...");
        // For demonstration purposes, let's assume the Python script generates a report file
        // You might need to wait for the Python script to finish before proceeding

        // Example: Wait for the Python script to finish (you might need to implement a more robust mechanism)
        waitForPythonScriptToFinish(pythonProcess);

        System.out.println("Report generated successfully");

        // // Fetch the generated report from Python (you need to implement this)
        // byte[] reportData = fetchReportFromPython(pythonProcess);

        // // Save the report to the database
        // Report report = new Report();
        // report.setName(username);   //ns se preciso
        // report.setType(ReportType.DEVICES); // Set the appropriate report type
        // reportRepository.save(report);

        // // Publish the report to RabbitMQ
        // rabbitMQHandler.publish("SensorSafe", new String(reportData));

    }

    // Method to trigger the Python script
    private Process triggerPythonScript(String username) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("python", "../../../../../data_generation/generate_report_maintenance.py", username);
            return processBuilder.start();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
            // Handle the exception as needed
        }
    }

    // Wait for the Python script to finish
    private void waitForPythonScriptToFinish(Process process) {
        try {
            // Wait for the Python script to finish
            int exitCode = process.waitFor();

            if (exitCode != 0) {
                // Handle the case where the Python script didn't finish successfully
                throw new RuntimeException("Python script did not finish successfully. Exit code: " + exitCode);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            // Handle the interruption as needed
        }
    }


    // Example: Fetch the generated report from Python (you need to implement this)
    private byte[] fetchReportFromPython(Process process) {
        try {
            // Get the input stream of the Python process (assuming the report is generated as standard output)
            InputStream inputStream = process.getInputStream();

            // Read the output of the Python script
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
            StringBuilder reportContent = new StringBuilder();

            String line;
            while ((line = reader.readLine()) != null) {
                reportContent.append(line).append("\n");
            }

            // Close the reader
            reader.close();

            // Convert the report content to bytes (adjust this based on your actual report format)
            return reportContent.toString().getBytes(StandardCharsets.UTF_8);

        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception as needed
            return null;
        }
    }
}
