package io.github.sogoagain.boilerplate.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class AccountRepositoryTest {

    @Autowired
    private AccountRepository accountRepository;

    @BeforeEach
    void setUp() {
        for (int i = 0; i < 10; i++) {
            final Account account = Account.builder()
                    .email(String.format("account%d@example.com", i))
                    .password("password")
                    .build();
            accountRepository.save(account);
        }
    }

    @Test
    void findByEmail() {
        final Optional<Account> foundAccount = accountRepository.findByEmail("account1@example.com");

        assertThat(foundAccount.isPresent()).isTrue();
        assertThat(foundAccount.get().getEmail()).isEqualTo("account1@example.com");
    }
}