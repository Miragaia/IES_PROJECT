package com.SensorSafe.API.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.messaging.Message;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.SensorSafe.API.auth.AuthHandler;
import com.SensorSafe.API.model.Response;
import com.SensorSafe.API.model.report.Report;
import com.SensorSafe.API.model.report.ReportAggregation;
import com.SensorSafe.API.model.report.ReportSensorItem;
import com.SensorSafe.API.model.report.ReportType;
import com.SensorSafe.API.repository.ReportRepository;
import com.SensorSafe.API.services.AvailableDeviceService;
import com.SensorSafe.API.services.DeviceService;
import com.SensorSafe.API.services.ReportSensorService;
import com.SensorSafe.API.services.ReportService;
import com.SensorSafe.API.services.RoomService;




@RestController
@RequestMapping("/sensorsafe")
@Api(value = "Reports API", description = "Operations pertaining to reports", tags = "Reports" )
public class ReportsApiController {

    private final ReportService reportsService;
    private final AuthHandler authHandler;

    @Autowired
    public ReportsApiController(ReportService reportsService, AuthHandler authHandler) {
        this.reportsService = reportsService;
        this.authHandler = authHandler;
    }

    @GetMapping("/reports_sensors")
    @ApiOperation(value = "Get all reports", notes = "Get all reports", response = Report.class)
    public List<Report> getAllReportSensors() {
        return reportsService.getAllReports().stream()
                .filter(report -> report.getName().equals(authHandler.getUsername()))
                .collect(Collectors.toList());
    }

    @GetMapping("/reports_sensors/{ReportType}")
    @ApiOperation(value = "Get all reports by type", notes = "Get all reports by type", response = Report.class)
    public List<Report> getAllReportSensorsByType(@PathVariable("ReportType") ReportType reportType) {
        return reportsService.getReportsByType(reportType).stream()
                .filter(report -> report.getName().equals(authHandler.getUsername()))
                .collect(Collectors.toList());
    }

    @GetMapping("/reports_sensors/{id}")
    @ApiOperation(value = "Get report by id", notes = "Get report by id", response = Report.class)
    public Report getReportById(@PathVariable("id") ObjectId id) {
        return reportsService.getReportById(id);
    }

    @PostMapping("/generate-report")
    @ApiOperation(value = "Generate report", notes = "Generate a new report", response = Response.class)
    public Response generateReport() {
        try {
            System.out.println("333Generating report for user: " + authHandler.getUsername());
            // Add logic to generate the report
            // You can call a service method to handle the report generation
            reportsService.generateReport(authHandler.getUsername());

            //perceber se quando dou generate report tenho de associar a uma variavel para depois receber o report, ou eles vem por outro lado do rabbitmq

            return new Response("Report generated successfully");
        } catch (Exception e) {
            System.out.println("22Error generating report: " + e.getMessage());
            return new Response("Error generating report: " + e.getMessage());
        }
    }
}
