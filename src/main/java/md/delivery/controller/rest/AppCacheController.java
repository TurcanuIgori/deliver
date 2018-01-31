package md.delivery.controller.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppCacheController {

    private final Logger log = LoggerFactory.getLogger(AppCacheController.class);

    /**
     * This controller return a file of the "text/cache-manifest" type witch contains urls of the cache files.
     */
    @GetMapping(value = "/users-manifest-appcache", produces = "text/cache-manifest")
    public String offMainifest() {
        StringBuilder manifestFileContent = new StringBuilder();
        manifestFileContent.append("CACHE MANIFEST\n");
        manifestFileContent.append("CACHE:\n" +
                // urls to css files
                "css/bootstrap.min.css\n" +
                "css/dashboard.css\n" +
                "css/grid.css\n" +
                // urls to javascript files
                "webjars/jquery/2.2.4/jquery.min.js\n" +
                "js/service/address-service.js\n" +
                "js/handler/address-handler.js\n" +
                "js/service/user-service.js\n" +
                "js/handler/user-handler.js\n" +
                "js/libraries/tether.min.js\n" +
                "js/libraries/bootstrap.min.js\n" +
                "/users-manifest-appcache\n"
        );
        log.debug("Request to get manifest.appcache file: {}", manifestFileContent.toString());
        return manifestFileContent.toString();
    }
}
