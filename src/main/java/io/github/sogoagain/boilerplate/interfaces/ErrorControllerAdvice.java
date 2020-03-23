package io.github.sogoagain.boilerplate.interfaces;

import io.github.sogoagain.boilerplate.application.exception.HelloException;
import io.github.sogoagain.boilerplate.interfaces.dto.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class ErrorControllerAdvice {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        final ErrorResponseDto response = ErrorResponseDto.of("validation failed", e.getBindingResult());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<ErrorResponseDto> handleBindException(BindException e) {
        final ErrorResponseDto response = ErrorResponseDto.of("bindingResult must not be null", e.getBindingResult());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponseDto> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        final ErrorResponseDto response = ErrorResponseDto.of("method argument type mismatched");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponseDto> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        final ErrorResponseDto response = ErrorResponseDto.of("request method not supported");
        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponseDto> handleAccessDeniedException(AccessDeniedException e) {
        final ErrorResponseDto response = ErrorResponseDto.of("access denied");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ResponseBody
    @ExceptionHandler(HelloException.class)
    public ResponseEntity<ErrorResponseDto> handelHelloException(HelloException e) {
        return new ResponseEntity<>(ErrorResponseDto.of(e.getMessage()), HelloException.HTTP_STATUS);
    }
}

