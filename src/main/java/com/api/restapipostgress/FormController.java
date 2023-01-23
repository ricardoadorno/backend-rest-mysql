package com.api.restapipostgress;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class FormController {
    @RequestMapping("/form")
    public String showForm(Model model) {
        return "form";
    }

    @PostMapping("/submit-name")
    public String submitName(@RequestParam("name") String name, Model model) {
        // Do something with the name
        model.addAttribute("name", name);
        return "submit-name";
    }
}