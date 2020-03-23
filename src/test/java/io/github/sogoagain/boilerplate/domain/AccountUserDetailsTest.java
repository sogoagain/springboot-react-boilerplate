package io.github.sogoagain.boilerplate.domain;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class AccountUserDetailsTest {

    @Test
    void create() {
        final Account account = Account.builder()
                .email("admin@example.com")
                .password("password")
                .build();

        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_USER");
        final UserDetails userDetails = new AccountUserDetails(account, authorities);

        assertThat(userDetails.getUsername()).isEqualTo(account.getEmail());
        assertThat(userDetails.getPassword()).isEqualTo(account.getPassword());
        assertThat(userDetails.isEnabled()).isTrue();
        assertThat(userDetails.isAccountNonExpired()).isTrue();
        assertThat(userDetails.isAccountNonLocked()).isTrue();
        assertThat(userDetails.isCredentialsNonExpired()).isTrue();
        assertThat(userDetails.getAuthorities().containsAll(authorities)).isTrue();
    }
}