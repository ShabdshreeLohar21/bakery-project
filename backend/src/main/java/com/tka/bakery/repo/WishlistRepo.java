package com.tka.bakery.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.tka.bakery.entity.Wishlist;

public interface WishlistRepo
        extends JpaRepository<Wishlist,Integer>{

    List<Wishlist> findByUserId(int userId);

    @Transactional
    void deleteByUserIdAndProductId(
            int userId,
            int productId);
}