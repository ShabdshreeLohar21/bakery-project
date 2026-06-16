package com.tka.bakery.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tka.bakery.entity.Product;
import com.tka.bakery.repo.ProductRepo;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = {
	    "http://localhost:5173",
	    "http://localhost:5174",
	    "https://bakery-project-rho.vercel.app"
	})
public class ProductController {

    @Autowired
    ProductRepo productRepo;

    // Add Product
    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product) {
        return productRepo.save(product);
    }

    // Get All Products
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    // Get Only Pastries
    @GetMapping("/pastries")
    public List<Product> getPastries() {
        return productRepo.findByCategory("Pastries");
    }

    // Get Product By Id
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id) {
        return productRepo.findById(id).orElse(null);
    }

    // Delete Product
    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable int id) {
        productRepo.deleteById(id);
        return "Product Deleted Successfully";
    }

    // Update Product
    @PutMapping("/update/{id}")
    public Product updateProduct(@PathVariable int id,
                                 @RequestBody Product updatedProduct) {

        Product product = productRepo.findById(id).orElse(null);

        if(product != null) {
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setPrice(updatedProduct.getPrice());
            product.setStock(updatedProduct.getStock());
            product.setCategory(updatedProduct.getCategory());

            return productRepo.save(product);
        }

        return null;
    }
    
    
    @GetMapping("/donuts")
    public List<Product> getDonuts() {
        return productRepo.findByCategory("Donuts");
    }
    
    @GetMapping("/cupcakes")
    public List<Product> getCupcakes() {
        return productRepo.findByCategory("Cupcakes");
    }
    
    @GetMapping("/premiumdesserts")
    public List<Product> getPremiumDesserts() {
        return productRepo.findByCategory("PremiumDesserts");
    }
    
    
}