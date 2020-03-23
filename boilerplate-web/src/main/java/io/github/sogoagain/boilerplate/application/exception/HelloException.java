package io.github.sogoagain.boilerplate.application.exception;

import org.springframework.http.HttpStatus;

public class HelloException extends RuntimeException {
    public static final HttpStatus HTTP_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;

    public HelloException(String message) {
        super(message);
    }
}
