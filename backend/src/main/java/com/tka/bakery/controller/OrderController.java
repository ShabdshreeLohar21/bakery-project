package com.tka.bakery.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tka.bakery.entity.CartItemDto;
import com.tka.bakery.entity.Order;
import com.tka.bakery.entity.OrderItem;
import com.tka.bakery.entity.OrderRequest;
import com.tka.bakery.repo.OrderItemRepository;
import com.tka.bakery.repo.OrderRepo;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = {
	    "http://localhost:5173",
	    "http://localhost:5174"
	})
public class OrderController {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    @PostMapping("/place")
    public Order placeOrder(
            @RequestBody OrderRequest request) {

        Order order = new Order();

        order.setUserId(request.getUserId());
        order.setCustomerName(request.getCustomerName());
        order.setMobile(request.getMobile());
        order.setAddress(request.getAddress());
        order.setCity(request.getCity());
        order.setPincode(request.getPincode());

        order.setTotalAmount(request.getTotalAmount());

        order.setPaymentMethod(
                request.getPaymentMethod());

        order.setStatus(
                request.getStatus());

        order.setOrderDate(
                LocalDateTime.now());

        Order savedOrder =
                orderRepo.save(order);

        if(request.getItems() != null) {

            for(CartItemDto item :
                    request.getItems()) {

                OrderItem orderItem =
                        new OrderItem();

                orderItem.setOrderId(
                        savedOrder.getId());

                orderItem.setProductName(
                        item.getName());

                orderItem.setProductPrice(
                        item.getPrice());

                orderItem.setQuantity(
                        item.getQuantity());

                orderItem.setImageUrl(
                        item.getImage());

                orderItemRepo.save(
                        orderItem);
            }
        }

        return savedOrder;
    }

    @PutMapping("/status/{id}")
    public Order updateStatus(
            @PathVariable int id,
            @RequestParam String status) {

        Order order =
                orderRepo.findById(id)
                        .orElse(null);

        if(order != null) {

            order.setStatus(status);

            return orderRepo.save(order);
        }

        return null;
    }

    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @GetMapping("/{id}")
    public Order getOrderById(
            @PathVariable int id) {

        return orderRepo.findById(id)
                .orElse(null);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(
            @PathVariable int userId) {

        return orderRepo.findByUserId(userId);
    }
    
    @GetMapping("/items/{orderId}")
    public List<OrderItem> getOrderItems(
            @PathVariable int orderId) {

        return orderItemRepo.findByOrderId(orderId);
    }
}