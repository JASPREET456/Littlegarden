package com.garden.little.modal;

import java.util.List;

public class CartDetails {
    Integer userId;
    List<CartData> cartData;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public List<CartData> getCartData() {
        return cartData;
    }

    public void setCartData(List<CartData> cartData) {
        this.cartData = cartData;
    }

    @Override
    public String toString() {
        return "CartDetails{" +
                "userId=" + userId +
                ", cartData=" + cartData +
                '}';
    }
}
