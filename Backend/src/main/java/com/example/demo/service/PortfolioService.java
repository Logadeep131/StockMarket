package com.example.demo.service;

import com.example.demo.entity.Holding;
import com.example.demo.entity.User;
import com.example.demo.entity.Watchlist;
import com.example.demo.repository.HoldingRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HoldingRepository holdingRepository;

    @Autowired
    private WatchlistRepository watchlistRepository;

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUserBalance(Long userId, Double newBalance) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setBalance(newBalance);
            return userRepository.save(user);
        }
        return null;
    }

    public Holding addHolding(Holding holding) {
        return holdingRepository.save(holding);
    }

    public List<Holding> getHoldingsByUserId(Long userId) {
        return holdingRepository.findByUserId(userId);
    }

    public void removeHolding(Long holdingId) {
        holdingRepository.deleteById(holdingId);
    }

    public Watchlist addWatchlistItem(Watchlist watchlist) {
        return watchlistRepository.save(watchlist);
    }

    public List<Watchlist> getWatchlistByUserId(Long userId) {
        return watchlistRepository.findByUserId(userId);
    }

    public void removeWatchlistItem(Long watchlistId) {
        watchlistRepository.deleteById(watchlistId);  // Corrected method name
    }
}
