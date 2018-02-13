package md.delivery.controller.web;

import md.delivery.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;
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

    @Autowired
    private CommandRepository commandRepository;

    @GetMapping("/user")
    public String getIndexPage(Model model, Authentication auth, HttpSession session) {
        log.debug("Request to get index page...");
        session.setAttribute("currentUser", userRepository.findByUsernameIs(auth.getName()));
        model.addAttribute("users", userRepository.findAllUsers()
                .collect(Collectors.toList()));
        model.addAttribute("countries", countryRepository.findAllCountries()
                .collect(Collectors.toList()));
        return "users";
    }

    @GetMapping("/product")
    public String getProductsPage(Model model, Authentication auth, HttpSession session) {
        log.debug("Request to get the products page...");
        session.setAttribute("currentUser", userRepository.findByUsernameIs(auth.getName()));
        model.addAttribute("products", productRepository.findAllProducts()
                .collect(Collectors.toList()));
        model.addAttribute("groups", groupRepository.findAllGroups()
                .collect(Collectors.toList()));
        return "products";
    }

    @GetMapping("market")
    public String getMarketsPage(Model model, Authentication auth, HttpSession session) {
        log.debug("Request to get markets page...");
        session.setAttribute("currentUser", userRepository.findByUsernameIs(auth.getName()));
        model.addAttribute("markets", marketRepository.findAllMarkets()
                .collect(Collectors.toList()));
        model.addAttribute("owners", userRepository.findAllByActiveIsTrue()
                .collect(Collectors.toList()));
        model.addAttribute("countries", countryRepository.findAllCountries()
                .collect(Collectors.toList()));
        return "markets";
    }

    @GetMapping({"command", "/"})
    public String getCommandsPage(Model model, Authentication auth, HttpSession session) {
        log.debug("Request to get commands page...");
        session.setAttribute("currentUser", userRepository.findByUsernameIs(auth.getName()));
        model.addAttribute("commands", commandRepository.findAllCommands()
                .collect(Collectors.toList()));
        model.addAttribute("markets", marketRepository.findAllMarkets()
                .collect(Collectors.toList()));
        model.addAttribute("delivers", userRepository.findAllByActiveIsTrue()
                .collect(Collectors.toList()));
        return "commands";
    }
}
