package md.delivery.repository;

import md.delivery.entity.CommandProduct;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for the {@link CommandProduct} entity.
 */
@Repository
public interface CommandProductRepository extends CrudRepository<CommandProduct, Long> {
}
