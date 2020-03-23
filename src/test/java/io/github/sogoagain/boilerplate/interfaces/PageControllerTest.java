package io.github.sogoagain.boilerplate.interfaces;

import io.github.sogoagain.boilerplate.application.AccountUserDetailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@WebMvcTest(PageController.class)
class PageControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private AccountUserDetailService accountUserDetailService;

    @Test
    @WithMockUser
    void getIndexPage() throws Exception {
        mvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("/index"));
    }

    @Test
    @WithMockUser
    void get404Page() throws Exception {
        mvc.perform(get("/error"))
                .andExpect(status().isOk())
                .andExpect(view().name("/404"));
    }
}