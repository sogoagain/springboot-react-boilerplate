package io.github.sogoagain.boilerplate.application;

import io.github.sogoagain.boilerplate.application.exception.HelloException;
import io.github.sogoagain.boilerplate.domain.Hello;
import io.github.sogoagain.boilerplate.domain.HelloRepository;
import io.github.sogoagain.boilerplate.interfaces.dto.HelloRequestDto;
import io.github.sogoagain.boilerplate.interfaces.dto.HelloResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowableOfType;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

class HelloServiceTest {

    @InjectMocks
    private HelloService helloService;

    @Mock
    private HelloRepository helloRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getHello() {
        final Long resourceId = 1234L;
        final String expectedGreetings = "Hello World!";

        given(helloRepository.findById(resourceId)).will(invocation -> Optional.of(Hello.builder()
                .id(invocation.getArgument(0))
                .greetings(expectedGreetings)
                .build()));

        final HelloResponseDto helloResponseDto = helloService.getHello(resourceId);

        assertThat(helloResponseDto.getGreetings()).isEqualTo(expectedGreetings);
        verify(helloRepository).findById(resourceId);
    }

    @Test
    void getHelloWithNotExisted() {
        final Long resourceId = 1234L;

        given(helloRepository.findById(resourceId)).willReturn(Optional.empty());

        final HelloException helloException = catchThrowableOfType(() ->
                helloService.getHello(resourceId), HelloException.class);

        assertThat(helloException.getMessage()).isEqualTo("Hello Not Found");
    }

    @Test
    void getHelloList() {
        final int pageNumber = 1;
        final int pageSize = 10;
        final int total = 30;
        final Pageable pageable = PageRequest.of(pageNumber, pageSize);
        final List<Hello> helloList = new ArrayList<>();

        for (int i = 1; i <= pageSize; i++) {
            final Hello hello = Hello.builder()
                    .id((long) i)
                    .greetings("Hello" + i)
                    .build();
            helloList.add(hello);
        }

        given(helloRepository.findByOrderByIdDesc(pageable)).willReturn(new PageImpl<>(helloList, pageable, total));

        final PagedModel<Hello> resources = helloService.getHelloList(pageable);

        assertThat(resources.getContent().size()).isEqualTo(pageSize);
        assertThat(resources.getMetadata().getTotalElements()).isEqualTo(total);
        assertThat(resources.getMetadata().getTotalPages()).isEqualTo(total / pageSize);
        assertThat(resources.getMetadata().getNumber()).isEqualTo(pageNumber);
        assertThat(resources.getMetadata().getSize()).isEqualTo(pageSize);

        verify(helloRepository).findByOrderByIdDesc(pageable);
    }

    @Test
    void registerHello() {
        final Long expectedId = 1234L;
        final String expectedGreetings = "Hello World!";
        final HelloRequestDto resource = HelloRequestDto.builder()
                .greetings(expectedGreetings)
                .build();

        given(helloRepository.save(any())).will(invocation -> {
            final Hello hello = invocation.getArgument(0);
            hello.setId(expectedId);
            return hello;
        });

        final Hello hello = helloService.registerHello(resource);

        assertThat(hello.getId()).isEqualTo(expectedId);
        assertThat(hello.getGreetings()).isEqualTo(resource.getGreetings());

        verify(helloRepository).save(any());
    }
}