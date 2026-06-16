package com.tka.bakery.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tka.bakery.entity.Cart;
import com.tka.bakery.repo.CartRepo;

@Service
public class CartService {

    @Autowired
    CartRepo cartRepo;

    public Cart addToCart(Cart cart) {
        return cartRepo.save(cart);
    }

    public List<Cart> getCart(int userId) {
        return cartRepo.findByUserId(userId);
    }
}