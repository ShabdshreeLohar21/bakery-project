package com.tka.bakery.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tka.bakery.entity.Cart;

public interface CartRepo
        extends JpaRepository<Cart,Integer>{

    List<Cart> findByUserId(int userId);
}