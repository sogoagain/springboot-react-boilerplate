package io.github.sogoagain.boilerplate.domain;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface HelloRepository extends PagingAndSortingRepository<Hello, Long>, HelloRepositoryCustom {
}
