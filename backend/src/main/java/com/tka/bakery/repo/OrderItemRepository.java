package com.tka.bakery.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tka.bakery.entity.OrderItem;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Integer> {

    List<OrderItem> findByOrderId(int orderId);
}