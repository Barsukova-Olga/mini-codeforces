package ru.itmo.wp.form.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.itmo.wp.form.PostCredentials;
import ru.itmo.wp.service.PostService;

import java.util.HashSet;
import java.util.Set;

@Component
public class PostCredentialsWritePostValidate implements Validator {


    public PostCredentialsWritePostValidate(PostService postService) {
    }

    public boolean supports(Class<?> clazz) {
        return PostCredentials.class.equals(clazz);
    }

    public void validate(Object target, Errors errors) {
        if (!errors.hasErrors()) {
            PostCredentials postForm = (PostCredentials) target;
        }
    }
}
