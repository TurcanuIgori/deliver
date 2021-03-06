package md.delivery.service;

import md.delivery.entity.User;
import md.delivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * Service for CRUD operations with the {@link User} entity.
 */
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User create(User userForm) {
        // @TODO need validation
        checkPasswordOfUser(userForm);
        return userRepository.save(userForm);
    }

    public User update(User user) {
        // @TODO need validation
        checkPasswordOfUser(user);
        return userRepository.save(user);
    }

    /**
     * Instead of delete, we will set active status to inactive.
     */
    public Boolean delete(Long userId) {
        User user = userRepository.findOne(userId);
        user.setActive(Boolean.FALSE);
        userRepository.save(user);
        return Boolean.TRUE;
    }

    /**
     * If user do not set the password we will get it from the database.
     */
    private void checkPasswordOfUser(User user) {
        if (user.getPassword().length() != 0) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else if (Objects.nonNull(user.getId())) {
            user.setPassword(userRepository.findByUsernameIs(user.getUsername()).get().getPassword());
        }
    }
}
