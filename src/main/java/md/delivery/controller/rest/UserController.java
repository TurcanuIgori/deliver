package md.delivery.controller.rest;

import md.delivery.entity.User;
import md.delivery.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
public class UserController {
    private final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private  UserRepository userRepository;

    @GetMapping("list")
    public List<User> getAllUsers() {
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
        return userRepository.findOne(userId);
    }

    /**
     * This controller is used to create new user.
     *
     * @param newUser -> {@link User}
     * @return -> created user.
     */
    @PostMapping("/")
    public User createUser(@ModelAttribute("user") User newUser) {
        return userRepository.save(newUser);
    }

    /**
     * Use this controller to update the given user.
     *
     * @param updatedUser -> {@link User}
     * @return -> updated user
     */
    @PutMapping("/")
    public User updateUser(@ModelAttribute("user") User updatedUser) {
        return userRepository.save(updatedUser);
    }

    /**
     * This controller is used to remove user by given {@link User#id}.
     *
     * @param userId -> {@link User#id}
     */
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        userRepository.delete(userId);
    }
}
