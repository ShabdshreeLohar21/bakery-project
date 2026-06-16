package com.tka.bakery.dto;

import lombok.Data;

@Data
public class WishlistResponse {

    private int productId;
    private String name;
    private double price;
    private String category;
    private String imageUrl;
}