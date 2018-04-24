package md.delivery.controller.rest;

import md.delivery.entity.Market;
import md.delivery.repository.MarketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/markets")
@PreAuthorize("isFullyAuthenticated()")
public class MarketController {

    private final Logger log = LoggerFactory.getLogger(MarketController.class);

    @Autowired
    private MarketRepository marketRepository;

    /**
     * GET - /markets/ - return all markets
     */
    @GetMapping("/")
    public List<Market> getAllMarkets() {
        log.debug("Request to get all markets...");
        return marketRepository.findAllMarkets()
                .collect(Collectors.toList());
    }

    /**
     * GET - /markets/marketId - return market by given id
     */
    @GetMapping("/{marketId}")
    public ResponseEntity getProductyId(@PathVariable("marketId") Long marketId) {
        log.debug("Request to get market by id: {}", marketId);
        return new ResponseEntity<>(
                marketRepository.findOne(marketId),
                HttpStatus.OK
        );
    }

    /**
     * POST - /markets/ - create new market with data from request body
     */
    @PostMapping("/")
    public ResponseEntity createMarket(@RequestBody Market market) {
        log.debug("Request to create new market: {}", market);
        marketRepository.save(market);
        return new ResponseEntity<>("succes", HttpStatus.OK);
    }

    /**
     * PUT - /markets/ - update market with data from request body
     */
    @PutMapping("/")
    public ResponseEntity updateMarket(@RequestBody Market market) {
        log.debug("Request to update market: {}", market);
        marketRepository.save(market);
        return new ResponseEntity<>("succes", HttpStatus.OK);
    }

    /**
     * DELETE - /markets/ - delete market by given id
     */
    @DeleteMapping("{marketId}")
    public ResponseEntity deleteMarket(@PathVariable("marketId") Long marketId) {
        log.debug("Request to delete market with id: {}", marketId);
        marketRepository.delete(marketId);
        return new ResponseEntity<>("succes", HttpStatus.OK);
    }
}
