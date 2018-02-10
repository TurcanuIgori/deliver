package md.delivery.repository;

import md.delivery.entity.Command;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Stream;

/**
 *  Repository for the {@link Command} entity.
 */
//@Repository
public interface CommandRepository extends CrudRepository<Command, Long> {

    @Query("Select c From Command c")
    Stream<Command> findAllCommands();

    @EntityGraph(attributePaths = "commandProducts")
    Optional<Command> findById(Long commandId);
}
