package md.delivery.repository;

import md.delivery.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findAllByActiveIsTrue();
}
