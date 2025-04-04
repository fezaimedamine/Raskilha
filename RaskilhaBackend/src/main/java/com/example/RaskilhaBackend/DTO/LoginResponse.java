package com.example.RaskilhaBackend.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;
    private UserDTO user;

    // Constructeur
    public LoginResponse(String token, UserDTO user) {
        this.token = token;
        this.user = user;
    }
}
