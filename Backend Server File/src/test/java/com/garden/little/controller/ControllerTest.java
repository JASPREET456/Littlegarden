package com.garden.little.controller;

import com.garden.little.modal.AdminUser;
import com.garden.little.modal.User;
import com.garden.little.repository.AdminUserRepository;
import com.garden.little.repository.UserRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@RunWith(SpringRunner.class)
public class ControllerTest {
  private MockMvc mockMvc;
  @InjectMocks Controller controller;
  @Mock UserRepository userRepository;
  @Mock AdminUserRepository adminUserRepository;

  @Before
  public void init() {
    this.mockMvc = standaloneSetup(controller).build();
  }

  @Test
  public void loginUser() throws Exception {
    User user = new User();
    Mockito.when(userRepository.findByEmailAndPassword(Mockito.anyString(), Mockito.anyString()))
        .thenReturn(user);
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/login")
            .content("{\"email\": \"test@test.com\",\"password\": \"testpassword\"}");
    mockMvc
        .perform(request.contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(
            result -> {
              Assert.assertEquals(
                  "{\"userId\":null,\"fullName\":null,\"email\":null,\"password\":\"************\",\"createdOn\":null}",
                  result.getResponse().getContentAsString());
            });
  }

    @Test
    public void loginAdminUser() throws Exception {
      AdminUser user = new AdminUser();
      Mockito.when(adminUserRepository.findByEmailAndPassword(Mockito.anyString(), Mockito.anyString()))
              .thenReturn(user);
      MockHttpServletRequestBuilder request =
              MockMvcRequestBuilders.post("/admin/login")
                      .content("{\"email\": \"test@test.com\",\"password\": \"testpassword\"}");
      mockMvc
              .perform(request.contentType(MediaType.APPLICATION_JSON))
              .andExpect(status().isOk())
              .andExpect(
                      result -> {
                        Assert.assertEquals(
                                "{\"userId\":null,\"fullName\":null,\"email\":null,\"password\":\"************\",\"createdOn\":null}",
                                result.getResponse().getContentAsString());
                      });
    }

    @Test
    public void signUpAdmin() throws Exception {
      AdminUser adminUser = new AdminUser();
      Mockito.when(adminUserRepository.save(Mockito.any())).thenReturn(adminUser);
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/admin/signup")
            .content(
                "{\"userId\": 1,\"fullName\": \"Test Name\",\"email\": \"test@test.com\",\"password\": \"************\",\"createdOn\": \"2022-05-09\"}");
    mockMvc
        .perform(request.contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(
            result -> {
              Assert.assertEquals(
                      "{\"userId\":null,\"fullName\":null,\"email\":null,\"password\":\"************\",\"createdOn\":null}",
                  result.getResponse().getContentAsString());
            });
    }

    @Test
    public void signUpUser() throws Exception {
      User user = new User();
      Mockito.when(userRepository.save(Mockito.any())).thenReturn(user);
      MockHttpServletRequestBuilder request =
              MockMvcRequestBuilders.post("/user/signup")
                      .content(
                              "{\"userId\": 1,\"fullName\": \"Test Name\",\"email\": \"test@test.com\",\"password\": \"************\",\"createdOn\": \"2022-05-09\"}");
      mockMvc
              .perform(request.contentType(MediaType.APPLICATION_JSON))
              .andExpect(status().isOk())
              .andExpect(
                      result -> {
                        Assert.assertEquals(
                                "{\"userId\":null,\"fullName\":null,\"email\":null,\"password\":\"************\",\"createdOn\":null}",
                                result.getResponse().getContentAsString());
                      });
    }
  //
  //  @Test
  //  void getAllUsers() {}
  //
  //  @Test
  //  void updateUser() {}
}
