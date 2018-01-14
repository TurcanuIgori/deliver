package md.delivery.repository;

import md.delivery.entity.Street;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface StreetRepository extends CrudRepository<Street, Long> {

    @Query("Select s From Street s")
    Stream<Street> findAllStreet();

    Stream<Street> findStreetsByCityId(Long cityId);
}
