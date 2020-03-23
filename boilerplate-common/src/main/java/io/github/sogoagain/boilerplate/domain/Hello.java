package io.github.sogoagain.boilerplate.domain;

import io.github.sogoagain.boilerplate.interfaces.dto.HelloRequestDto;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.hateoas.server.core.Relation;

import javax.persistence.*;
import java.time.ZonedDateTime;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
@Relation(collectionRelation = "hello_list")
public class Hello {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Long id;

    @Column(nullable = false)
    private String greetings;

    @CreatedDate
    private ZonedDateTime createdAt;

    @CreatedBy
    private Long createdBy;

    @LastModifiedDate
    private ZonedDateTime updatedAt;

    @LastModifiedBy
    private Long updatedBy;

    public static Hello of(HelloRequestDto resource) {
        return Hello.builder()
                .greetings(resource.getGreetings())
                .build();
    }
}
