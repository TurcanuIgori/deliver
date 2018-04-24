package md.delivery.controller.rest;

import md.delivery.entity.Command;
import md.delivery.repository.CommandProductRepository;
import md.delivery.repository.CommandRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for CRUD operations with the {@link Command} entity.
 */
@RestController
@RequestMapping("/commands")
@PreAuthorize("isFullyAuthenticated()")
public class CommandController {

    private final Logger log = LoggerFactory.getLogger(CommandController.class);

    @Autowired
    private CommandRepository commandRepository;

    @Autowired
    private CommandProductRepository commandProductRepository;

    /**
     * GET - /commands/ - get all commands
     */
    @GetMapping("/")
    public List<Command> getAllCommands() {
        log.debug("Request to get all commands...");
        return commandRepository.findAllCommands()
                .collect(Collectors.toList());
    }

    /**
     * GET - /commands/{commandId} get command by id
     */
    @GetMapping("/{commandId}")
    public ResponseEntity getCommandById(@PathVariable("commandId") Long commandId) {
        log.debug("Request to get command by id: {}", commandId);
        return new ResponseEntity<>(
                commandRepository.findById(commandId).get(),
                HttpStatus.OK);
    }

    /**
     * DELETE - /commands/{commandId} - delete command by id
     */
    @DeleteMapping("/{commandId}")
    public ResponseEntity deleteCommandById(@PathVariable("commandId") Long commandId) {
        log.debug("Request to delete command by id: {}", commandId);
        commandRepository.delete(commandId);
        return new ResponseEntity<>("succes", HttpStatus.OK);
    }

    /**
     * POST - /commands/ - create new command
     */
    @PostMapping("/")
    public ResponseEntity createCommand(@RequestBody Command command) {
        log.debug("Request to create command: {}", command);
        command.setCommandProducts(command.getCommandProducts().stream()
                .map(commandProductRepository::save)
                .collect(Collectors.toList())
        );
        commandRepository.save(command);
        return new ResponseEntity("succes", HttpStatus.OK);
    }

    /**
     * PUT - /commands/ - update command
     */
    @PutMapping("/")
    public ResponseEntity updateCommand(@RequestBody Command command) {
        log.debug("Request to update command: {}", command);
        command.setCommandProducts(command.getCommandProducts().stream()
                .map(commandProductRepository::save)
                .collect(Collectors.toList())
        );
        commandRepository.save(command);
        return new ResponseEntity("succes", HttpStatus.OK);
    }
}
