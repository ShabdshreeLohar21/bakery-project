package com.tka.bakery.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tka.bakery.entity.User;

public interface UserRepo
        extends JpaRepository<User, Integer> {

    User findByEmail(String email);

}