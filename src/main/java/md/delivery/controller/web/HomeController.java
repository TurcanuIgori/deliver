package md.delivery.controller.web;

import md.delivery.repository.GroupRepository;
import md.delivery.repository.MarketRepository;
import md.delivery.repository.ProductRepository;
import md.delivery.repository.UserRepository;
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

    @GetMapping("/index")
    public String getIndexPage(Model model) {
        log.info("Request to get index page...");
        model.addAttribute("users", userRepository.findAllUsers()
            .collect(Collectors.toList()));
        return "index";
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
        return "markets";
    }

}
