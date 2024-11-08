package com.study.finalProject.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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


 // pid를 기반으로 Study 상세 페이지를 보여주는 메서드
    @GetMapping("/studyList/{pid}/patientDetail")
    public String getpatientDetail(@PathVariable("pid") String pid, Model model) {
        // pid로 Study 조회
    	Optional<Patient> patient = patientService.getPatientById(pid);

        if (patient.isPresent()) {
        	Patient pa = patient.get();
            model.addAttribute("patient", pa);
        } else {
            model.addAttribute("patient", null);
        }

        return "patientDetail"; 
    }
    // 환자 댓글 업데이트
    @PostMapping("/updateComment")
    @ResponseBody
    public Map<String, Object> updateComment(@RequestParam(value = "pid") String pid, 
                                             @RequestParam(value = "comments") String comments) {
        Map<String, Object> response = new HashMap<>();
        
        // 날짜와 시간을 포함하여 코멘트를 추가하는 메서드 호출
        patientService.addCommentWithTimestamp(pid, comments);

        response.put("success", true); // 성공 여부를 JSON에 포함
        return response;
    }

    @PostMapping("/deleteComment")
    @ResponseBody
    public Map<String, Object> deleteComment(@RequestParam("pid") String pid, 
                                             @RequestParam("commentIndex") int commentIndex) {
        Map<String, Object> response = new HashMap<>();

        patientService.deleteComment(pid, commentIndex);
        response.put("success", true);
        return response;
    }
}
