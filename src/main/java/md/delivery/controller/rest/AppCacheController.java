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
    @GetMapping(value = "/manifest-appcache", produces = "text/cache-manifest")
    public String getManifestFileContent() {
        StringBuilder manifestFileContent = new StringBuilder();
        manifestFileContent.append("CACHE MANIFEST\n");
        manifestFileContent.append("CACHE:\n" +
                // urls to css files
                "css/bootstrap.min.css\n" +
                "css/dashboard.css\n" +
                "css/grid.css\n" +

                "/commands/\n" +
                "/users/\n" +
                "/products/\n" +
                "/cities//\n" +
                "/countries/\n" +
                "/groups/\n" +
                "/markets/\n" +
                "/streets/\n" +
                // urls to javascript files
                "webjars/jquery/3.1.1/jquery.min.js\n" +
                "js/service/comm-service.js\n" +
                "js/service/market-service.js\n" +
                "js/service/user-service.js\n" +
                "js/service/product-service.js\n" +
                "js/handler/comm-handler.js\n" +
                "js/libraries/tether.min.js\n" +
                "js/libraries/bootstrap.min.js\n"
        );
        log.debug("Request to get manifest.appcache file: {}", manifestFileContent.toString());
        return manifestFileContent.toString();
    }
}
