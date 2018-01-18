package md.delivery.repository;

import md.delivery.entity.City;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface CityRepository extends CrudRepository<City, Long> {

    @Query("Select c From City c")
    Stream<City> findAllCities();

    Stream<City> findByCountryId(Long countryId);
}
