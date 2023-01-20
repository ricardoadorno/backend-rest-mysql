package com.api.restapipostgress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    // get all users
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

}
