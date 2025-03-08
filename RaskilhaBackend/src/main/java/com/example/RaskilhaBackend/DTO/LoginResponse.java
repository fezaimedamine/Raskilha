package com.example.RaskilhaBackend.DTO;

import com.example.RaskilhaBackend.Entity.UserEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;
    private UserEntity user;

    // Constructeur
    public LoginResponse(String token, UserEntity user) {
        this.token = token;
        this.user = user;
    }
}
