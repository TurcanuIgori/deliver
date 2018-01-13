package md.delivery.repository;

import md.delivery.entity.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    @Query("Select p From Product p")
    Stream<Product> findAllProducts();

    Optional<Product> findProductById(Long productId);

}
