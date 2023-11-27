package com.SensorSafe.API.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.users.User;

public interface UserRepository  extends MongoRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsername(String username);
}
