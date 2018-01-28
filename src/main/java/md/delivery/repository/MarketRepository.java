package md.delivery.repository;

import md.delivery.entity.Market;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

/**
 * Repository for the {@link Market} entity.
 */
@Repository
public interface MarketRepository extends CrudRepository<Market, Long> {

    @Query("Select m From Market m")
    Stream<Market> findAllMarkets();

    Stream<Market> findMarketsByOwnerId(Long ownerId);
}
