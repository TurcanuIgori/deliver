package md.delivery.repository;

import md.delivery.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    @Query("Select u From User u")
    Stream<User> findAllUsers();

    Stream<User> findAllByActiveIsTrue();

    Optional<User> findByUsernameIs(String username);
}
