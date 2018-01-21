package md.delivery.repository;

import md.delivery.entity.Command;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.stream.Stream;

public interface CommandRepository extends CrudRepository<Command, Long> {

    @Query("Select c From Command c")
    Stream<Command> findAllCommands();

    Optional<Command> findById(Long commandId);
}
