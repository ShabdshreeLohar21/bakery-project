package com.tka.bakery.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tka.bakery.entity.Admin;

public interface AdminRepo
        extends JpaRepository<Admin, Integer> {

    Admin findByUsername(String username);

}