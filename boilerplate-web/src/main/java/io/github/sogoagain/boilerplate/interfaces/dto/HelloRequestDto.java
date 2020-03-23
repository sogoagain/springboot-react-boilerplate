package io.github.sogoagain.boilerplate.interfaces.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HelloRequestDto {

    @NotBlank
    private String greetings;
}
