package com.garden.little.modal;

public class CartData {
  Integer quantity;
  Product product;

  public CartData(Integer quantity, Product cart) {
    this.quantity = quantity;
    this.product = cart;
  }

  public CartData() {
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  @Override
  public String toString() {
    return "CartData{" +
            "quantity=" + quantity +
            ", cart=" + product +
            '}';
  }
}
