package io.github.sogoagain.boilerplate.interfaces;

import io.github.sogoagain.boilerplate.application.HelloService;
import io.github.sogoagain.boilerplate.domain.Hello;
import io.github.sogoagain.boilerplate.interfaces.dto.HelloRequestDto;
import io.github.sogoagain.boilerplate.interfaces.dto.HelloResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class HelloController {
    private final HelloService helloService;

    @Autowired
    public HelloController(HelloService helloService) {
        this.helloService = helloService;
    }

    @GetMapping("/api/hello/{id}")
    public HelloResponseDto getHello(@PathVariable Long id) {
        return helloService.getHello(id);
    }

    @GetMapping("/api/hello")
    public PagedModel<Hello> list(@PageableDefault Pageable pageable) {
        final PagedModel<Hello> resources = helloService.getHelloList(pageable);
        resources.add(linkTo(methodOn(HelloController.class).list(pageable)).withSelfRel());
        return resources;
    }

    @PostMapping("/api/hello")
    public ResponseEntity<String> create(@Valid @RequestBody HelloRequestDto resource) throws URISyntaxException {
        final Hello hello = helloService.registerHello(resource);
        final String url = "/api/hello/" + hello.getId();
        return ResponseEntity.created(new URI(url)).body("{}");
    }
}
