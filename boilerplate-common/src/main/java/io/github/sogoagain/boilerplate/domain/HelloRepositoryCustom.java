package io.github.sogoagain.boilerplate.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HelloRepositoryCustom {
    Page<Hello> findByOrderByIdDesc(Pageable pageable);
}
