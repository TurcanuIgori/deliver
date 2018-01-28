package md.delivery.repository;

import md.delivery.entity.Country;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

/**
 * Repository for the {@link Country} entity.
 */
@Repository
public interface CountryRepository extends CrudRepository<Country, Long> {

    @Query("Select c From Country c")
    Stream<Country> findAllCountries();
}
