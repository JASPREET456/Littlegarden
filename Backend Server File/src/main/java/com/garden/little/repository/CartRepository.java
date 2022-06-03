package com.garden.little.repository;

import com.garden.little.modal.Cart;
import com.garden.little.modal.CartId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, CartId> {
  List<Cart> findByUserId(Integer userId);
}
