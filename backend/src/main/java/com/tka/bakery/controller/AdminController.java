package com.tka.bakery.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.tka.bakery.entity.Admin;
import com.tka.bakery.repo.AdminRepo;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class AdminController {

    @Autowired
    private AdminRepo adminRepo;

    private BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    @PostMapping("/login")
    public Admin login(
            @RequestBody Admin admin) {

        Admin existingAdmin =
                adminRepo.findByUsername(
                        admin.getUsername()
                );

        if (existingAdmin == null) {
            return null;
        }

        boolean passwordMatch =
                encoder.matches(
                        admin.getPassword(),
                        existingAdmin.getPassword()
                );

        if (!passwordMatch) {
            return null;
        }

        return existingAdmin;
    }
    
    

}