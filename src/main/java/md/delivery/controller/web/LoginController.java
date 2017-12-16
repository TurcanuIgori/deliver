package md.delivery.controller.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class LoginController {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/test-controller/{pass}")
    public String testController(@PathVariable("pass") String pass) {
        passwordEncoder.encode(pass);
        return "index";
    }

    @GetMapping("/login")
    public String loginPage(){
        return "login";
    }

}
