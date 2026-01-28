package ru.itmo.wp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import ru.itmo.wp.domain.Notice;
import ru.itmo.wp.service.NoticeService;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@Controller
public class AddNoticePage extends Page {
    private final NoticeService noticeService;

    public AddNoticePage(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.addValidators();
    }

    @GetMapping(path = "/addNotice")
    public String addNoticeGet(Model model) {
        model.addAttribute("notice", new Notice());
        return "AddNoticePage";
    }

    @PostMapping(path = "/addNotice")
    public String addNoticePost(@Valid @ModelAttribute("notice") Notice notice, BindingResult bindingResult,
                                HttpSession httpSession) {
        if (bindingResult.hasErrors()) {
            return "AddNoticePage";
        }
        noticeService.save(notice);
        setMessage(httpSession, "You successfully add new notice");
        return "redirect:";
    }
}