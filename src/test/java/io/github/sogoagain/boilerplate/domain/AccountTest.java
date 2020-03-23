package io.github.sogoagain.boilerplate.domain;

import org.junit.jupiter.api.Test;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class AccountTest {

    @Test
    void isNotEnabledWhenExpired() {
        final Account expiredAccount = Account.builder()
                .email("admin@example.com")
                .password("SDAKVBJCKVLB!@#")
                .unregisteredAt(ZonedDateTime.now(ZoneOffset.UTC).minusDays(1))
                .build();

        assertThat(expiredAccount.isEnabled()).isFalse();
    }

    @Test
    void isEnabledWhenValid() {
        final Account validAccount = Account.builder()
                .email("admin@example.com")
                .password("SDAKVBJCKVLB!@#")
                .build();

        assertThat(validAccount.isEnabled()).isTrue();
    }
}