package md.delivery.controller.rest;

import md.delivery.entity.Street;
import md.delivery.repository.StreetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/streets")
@PreAuthorize("isFullyAuthenticated()")
public class StreetController {

    private final Logger log = LoggerFactory.getLogger(StreetController.class);

    @Autowired
    private StreetRepository streetRepository;

    @GetMapping("/by-city/{cityId}")
    public List<Street> getStreetsByCity(@PathVariable("cityId") Long cityId) {
        log.info("Request to get streets by city id: {}", cityId);
        return streetRepository.findStreetsByCityId(cityId)
                .collect(Collectors.toList());
    }
}
