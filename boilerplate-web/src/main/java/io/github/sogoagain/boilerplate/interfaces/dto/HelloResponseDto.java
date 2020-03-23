package io.github.sogoagain.boilerplate.interfaces.dto;

import io.github.sogoagain.boilerplate.domain.Hello;
import lombok.*;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HelloResponseDto {

    private String greetings;

    public static HelloResponseDto of(Hello hello) {
        return builder()
                .greetings(hello.getGreetings())
                .build();
    }
}
