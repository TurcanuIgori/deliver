package md.delivery.controller.rest;

import md.delivery.entity.Product;
import md.delivery.repository.ProductRepository;
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
@RequestMapping("/products")
@PreAuthorize("isFullyAuthenticated()")
public class ProductController {

    private final Logger log = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/")
    public List<Product> getAllProducts() {
        log.info("Request to get all products...");
        return productRepository.findAllProducts()
                .collect(Collectors.toList());
    }

    @GetMapping("/{productId}")
    public ResponseEntity getProductyId(@RequestParam("productId") Long productId) {
        log.info("Request to get product by id: {}", productId);
        return new ResponseEntity(
                productRepository.findProductById(productId).get(),
                HttpStatus.OK
        );
    }

    @PostMapping("/change-price")
    public ResponseEntity changePriceOfProduct(@RequestParam("productId") Long productId, @RequestParam("newPrice") Double newPrice){
        log.info("Request to change price of the product with id: {}, new price is: {}", productId, newPrice);
        Product product = productRepository.findProductById(productId).get();
        product.setPrice(newPrice);
        productRepository.save(product);
        return new ResponseEntity("Succes", HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity createProduct(Product product) {
        log.info("Request to create new product: {}", product);
        return new ResponseEntity(productRepository.save(product), HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity updateProduct(Product product) {
        log.info("Request to update product: {}", product);
        return new ResponseEntity(productRepository.save(product), HttpStatus.OK);
    }

    @DeleteMapping("{productId}")
    public ResponseEntity deleteProduct(@RequestParam("productId") Long productId) {
        log.info("Request to delete product with id: {}", productId);
        productRepository.delete(productId);
        return new ResponseEntity("succes", HttpStatus.OK);
    }
}
