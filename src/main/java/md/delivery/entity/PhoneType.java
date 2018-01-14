package md.delivery.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

/**
 * Entity for {@link PhoneType}.
 */
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "phone_type")
public class PhoneType {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type_name")
    private String name;
}
