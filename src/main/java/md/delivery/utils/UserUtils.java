package md.delivery.utils;

import md.delivery.entity.User;
import md.delivery.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.Objects;

/**
 * Utils methods for the {@link User} entity.
 */
@Component
public class UserUtils {

    private final Logger log = LoggerFactory.getLogger(UserUtils.class);

    /**
     * This folder contains all user's images.
     */
    private static final String PATH_TO_USER_IMAGES = "D:/app/delivery/users/img/";

    /**
     * If user didn't select the image, this image will be setted by default.
     */
    private static final String PATH_TO_DEFAULT_USER_IMAGE = "default.png";

    @Autowired
    private UserRepository userRepository;

    public void saveImage(User user, String completeFileName) {
        // if user is new and image is null
            // set default image
        // else get image from database
        if (user.getPictureInBytes().length != 0) {
            // save image
           try {
               File img = new File(PATH_TO_USER_IMAGES + user.getUsername() + getNameOfImage(completeFileName));
               if(img.exists()){
                   img.delete();
               }
               img.createNewFile();
               OutputStream out = new BufferedOutputStream(new FileOutputStream(img));
               out.write(user.getPictureInBytes());
               out.close();
               user.setPathToPicture(user.getUsername() + getNameOfImage(completeFileName));
           } catch (Exception e) {
               log.info("Error to save the user image. Exception is: {}", e);
               log.info("Set default image.");
               user.setPathToPicture(PATH_TO_DEFAULT_USER_IMAGE);
           }
        } else if (Objects.nonNull(user.getId())) {
            user.setPathToPicture(userRepository.findByUsernameIs(user.getUsername()).get().getPathToPicture());
        } else {
            user.setPathToPicture(PATH_TO_DEFAULT_USER_IMAGE);
        }
    }

    private String getNameOfImage(String completeFileName) {
        return completeFileName.substring(completeFileName.lastIndexOf("."));
    }

    public static String getPathToUserImages() {
        return PATH_TO_USER_IMAGES;
    }
}
