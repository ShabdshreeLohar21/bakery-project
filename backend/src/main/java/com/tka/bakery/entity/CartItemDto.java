package com.tka.bakery.entity;

import lombok.Data;

@Data
public class CartItemDto {

    private String name;

    private double price;

    private int quantity;

    private String image;
}