package com.SensorSafe.API.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.SensorSafe.API.model.users.User;

public interface UserRepository  extends MongoRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
