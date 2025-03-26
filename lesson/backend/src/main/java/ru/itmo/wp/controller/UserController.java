package ru.itmo.wp.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.itmo.wp.domain.User;
import ru.itmo.wp.exception.ValidationException;
import ru.itmo.wp.form.UserCredentials;
import ru.itmo.wp.form.validator.UserCredentialsEnterValidator;
import ru.itmo.wp.form.validator.UserCredentialsRegisterValidator;
import ru.itmo.wp.service.JwtService;
import ru.itmo.wp.service.PostService;
import ru.itmo.wp.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private  final JwtService jwtService;
    private final UserCredentialsRegisterValidator userCredentialsRegisterValidator;

    public UserController(UserService userService, JwtService jwtService, UserCredentialsRegisterValidator userCredentialsRegisterValidator) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userCredentialsRegisterValidator = userCredentialsRegisterValidator;
    }


    @InitBinder("userCredentials")
    public void initBinder(WebDataBinder webDataBinder){
        webDataBinder.addValidators(userCredentialsRegisterValidator);
    }


    @GetMapping("users")
    public List<User> findUsers() {
        return userService.findAll();
    }

    @PostMapping("/users")
    public String create(@RequestBody @Valid UserCredentials userCredentials, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult);
        }
        User user = userService.register(userCredentials);
        return jwtService.create(user);
    }


}
