package io.github.sogoagain.boilerplate.interfaces.dto;

import com.google.common.base.CaseFormat;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.validation.BindingResult;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ErrorResponseDto {
    private String message;
    private List<FieldError> fieldErrors;

    private ErrorResponseDto(String message) {
        this.message = message;
        this.fieldErrors = new ArrayList<>();
    }

    private ErrorResponseDto(String message, List<FieldError> fieldErrors) {
        this.message = message;
        this.fieldErrors = fieldErrors;
    }

    public static ErrorResponseDto of(String message) {
        return new ErrorResponseDto(message);
    }

    public static ErrorResponseDto of(String message, final BindingResult bindingResult) {
        return new ErrorResponseDto(message, FieldError.of(bindingResult));
    }

    public static ErrorResponseDto of(MethodArgumentTypeMismatchException e) {
        final String value = e.getValue() == null ? "" : e.getValue().toString();
        final List<FieldError> errors = FieldError.of(e.getName(), value,
                e.getErrorCode());
        return new ErrorResponseDto(e.getMessage(), errors);
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class FieldError {
        private String field;
        private String value;
        private String reason;

        private FieldError(final String field, final String value, final String reason) {
            this.field = field;
            this.value = value;
            this.reason = reason;
        }

        public static List<FieldError> of(final String field, final String value, final String reason) {
            final List<FieldError> fieldErrors = new ArrayList<>();
            fieldErrors.add(new FieldError(field, value, reason));
            return fieldErrors;
        }

        private static List<FieldError> of(final BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();
            return fieldErrors.stream()
                    .map(error -> new FieldError(
                            CaseFormat.LOWER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, error.getField()),
                            error.getRejectedValue() == null ? "" :
                                    error.getRejectedValue().toString(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }
}
