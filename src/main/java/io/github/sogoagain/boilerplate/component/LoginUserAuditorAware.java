package io.github.sogoagain.boilerplate.component;

import io.github.sogoagain.boilerplate.domain.Account;
import io.github.sogoagain.boilerplate.domain.AccountUserDetails;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class LoginUserAuditorAware implements AuditorAware<Long> {
    @Override
    public Optional<Long> getCurrentAuditor() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        final Long accountId = Optional.ofNullable(authentication)
                .filter(Authentication::isAuthenticated)
                .filter(auth -> auth.getPrincipal() instanceof AccountUserDetails)
                .map(auth -> ((AccountUserDetails) auth.getPrincipal()).getAccount())
                .map(Account::getId)
                .orElse(-1L);

        return Optional.of(accountId);
    }
}
