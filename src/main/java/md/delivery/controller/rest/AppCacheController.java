package md.delivery.controller.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppCacheController {

    @GetMapping(value = "/manifest.appcache", produces = "text/cache-manifest")
    public String offMainifest() {
        StringBuilder strManiFstBuilder = new StringBuilder();
        strManiFstBuilder.append("CACHE MANIFEST\n");
        strManiFstBuilder.append("CACHE:\n" +
                "resources/core/css/bootstrap.min.css\n" +
                "resources/core/css/hello.css\n" +
                "resources/core/js/bootstrap.min.js\n" +
                "resources/core/js/jquery-3.2.1.min.js\n" +
                "resources/core/js/hello.js\n" +
                "/hello/iturcanu"
        );
        return strManiFstBuilder.toString();
    }
}
