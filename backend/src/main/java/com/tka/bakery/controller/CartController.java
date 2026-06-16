package com.tka.bakery.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tka.bakery.entity.Cart;
import com.tka.bakery.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(
            @RequestBody Cart cart) {

        return cartService.addToCart(cart);
    }

    @GetMapping("/{userId}")
    public List<Cart> getCart(
            @PathVariable int userId) {

        return cartService.getCart(userId);
    }
}