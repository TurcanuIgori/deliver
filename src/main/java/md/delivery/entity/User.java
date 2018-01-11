package md.delivery.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * Entity for {@link User}.
 */
@Builder
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "users")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "username")
    private String username;


    @Column(name = "email")
    private String email;

    @Column(name = "hash_pass")
    private String password;

    @Transient
    private String repeatPassword;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;


    @Column(name = "picture")
    private String pathToPicture;

    @Transient
    @JsonIgnore
    private byte[] pictureInBytes;

    @ManyToMany
    @JoinTable(
            name = "user_to_phone",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "phone_id", referencedColumnName = "id")
    )
    private List<Phone> phones;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "date_of_birth")
    private LocalDate dob;

    @Transient
    private String dobAsString;

    @Column
    private String gender;

    @Column
    private Boolean active;

    public User() {
    }

    public User(Long id, String firstName, String lastName, String username, String email, String password, String repeatPassword, Role role, Address address, String pathToPicture, byte[] pictureInBytes, List<Phone> phones, LocalDate dob, String dobAsString, String gender, Boolean active) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.repeatPassword = repeatPassword;
        this.role = role;
        this.address = address;
        this.pathToPicture = pathToPicture;
        this.pictureInBytes = pictureInBytes;
        this.phones = phones;
        this.dob = dob;
        this.dobAsString = dobAsString;
        this.gender = gender;
        this.active = active;
    }

    public String getDobAsString() {
        return dob.toString();
    }
}
