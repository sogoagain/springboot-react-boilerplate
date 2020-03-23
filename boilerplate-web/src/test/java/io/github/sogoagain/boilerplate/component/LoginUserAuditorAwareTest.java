package io.github.sogoagain.boilerplate.component;

import io.github.sogoagain.boilerplate.domain.Account;
import io.github.sogoagain.boilerplate.domain.AccountUserDetails;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

class LoginUserAuditorAwareTest {
    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        final Account mockAccount = Account.builder()
                .id(1234L)
                .email("admin@example.com")
                .password("password")
                .build();
        final UserDetails mockUserDetails = new AccountUserDetails(mockAccount,
                AuthorityUtils.createAuthorityList("ROLE_USER"));

        given(authentication.getPrincipal()).willReturn(mockUserDetails);
        given(authentication.isAuthenticated()).willReturn(true);
        given(securityContext.getAuthentication()).willReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void getCurrentAuditor() {
        final LoginUserAuditorAware loginUserAuditorAware = new LoginUserAuditorAware();
        assertThat(loginUserAuditorAware.getCurrentAuditor().orElse(-1L)).isEqualTo(1234L);
    }
}