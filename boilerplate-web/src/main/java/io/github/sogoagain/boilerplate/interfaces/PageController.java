package io.github.sogoagain.boilerplate.interfaces;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController implements ErrorController {

    @GetMapping("/")
    public String getIndexPage() {
        return "/index";
    }

    @GetMapping("/error")
    public String get404Page() {
        return "/index";
    }

    @Override
    public String getErrorPath() {
        return "/index";
    }
}
