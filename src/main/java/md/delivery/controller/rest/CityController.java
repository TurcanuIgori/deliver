package md.delivery.controller.rest;

import md.delivery.entity.City;
import md.delivery.repository.CityRepository;
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
@RequestMapping("/cities")
@PreAuthorize("isFullyAuthenticated()")
public class CityController {

    private final Logger log = LoggerFactory.getLogger(CityController.class);

    @Autowired
    private CityRepository cityRepository;

    /**
     * GET - /cities/by-country/{countryId} - get cities by {@Country#id}
     */
    @GetMapping("/by-country/{countryId}")
    public List<City> getCitiesByCountry(@PathVariable("countryId") Long countryId) {
        log.debug("Request to get cities by countryId: {}", countryId);
        return cityRepository.findByCountryId(countryId)
                .collect(Collectors.toList());
    }

    /**
     * GET - /cities/ - get all cities
     */
    @GetMapping("/")
    public List<City> getAllCities() {
        return cityRepository.findAllCities()
                .collect(Collectors.toList());
    }
}
