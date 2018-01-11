package md.delivery.controller.web;

import md.delivery.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@PreAuthorize("isFullyAuthenticated()")
public class HomeController {

    private final Logger log = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/index")
    public String getIndexPage(Model model) {
        log.info("Request to get index page");
        model.addAttribute("users", userRepository.findAll());
        return "index";
    }
}
