package md.delivery.controller.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    private final Logger log = LoggerFactory.getLogger(LoginController.class);

    // $2a$11$0e/5mLK/ydL9HHtbONu/5uICpzlBBqc4b6ycIlQaZRpLNsxjHRG/K
    @GetMapping("/login")
    public String loginPage(){
        log.debug("Request to get the login page");
        return "login";
    }

}
