package com.tka.bakery.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int userId;

    private String customerName;

    private String mobile;

    private String address;

    private String city;

    private String pincode;

    private double totalAmount;

    private String paymentMethod;

    private String status;

    private LocalDateTime orderDate;
}