package com.garden.little.modal;

import java.io.Serializable;
import java.util.Objects;

public class CartId implements Serializable {
  Integer userId;
  Integer productId;

  public CartId() {}

  public CartId(Integer userId, Integer productId) {
    this.userId = userId;
    this.productId = productId;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    CartId cartId = (CartId) o;
    return userId.equals(cartId.userId) && productId.equals(cartId.productId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, productId);
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public Integer getProductId() {
    return productId;
  }

  public void setProductId(Integer productId) {
    this.productId = productId;
  }
}
