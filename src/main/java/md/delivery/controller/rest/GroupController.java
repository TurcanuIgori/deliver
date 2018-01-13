package md.delivery.controller.rest;

import md.delivery.entity.Group;
import md.delivery.repository.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/groups")
@PreAuthorize("isFullyAuthenticated()")
public class GroupController {

    private final Logger log = LoggerFactory.getLogger(GroupController.class);

    @Autowired
    private GroupRepository groupRepository;

    public List<Group> getAllGroups() {
        log.info("Request to get all group of products...");
        return groupRepository.findAllGroups()
                .collect(Collectors.toList());
    }
}
