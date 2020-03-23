package io.github.sogoagain.boilerplate.application;

import io.github.sogoagain.boilerplate.domain.Account;
import io.github.sogoagain.boilerplate.domain.AccountRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;

class AccountUserDetailServiceTest {

    @InjectMocks
    private AccountUserDetailService accountUserDetailService;

    @Mock
    private AccountRepository accountRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void loadUserByUsername() {
        final String email = "admin@example.com";

        given(accountRepository.findByEmail(email)).will(invocation -> Optional
                .of(Account.builder()
                        .email(email)
                        .password("password")
                        .build()));

        final UserDetails userDetails = accountUserDetailService.loadUserByUsername(email);

        assertThat(userDetails.getUsername()).isEqualTo(email);
    }

    @Test
    void loadUserByUsernameWithNotExisted() {
        final String email = "admin@example.com";

        given(accountRepository.findByEmail(email)).willReturn(Optional.empty());

        assertThatThrownBy(() -> accountUserDetailService.loadUserByUsername(email))
                .isExactlyInstanceOf(UsernameNotFoundException.class);
    }
}