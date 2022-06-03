package com.garden.little.controller;

import com.garden.little.modal.AdminUser;
import com.garden.little.modal.Cart;
import com.garden.little.modal.CartData;
import com.garden.little.modal.CartDetails;
import com.garden.little.modal.Product;
import com.garden.little.modal.User;
import com.garden.little.modal.UserRequest;
import com.garden.little.repository.AdminUserRepository;
import com.garden.little.repository.CartRepository;
import com.garden.little.repository.ProductRepo;
import com.garden.little.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@CrossOrigin(origins = "http://localhost:5500")
@RestController
public class Controller {
  @Autowired UserRepository userRepository;
  @Autowired AdminUserRepository adminUserRepository;
  @Autowired ProductRepo productRepo;
  @Autowired CartRepository cartRepository;

  @PostMapping("/login")
  public User loginUser(@RequestBody UserRequest userRequest) {
    System.out.println("Getting user with username: " + userRequest.getEmail());
    User user =
            userRepository.findByEmailAndPassword(userRequest.getEmail(), userRequest.getPassword());
    user.setPassword("************");
    return user;
  }

  @PostMapping("/admin/login")
  public AdminUser loginAdminUser(@RequestBody UserRequest userRequest) {
    System.out.println("Getting admin user with username: " + userRequest.getEmail());
    AdminUser adminUser =
            adminUserRepository.findByEmailAndPassword(
                    userRequest.getEmail(), userRequest.getPassword());
    adminUser.setPassword("************");
    return adminUser;
  }

  @PostMapping("admin/signup")
  public AdminUser signUpAdmin(@RequestBody AdminUser adminUser) {
    System.out.println("Creating new Admin");
    adminUser = adminUserRepository.save(adminUser);
    adminUser.setPassword("************");
    return adminUser;
  }

  @PostMapping("user/signup")
  public User signUpUser(@RequestBody User user) {
    System.out.println("Creating new User");
    user = userRepository.save(user);
    user.setPassword("************");
    return user;
  }

  @GetMapping("/users")
  public List<User> getAllUsers() {
    System.out.println("Getting all users");
    return userRepository.findAll().stream()
            .map(
                    user -> {
                      user.setPassword("************");
                      return user;
                    })
            .collect(Collectors.toList());
  }

  @PutMapping("/update")
  public User updateUser(@RequestBody User user) {
    System.out.println(user);
    User actualUser = userRepository.findByUserId(user.getUserId());
    System.out.println(actualUser);
    user.setPassword(actualUser.getPassword());
    System.out.println("Updating user: " + user.getEmail());
    user = userRepository.save(user);
    user.setPassword("************");
    return user;
  }

  @GetMapping("/products")
  public List<Product> getAllProducts() {
    return productRepo.findAll();
  }

  @GetMapping("/cart/{userId}")
  public CartDetails getUserCart(@PathVariable Integer userId) {
    List<Cart> cart = cartRepository.findByUserId(userId);
    CartDetails cartDetails = new CartDetails();
    cartDetails.setUserId(userId);
    List<CartData> cartDataList = new ArrayList<>();
    cart.forEach(
            cartData -> cartDataList.add(
                    new CartData(
                            cartData.getCount(), productRepo.findByProductId(cartData.getProductId()))));
    cartDetails.setCartData(cartDataList);
    return cartDetails;
  }

  @PostMapping("/cart/add")
  public CartDetails addToCart(@RequestBody Cart cart) {
    cartRepository.save(cart);
    List<Cart> cartList = cartRepository.findByUserId(cart.getUserId());
    CartDetails cartDetails = new CartDetails();
    cartDetails.setUserId(cart.getUserId());
    List<CartData> cartDataList = new ArrayList<>();
    cartList.forEach(
            cartData -> cartDataList.add(
                    new CartData(
                            cartData.getCount(), productRepo.findByProductId(cartData.getProductId()))));
    cartDetails.setCartData(cartDataList);
    return cartDetails;
  }

  @GetMapping("/product/{productId}")
  public Product getProduct(@PathVariable Integer productId){
    return productRepo.findByProductId(productId);
  }

  @PostMapping("/product/update")
  public List<Product> updateProduct(@RequestBody Product product) {
    productRepo.save(product);
    return productRepo.findAll();
  }
}