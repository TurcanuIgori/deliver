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

    /**
     * GET - /products/ - return all products
     */
    @GetMapping("/")
    public List<Product> getAllProducts() {
        log.info("Request to get all products...");
        return productRepository.findAllProducts()
                .collect(Collectors.toList());
    }

    /**
     * GET - /products/productId - return product by given id
     */
    @GetMapping("/{productId}")
    public ResponseEntity getProductyId(@PathVariable("productId") Long productId) {
        log.info("Request to get product by id: {}", productId);
        return new ResponseEntity(
                productRepository.findProductById(productId).get(),
                HttpStatus.OK
        );
    }

    /**
     * POST - /products/ - create product with data from request body
     */
    @PostMapping("/")
    public ResponseEntity createProduct(@RequestBody Product product) {
        log.info("Request to create new product: {}", product);
        return new ResponseEntity(productRepository.save(product), HttpStatus.OK);
    }

    /**
     * PUT - /products/ - update product with data from request body
     */
    @PutMapping("/")
    public ResponseEntity updateProduct(@RequestBody Product product) {
        log.info("Request to update product: {}", product);
        return new ResponseEntity(productRepository.save(product), HttpStatus.OK);
    }

    /**
     * DELETE - /products/productId - delete product by given id
     */
    @DeleteMapping("{productId}")
    public ResponseEntity deleteProduct(@PathVariable("productId") Long productId) {
        log.info("Request to delete product with id: {}", productId);
        productRepository.delete(productId);
        return new ResponseEntity("succes", HttpStatus.OK);
    }
}
