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

    @GetMapping("/")
    public List<Market> getAllMarkets() {
        log.info("Request to get all markets...");
        return marketRepository.findAllMarkets()
                .collect(Collectors.toList());
    }

    @GetMapping("/{marketId}")
    public ResponseEntity getProductyId(@RequestParam("marketId") Long marketId) {
        log.info("Request to get market by id: {}", marketId);
        return new ResponseEntity(
                marketRepository.findOne(marketId),
                HttpStatus.OK
        );
    }

    @PostMapping("/")
    public ResponseEntity createMarket(Market market) {
        log.info("Request to create new market: {}", market);
        return new ResponseEntity(marketRepository.save(market), HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity updateMarket(Market market) {
        log.info("Request to update market: {}", market);
        return new ResponseEntity(marketRepository.save(market), HttpStatus.OK);
    }

    @DeleteMapping("{marketId}")
    public ResponseEntity deleteMarket(@RequestParam("marketId") Long marketId) {
        log.info("Request to delete market with id: {}", marketId);
        marketRepository.delete(marketId);
        return new ResponseEntity("succes", HttpStatus.OK);
    }
}
