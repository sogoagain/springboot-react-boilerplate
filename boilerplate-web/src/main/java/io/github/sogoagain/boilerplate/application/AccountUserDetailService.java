package io.github.sogoagain.boilerplate.application;

import io.github.sogoagain.boilerplate.domain.Account;
import io.github.sogoagain.boilerplate.domain.AccountRepository;
import io.github.sogoagain.boilerplate.domain.AccountUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;

@Service
@Transactional
public class AccountUserDetailService implements UserDetailsService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountUserDetailService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        final Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("user not found."));
        return new AccountUserDetails(account, getAuthorities(account));
    }

    private Collection<GrantedAuthority> getAuthorities(Account account) {
        return AuthorityUtils.createAuthorityList("ROLE_USER");
    }
}
