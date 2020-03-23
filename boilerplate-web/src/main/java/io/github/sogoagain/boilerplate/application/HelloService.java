package io.github.sogoagain.boilerplate.application;

import io.github.sogoagain.boilerplate.application.exception.HelloException;
import io.github.sogoagain.boilerplate.domain.Hello;
import io.github.sogoagain.boilerplate.domain.HelloRepository;
import io.github.sogoagain.boilerplate.interfaces.dto.HelloRequestDto;
import io.github.sogoagain.boilerplate.interfaces.dto.HelloResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class HelloService {

    private final HelloRepository helloRepository;

    @Autowired
    public HelloService(HelloRepository helloRepository) {
        this.helloRepository = helloRepository;
    }

    public HelloResponseDto getHello(Long id) {
        return helloRepository.findById(id)
                .map(HelloResponseDto::of)
                .orElseThrow(() -> new HelloException("Hello Not Found"));
    }

    public PagedModel<Hello> getHelloList(Pageable pageable) {
        final Page<Hello> helloList = helloRepository.findByOrderByIdDesc(pageable);
        final PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(pageable.getPageSize(), helloList.getNumber(), helloList.getTotalElements());

        return new PagedModel<>(new ArrayList<>(helloList.getContent()), pageMetadata);
    }

    public Hello registerHello(HelloRequestDto resource) {
        final Hello hello = Hello.of(resource);
        return helloRepository.save(hello);
    }
}
