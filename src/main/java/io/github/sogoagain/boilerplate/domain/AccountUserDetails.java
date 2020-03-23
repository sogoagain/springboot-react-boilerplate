package io.github.sogoagain.boilerplate.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class AccountUserDetails extends User {
    private final Account account;

    public AccountUserDetails(Account account, Collection<GrantedAuthority> authorities) {
        super(account.getEmail(), account.getPassword(), account.isEnabled(),
                true, true, true, authorities);

        this.account = account;
    }

    public Account getAccount() {
        return account;
    }
}
