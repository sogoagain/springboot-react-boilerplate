package io.github.sogoagain.boilerplate.domain;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.sogoagain.boilerplate.domain.QHello.hello;

public class HelloRepositoryImpl extends QuerydslRepositorySupport implements HelloRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Autowired
    public HelloRepositoryImpl(EntityManager entityManager) {
        super(Hello.class);
        jpaQueryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public Page<Hello> findByOrderByIdDesc(Pageable pageable) {
        final JPAQuery<Hello> query = jpaQueryFactory.selectFrom(hello)
                .orderBy(hello.id.desc());
        final List<Hello> helloList = getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<>(helloList, pageable, query.fetchCount());
    }
}
