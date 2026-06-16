package com.tka.bakery.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tka.bakery.entity.Otp;

@Repository
public interface OtpRepository
        extends JpaRepository<Otp, Long> {

    Optional<Otp> findByEmail(String email);
}