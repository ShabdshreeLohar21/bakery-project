package com.tka.bakery.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tka.bakery.dto.WishlistResponse;
import com.tka.bakery.entity.Product;
import com.tka.bakery.entity.Wishlist;
import com.tka.bakery.repo.ProductRepo;
import com.tka.bakery.repo.WishlistRepo;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepo wishlistRepo;

    @Autowired
    private ProductRepo productRepo;

    public Wishlist addToWishlist(
            Wishlist wishlist) {

        return wishlistRepo.save(wishlist);
    }

    public List<Wishlist> getWishlist(
            int userId) {

        return wishlistRepo.findByUserId(userId);
    }

    public List<WishlistResponse> getWishlistProducts(
            int userId) {

        List<Wishlist> wishlist =
                wishlistRepo.findByUserId(userId);

        List<WishlistResponse> response =
                new ArrayList<>();

        for (Wishlist item : wishlist) {

            Product product =
                    productRepo.findById(
                            item.getProductId())
                            .orElse(null);

            if (product != null) {

                WishlistResponse dto =
                        new WishlistResponse();

                dto.setProductId(
                        product.getId());

                dto.setName(
                        product.getName());

                dto.setPrice(
                        product.getPrice());

                dto.setCategory(
                        product.getCategory());

                dto.setImageUrl(
                        product.getImageUrl());

                response.add(dto);
            }
        }

        return response;
    }

    public void removeFromWishlist(
            int userId,
            int productId) {

        wishlistRepo.deleteByUserIdAndProductId(
                userId,
                productId);
    }
}