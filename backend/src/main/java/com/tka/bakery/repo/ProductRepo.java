package com.tka.bakery.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tka.bakery.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {

    List<Product> findByCategory(String category);
    
    

}