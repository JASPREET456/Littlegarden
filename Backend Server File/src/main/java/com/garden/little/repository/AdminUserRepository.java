package com.garden.little.repository;

import com.garden.little.modal.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Integer> {
    AdminUser findByEmailAndPassword(String email, String password);
}
