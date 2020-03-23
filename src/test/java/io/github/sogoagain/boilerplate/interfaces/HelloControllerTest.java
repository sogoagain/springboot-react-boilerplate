package io.github.sogoagain.boilerplate.interfaces;

import io.github.sogoagain.boilerplate.application.AccountUserDetailService;
import io.github.sogoagain.boilerplate.application.HelloService;
import io.github.sogoagain.boilerplate.domain.Hello;
import io.github.sogoagain.boilerplate.interfaces.dto.HelloRequestDto;
import io.github.sogoagain.boilerplate.interfaces.dto.HelloResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HelloController.class)
class HelloControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private AccountUserDetailService accountUserDetailService;

    @MockBean
    private HelloService helloService;

    @Test
    @WithMockUser
    void getHello() throws Exception {
        final Long resourceId = 1234L;
        final String expectedGreeting = "Hello!";
        final HelloResponseDto mockResponse = HelloResponseDto.builder()
                .greetings(expectedGreeting)
                .build();

        given(helloService.getHello(resourceId)).willReturn(mockResponse);

        mvc.perform(get("/api/hello/" + resourceId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.greetings").value(expectedGreeting));

        verify(helloService).getHello(resourceId);
    }

    @Test
    @WithMockUser
    void list() throws Exception {
        final int pageNumber = 1;
        final int pageSize = 5;
        final Pageable pageable = PageRequest.of(pageNumber, pageSize);

        final List<Hello> helloList = new ArrayList<>();
        for (int i = 1; i <= pageSize; i++) {
            final Hello hello = Hello.builder()
                    .id((long) i)
                    .greetings("Hello" + i)
                    .build();
            helloList.add(hello);
        }

        given(helloService.getHelloList(pageable)).will(invocation -> {
            final Pageable page = invocation.getArgument(0);
            final PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(page.getPageSize(), pageable.getPageNumber(), 30);
            return new PagedModel<>(helloList, pageMetadata);
        });

        mvc.perform(get("/api/hello?page=" + pageNumber + "&size=" + pageSize))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$._embedded.hello_list").isArray())
                .andExpect(jsonPath("$._embedded.hello_list[0].id").value(1L))
                .andExpect(jsonPath("$._embedded.hello_list[0].greetings").value("Hello1"));

        verify(helloService).getHelloList(pageable);
    }

    @Test
    @WithMockUser
    void create() throws Exception {
        final Long resourceId = 1234L;
        final String greetings = "Hello World!";

        given(helloService.registerHello(any())).will(invocation -> {
            final HelloRequestDto resource = invocation.getArgument(0);
            return Hello.builder()
                    .id(resourceId)
                    .greetings(resource.getGreetings())
                    .build();
        });

        mvc.perform(post("/api/hello")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\n" +
                        "  \"greetings\":\"" + greetings + "\"\n" +
                        "}"))
                .andExpect(status().isCreated())
                .andExpect(header().string("location", "/api/hello/1234"));

        verify(helloService).registerHello(any());
    }

    @Test
    @WithMockUser
    void createWithInvalidRequest() throws Exception {
        mvc.perform(post("/api/hello")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\n" +
                        "  \"greetings\":\"\"\n" +
                        "}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("validation failed"))
                .andExpect(jsonPath("$.field_errors[0].field").value("greetings"))
                .andExpect(jsonPath("$.field_errors[0].value").value(""))
                .andExpect(jsonPath("$.field_errors[0].reason").value("must not be blank"));
    }
}