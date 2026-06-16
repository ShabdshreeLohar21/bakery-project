package com.tka.bakery.controller;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tka.bakery.entity.Otp;
import com.tka.bakery.entity.User;
import com.tka.bakery.repo.OtpRepository;
import com.tka.bakery.repo.UserRepo;
import com.tka.bakery.service.EmailService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class UserController {
	
	@Autowired
	private OtpRepository otpRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private UserRepo userRepo;
	
	private BCryptPasswordEncoder encoder =
	        new BCryptPasswordEncoder();

	@PostMapping("/register")
	public User register(@RequestBody User user) {

	    User existingUser =
	            userRepo.findByEmail(user.getEmail());

	    if (existingUser != null) {

	        System.out.println("Email Already Exists");
	        return null;
	    }

	    user.setPassword(
	            encoder.encode(user.getPassword())
	    );

	    return userRepo.save(user);
	}

    
    
	@PostMapping("/login")
	public User login(@RequestBody User user) {

	    User existingUser =
	            userRepo.findByEmail(
	                    user.getEmail()
	            );

	    if (existingUser == null) {
	        return null;
	    }

	    boolean passwordMatch =
	            encoder.matches(
	                    user.getPassword(),
	                    existingUser.getPassword()
	            );

	    if (!passwordMatch) {
	        return null;
	    }

	    return existingUser;
	}
    
    

	@PostMapping("/send-otp")
	public ResponseEntity<?> sendOtp(
	        @RequestParam String email) {

	    String regex =
	            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";

	    if (!email.matches(regex)) {
	        return ResponseEntity.badRequest()
	                .body("Invalid email format");
	    }

	    String otp =
	            String.valueOf(
	                    100000 +
	                    new Random().nextInt(900000));

	    Otp otpObj =
	            otpRepository
	                    .findByEmail(email)
	                    .orElse(new Otp());

	    otpObj.setEmail(email);
	    otpObj.setOtp(otp);
	    otpObj.setExpiryTime(
	            LocalDateTime.now().plusMinutes(5));

	    otpRepository.save(otpObj);

	    emailService.sendOtp(email, otp);

	    return ResponseEntity.ok("OTP sent");
	}
	
    @PutMapping("/update/{id}")
    public User updateUser(
            @PathVariable Integer id,
            @RequestBody User updatedUser) {

        User user = userRepo.findById(id).orElse(null);

        if (user != null) {

            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setMobile(updatedUser.getMobile());
            user.setAddress(updatedUser.getAddress());

            return userRepo.save(user);
        }

        return null;
    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        Optional<Otp> otpData =
                otpRepository.findByEmail(email);

        if (otpData.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("OTP not found");
        }

        Otp savedOtp = otpData.get();

        if (savedOtp.getExpiryTime()
                .isBefore(LocalDateTime.now())) {

            return ResponseEntity.badRequest()
                    .body("OTP expired");
        }

        if (!savedOtp.getOtp().equals(otp)) {

            return ResponseEntity.badRequest()
                    .body("Invalid OTP");
        }

        return ResponseEntity.ok("Verified");
    }
}