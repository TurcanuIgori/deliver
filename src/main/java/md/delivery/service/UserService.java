package md.delivery.service;

import md.delivery.entity.User;
import md.delivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User save(User userForm) {
        userForm.setPassword(passwordEncoder.encode(userForm.getPassword()));
        return userRepository.save(userForm);
    }
}
