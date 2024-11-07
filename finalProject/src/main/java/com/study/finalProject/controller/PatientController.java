package com.study.finalProject.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.finalProject.domain.Patient;
import com.study.finalProject.service.PatientService;



@Controller
@RequestMapping("/patients")
public class PatientController {
	
	@Autowired
    private PatientService patientService;

    

    // 모든 환자 목록 페이지
    @GetMapping
    public String getAllPatients(Model model) {
        List<Patient> patients = patientService.getAllPatients();
        model.addAttribute("patients", patients);
        return "patientList"; // patientList.html
    }

    // 특정 환자 상세 페이지
    @GetMapping("/{pid}")
    public String getPatientById(@PathVariable String pid, Model model) {
        patientService.getPatientById(pid).ifPresent(patient -> model.addAttribute("patient", patient));
        return "patientDetail"; // patientDetail.html
    }

    // 환자 추가 폼 페이지
    @GetMapping("/new")
    public String createPatientForm(Model model) {
        model.addAttribute("patient", new Patient());
        return "createPatient"; // createPatient.html
    }

    // 환자 추가/수정 처리
    @PostMapping
    public String saveOrUpdatePatient(@ModelAttribute Patient patient) {
        patientService.saveOrUpdatePatient(patient);
        return "redirect:/patients";
    }

    // 환자 삭제
    @PostMapping("/{pid}/delete")
    public String deletePatient(@PathVariable String pid) {
        patientService.deletePatient(pid);
        return "redirect:/patients";
    }
}
