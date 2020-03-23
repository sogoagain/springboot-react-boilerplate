package io.github.sogoagain.boilerplate.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class EnvironmentPropertyTest {

    @Autowired
    private EnvironmentProperty environmentProperty;

    @Test
    void getHello() {
        final String hello = environmentProperty.getHello();

        assertThat(hello).isEqualTo("world");
    }
}