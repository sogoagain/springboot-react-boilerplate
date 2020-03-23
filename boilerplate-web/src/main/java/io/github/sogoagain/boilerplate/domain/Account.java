package io.github.sogoagain.boilerplate.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Optional;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(name = "ACCOUNT_EMAIL_UNIQUE", columnNames = {"EMAIL"})})
@EntityListeners(AuditingEntityListener.class)
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Setter
    @Column(nullable = false)
    private String password;

    @Setter
    private String resetToken;

    private ZonedDateTime unregisteredAt;

    @CreatedDate
    private ZonedDateTime createdAt;

    @CreatedBy
    private Long createdBy;

    @LastModifiedDate
    private ZonedDateTime updatedAt;

    @LastModifiedBy
    private Long updatedBy;

    public boolean isEnabled() {
        return Optional.ofNullable(unregisteredAt)
                .map(unregisteredTime -> unregisteredTime.isAfter(ZonedDateTime.now(ZoneOffset.UTC)))
                .orElse(true);
    }
}
