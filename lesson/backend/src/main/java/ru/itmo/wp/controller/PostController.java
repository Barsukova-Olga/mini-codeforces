package ru.itmo.wp.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.itmo.wp.domain.Post;
import ru.itmo.wp.domain.User;
import ru.itmo.wp.exception.ValidationException;
import ru.itmo.wp.form.UserCredentials;
import ru.itmo.wp.service.JwtService;
import ru.itmo.wp.service.PostService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    private final PostService postService;



    public PostController(PostService postService) {
        this.postService = postService;
    }

    @InitBinder("userCredentials")
    public void initBinder(WebDataBinder webDataBinder){
        webDataBinder.addValidators();
    }


    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.findAll();
    }

}
