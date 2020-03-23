package io.github.sogoagain.boilerplate.domain;

import io.github.sogoagain.boilerplate.interfaces.dto.HelloRequestDto;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class HelloTest {

    @Test
    void of() {
        final String greetings = "Hello World!";
        final HelloRequestDto requestDto = HelloRequestDto.builder()
                .greetings(greetings)
                .build();

        final Hello hello = Hello.of(requestDto);

        assertThat(hello.getGreetings()).isEqualTo(greetings);
    }
}