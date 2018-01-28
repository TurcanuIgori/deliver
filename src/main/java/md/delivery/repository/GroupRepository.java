package md.delivery.repository;

import md.delivery.entity.Group;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

/**
 * Repository for the {@link Group} entity.
 */
@Repository
public interface GroupRepository extends CrudRepository<Group, Long> {

    @Query("Select g From Group g")
    Stream<Group> findAllGroups();
}
