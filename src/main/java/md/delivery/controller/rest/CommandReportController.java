package md.delivery.controller.rest;

import com.itextpdf.text.DocumentException;
import md.delivery.reports.GeneratePdfReport;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;

@RestController
@RequestMapping("/reports")
@PreAuthorize("isFullyAuthenticated()")
public class CommandReportController {

    @GetMapping(value = "/generateReportForCommand/{commandId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> test(@PathVariable("commandId") Long commandId, HttpServletRequest request, HttpServletResponse response) throws DocumentException {
        ByteArrayInputStream bis = GeneratePdfReport.commandReport(commandId);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=citiesreport.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
