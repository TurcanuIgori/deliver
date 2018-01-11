package md.delivery.controller.rest;

import md.delivery.entity.Address;
import md.delivery.entity.Role;
import md.delivery.entity.User;
import md.delivery.repository.UserRepository;
import md.delivery.service.UserService;
import md.delivery.utils.UserUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@PreAuthorize("isFullyAuthenticated()")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserUtils userUtils;

    private static Long ID_OF_ROLE_USER = 2L;

    @GetMapping("list")
    public List<User> getAllUsers() {
        log.info("Request to find all users.");
        return userRepository.findAllByUsernameNotNull()
                .collect(Collectors.toList());
    }

    /**
     * Use this controller to get the user by id.
     *
     * @param userId -> {@link User#id}
     * @return -> {@link User}
     */
    @GetMapping("/{userId}")
    public ResponseEntity findById(@PathVariable("userId") Long userId) {
        log.info("Request to find user by id: {}", userId);
        return new ResponseEntity(userRepository.findOne(userId), HttpStatus.OK);
    }

    /**
     * This controller is used to remove user by given {@link User#id}.
     *
     * @param userId -> {@link User#id}
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") Long userId) {
        log.info("Request to delete user by id: {}", userId);
        userService.delete(userId);
        return new ResponseEntity("Succes", HttpStatus.OK);
    }

    /**
     * This controller is used to create new user.
     *
     * @return -> created user.
     */
    @PostMapping("/")
    public ResponseEntity createUser(HttpServletRequest httpServletRequest
            , @RequestParam("picture") MultipartFile picture
            , @RequestParam("firstName") String firstName
            , @RequestParam("lastName") String lastName
            , @RequestParam("username") String username
            , @RequestParam("gender") String gender
            , @RequestParam(value = "active", defaultValue = "false") String active
            , @RequestParam(value = "password", required = false) String password
            , @RequestParam(value = "repeatPassword", required = false) String repeatPassword
            , @RequestParam("dob") String dob
            , @RequestParam(value = "email", required = false) String email
            , @RequestParam(value = "addressID", required = false) String addressID
            , @RequestParam(value = "roleID", required = false) String roleID) throws IOException {
        active = (active.equals("on") ? "true" : "false");

        User newUser = User.builder()
                .pictureInBytes(picture.getBytes())
                .firstName(firstName)
                .lastName(lastName)
                .username(username)
                .gender(gender)
                .active(Boolean.valueOf(active))
                .password(password)
                .repeatPassword(repeatPassword)
                .dob(LocalDate.parse(dob))
                .email(email)
                .build();
        if (addressID.length() != 0) {
            Address address = new Address();
            address.setId(new Long(addressID));
            newUser.setAddress(address);
        }
        if (Objects.nonNull(roleID) && roleID.length() != 0) {
            Role role = new Role();
            role.setId(new Long(roleID));
            newUser.setRole(role);
        } else {
            Role role = new Role();
            role.setId(new Long(ID_OF_ROLE_USER));
            newUser.setRole(role);
        }
        userUtils.saveImage(newUser, picture.getOriginalFilename());
        log.info("Request to create user: {}", newUser);
        return new ResponseEntity<>(userService.create(newUser), HttpStatus.OK);
    }

    /**
     * Use this controller to update the given user.
     *
     * @return -> updated user
     */
    @PutMapping("/")
    public ResponseEntity updateUser(HttpServletRequest httpServletRequest
            , @RequestParam("picture") MultipartFile picture
            , @RequestParam("firstName") String firstName
            , @RequestParam("lastName") String lastName
            , @RequestParam("username") String username
            , @RequestParam("gender") String gender
            , @RequestParam(value = "active", defaultValue = "false") String active
            , @RequestParam(value = "password", required = false) String password
            , @RequestParam(value = "repeatPassword", required = false) String repeatPassword
            , @RequestParam("dob") String dob
            , @RequestParam(value = "email", required = false) String email
            , @RequestParam(value = "userID", required = false) String id
            , @RequestParam(value = "addressID", required = false) String addressID
            , @RequestParam(value = "role", required = false) String roleID) throws IOException {

        active = (active.equals("on") ? "true" : "false");

        User user = User.builder()
                .pictureInBytes(picture.getBytes())
                .firstName(firstName)
                .lastName(lastName)
                .username(username)
                .gender(gender)
                .active(Boolean.valueOf(active))
                .password(password)
                .repeatPassword(repeatPassword)
                .dob(LocalDate.parse(dob))
                .email(email)
                .id(new Long(id))
                .build();
        if (addressID.length() != 0) {
            Address address = new Address();
            address.setId(new Long(addressID));
            user.setAddress(address);
        }
        if (roleID.length() != 0) {
            Role role = new Role();
            role.setId(new Long(roleID));
            user.setRole(role);
        } else {
            Role role = new Role();
            role.setId(new Long(ID_OF_ROLE_USER));
            user.setRole(role);
        }

        userUtils.saveImage(user, picture.getOriginalFilename());
        log.info("Request to update user: {}", user);
        return new ResponseEntity<>(userService.update(user), HttpStatus.OK);
    }

    @GetMapping("/image/{username}")
    public void getImageByUsername(@PathVariable("username") String username, HttpServletResponse response, HttpServletRequest request) {
        try {
            response.setContentType("image/jpg");
            InputStream is = new FileInputStream(new File(UserUtils.getPathToUserImages() + userRepository.findByUsernameIs(username).get().getPathToPicture()));
            response.getOutputStream().write(IOUtils.toByteArray(is));
            response.getOutputStream().close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
