package md.delivery.controller.web;

import md.delivery.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.stream.Collectors;

@Controller
@PreAuthorize("isFullyAuthenticated()")
public class HomeController {

    private final Logger log = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MarketRepository marketRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private CountryRepository countryRepository;

    @GetMapping("/user")
    public String getIndexPage(Model model) {
        log.info("Request to get index page...");
        model.addAttribute("users", userRepository.findAllUsers()
            .collect(Collectors.toList()));
        return "users";
    }

    @GetMapping("/product")
    public String getProductsPage(Model model) {
        log.info("Request to get the products page...");
        model.addAttribute("products", productRepository.findAllProducts()
                .collect(Collectors.toList()));
        model.addAttribute("groups", groupRepository.findAllGroups()
                .collect(Collectors.toList()));
        return "products";
    }

    @GetMapping("market")
    public String getMarketsPage(Model model) {
        log.info("Request to get markets page...");
        model.addAttribute("markets", marketRepository.findAllMarkets()
                .collect(Collectors.toList()));
        model.addAttribute("owners", userRepository.findAllByActiveIsTrue()
                .collect(Collectors.toList()));
        model.addAttribute("countries", countryRepository.findAllCountries()
                .collect(Collectors.toList()));
        return "markets";
    }

}
