package md.delivery.controller.rest;

import md.delivery.entity.Command;
import md.delivery.repository.CommandProductRepository;
import md.delivery.repository.CommandRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SyncronizationController {

    private final Logger log = LoggerFactory.getLogger(SyncronizationController.class);

    @Autowired
    private CommandRepository commandRepository;

    @Autowired
    private CommandProductRepository commandProductRepository;

    @PostMapping("syncronize-commands")
    public String testController(@RequestBody List<Command> commands) {
        commands.forEach(command -> commandProductRepository.save(command.getCommandProducts()));
        commandRepository.save(commands);
        System.out.println("Success!");
        return "Success!";
    }

    @PostMapping("delete-commands")
    public String deleteCommandsById(@RequestBody List<Long> productIds) {
        productIds.stream().forEach(commandRepository::delete);
        return "Succes";
    }
}
