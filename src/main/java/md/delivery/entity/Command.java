package md.delivery.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Domain for {@link Command} entity.
 */
@Getter
@Setter
@ToString(exclude = "commandProducts, deliver")
@EqualsAndHashCode(exclude = "commandProducts")
@Entity
@Table(name = "command")
public class Command implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "deliver_id")
    private User deliver;

    @OneToOne
    @JoinColumn(name = "market_id")
    private Market market;

    @ManyToMany
    @JoinTable(
            name = "command_to_command_product",
            joinColumns = @JoinColumn(name = "command_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "command_product_id", referencedColumnName = "id")
    )
    private List<CommandProduct> commandProducts;

    @Transient
    private Double totalPrice;

    public Double getTotalPrice() {
        return commandProducts.stream()
                .mapToDouble(commandProduct -> commandProduct.getQuantity() * commandProduct.getProduct().getPrice())
                .sum();
    }
}
