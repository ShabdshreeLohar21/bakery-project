package com.tka.bakery.entity;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequest {

    private int userId;

    private String customerName;

    private String mobile;

    private String address;

    private String city;

    private String pincode;

    private double totalAmount;

    private String paymentMethod;

    private String status;

    private List<CartItemDto> items;
}