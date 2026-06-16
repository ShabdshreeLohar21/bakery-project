package com.tka.bakery.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tka.bakery.entity.Order;

public interface OrderRepo extends JpaRepository<Order, Integer> {

    List<Order> findByUserId(int userId);

}