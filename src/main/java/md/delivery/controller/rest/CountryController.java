package md.delivery.controller.rest;

import md.delivery.entity.Country;
import md.delivery.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/countries")
@PreAuthorize("isFullyAuthenticated()")
public class CountryController {

    @Autowired
    private CountryRepository countryRepository;

    @GetMapping("/")
    public List<Country> getAllCountries() {
        return countryRepository.findAllCountries()
                .collect(Collectors.toList());
    }
}
