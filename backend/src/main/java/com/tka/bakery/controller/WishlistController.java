package com.tka.bakery.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tka.bakery.dto.WishlistResponse;
import com.tka.bakery.entity.Wishlist;
import com.tka.bakery.service.WishlistService;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin("*")
public class WishlistController {

    @Autowired
    WishlistService wishlistService;


    @PostMapping("/add")
    public Wishlist addToWishlist(
            @RequestBody Wishlist wishlist) {

        System.out.println("==========");
        System.out.println("USER ID = " + wishlist.getUserId());
        System.out.println("PRODUCT ID = " + wishlist.getProductId());
        System.out.println("==========");

        return wishlistService.addToWishlist(wishlist);
    }
    

    @GetMapping("/{userId}")
    public List<Wishlist> getWishlist(
            @PathVariable int userId) {

        return wishlistService.getWishlist(userId);
    }

    @GetMapping("/products/{userId}")
    public List<WishlistResponse> getWishlistProducts(
            @PathVariable int userId) {

        return wishlistService.getWishlistProducts(userId);
    }

    @DeleteMapping("/remove/{userId}/{productId}")
    public void removeWishlist(
            @PathVariable int userId,
            @PathVariable int productId) {

        System.out.println(
            "DELETE CALLED -> USER = "
            + userId +
            " PRODUCT = "
            + productId
        );

        wishlistService.removeFromWishlist(
                userId,
                productId);
    }
}