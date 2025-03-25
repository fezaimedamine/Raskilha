package com.example.RaskilhaBackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RaskilhaBackend.Entity.PubEntity;
import com.example.RaskilhaBackend.Service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    @Autowired
    private final NotificationService notificationService;

    //exemple : http://localhost:8081/api/notifications/3
    @GetMapping("/{id}")
    public List<PubEntity> getLastFivePubs(@PathVariable Long id) {
        return notificationService.getNotifications(id);
}
}
