package md.delivery.controller.rest;

import md.delivery.entity.User;
import md.delivery.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/users")
@PreAuthorize("isFullyAuthenticated()")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("list")
    public List<User> getAllUsers() {
        log.info("Request to find all users.");
        return userRepository.findAllByActiveIsTrue();
    }

    /**
     * Use this controller to get the user by id.
     *
     * @param userId -> {@link User#id}
     * @return -> {@link User}
     */
    @GetMapping("/{userId}")
    public User findById(@PathVariable("userId") Long userId) {
        log.info("Request to find user by id: {}", userId);
        return userRepository.findOne(userId);
    }

    /**
     * This controller is used to create new user.
     *
     * @param newUser -> {@link User}
     * @return -> created user.
     */
    @PostMapping("/")
    public String createUser(@RequestBody User id) {
        log.info("Request to create user: {}", id.getFirstName());
//        if (newUser.getPassword().equals(newUser.getConfirmPassword()) && newUser.getPassword() != null) {
//            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
//        }
        return "Succes";
    }

    /**
     * Use this controller to update the given user.
     *
     * @param updatedUser -> {@link User}
     * @return -> updated user
     */
    @PutMapping("/")
    public String updateUser(HttpServletRequest httpServletRequest
            , @RequestParam("picture") MultipartFile file
            , @RequestParam("firstName") String firstName
            , @RequestParam("lastName") String lastName
            , @RequestParam("username") String username
            , @RequestParam("gender") String gender
            , @RequestParam(value = "active", required = false) String active
            , @RequestParam(value = "password", required = false) String password
            , @RequestParam(value = "repeatPassword", required = false) String repeatPassword
            , @RequestParam("dob") String dob
            , @RequestParam(value = "email", required = false) String email
            , @RequestParam(value = "userID", required = false) String id
            , @RequestParam(value = "addressID", required = false) String addressID
            , @RequestParam(value = "roleID", required = false) String roleID
    ) {
        log.info("Request to update user: {}", firstName + lastName + username + gender + active + password + repeatPassword + dob + email + id + addressID + roleID);
        log.info("Request to update user: {}", file.getOriginalFilename());
//        log.info("File {}", picture.getOriginalFilename());
//        if (updatedUser.getPassword().equals(updatedUser.getConfirmPassword()) && updatedUser.getPassword() != null) {
//            updatedUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
//        }
        return "Succes";
    }

    /**
     * This controller is used to remove user by given {@link User#id}.
     *
     * @param userId -> {@link User#id}
     */
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        log.info("Request to delete user by id: {}", userId);
        userRepository.delete(userId);
    }
}
