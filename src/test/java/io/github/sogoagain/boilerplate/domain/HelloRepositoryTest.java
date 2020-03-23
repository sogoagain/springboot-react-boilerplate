package io.github.sogoagain.boilerplate.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class HelloRepositoryTest {

    @Autowired
    private HelloRepository helloRepository;

    @BeforeEach
    void setUp() {
        for (int i = 0; i < 10; i++) {
            final Hello hello = Hello.builder()
                    .greetings("Hello" + i)
                    .build();

            helloRepository.save(hello);
        }
    }

    @Test
    void save() {
        final Hello hello = Hello.builder()
                .greetings("Hello World!")
                .build();

        final Hello savedHello = helloRepository.save(hello);

        assertThat(hello.getId()).isEqualTo(savedHello.getId());
    }

    @Test
    void findById() {
        final Hello hello = Hello.builder()
                .greetings("Hello World!")
                .build();

        final Hello savedHello = helloRepository.save(hello);
        final Hello foundHello = helloRepository.findById(savedHello.getId()).orElse(null);

        assertThat(foundHello).isNotNull();
        assertThat(foundHello).isEqualToComparingFieldByField(savedHello);
    }

    @Test
    void findAllByOrderByIdDesc() {
        final Pageable pageable = PageRequest.of(1, 3);
        final Page<Hello> helloPage = helloRepository.findAllByOrderByIdDesc(pageable);

        assertThat(helloPage.getContent().get(0).getId()).isGreaterThan(helloPage.getContent().get(1).getId());
        assertThat(helloPage.getTotalElements()).isEqualTo(10);
        assertThat(helloPage.getTotalPages()).isEqualTo(4);
        assertThat(helloPage.getNumberOfElements()).isEqualTo(3);
        assertThat(helloPage.getNumber()).isEqualTo(1);
    }
}