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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.study.finalProject.domain.Patient;
import com.study.finalProject.domain.Study;
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
        Optional<Patient> patient = patientService.getPatientById(pid);
        patient.ifPresent(pa -> model.addAttribute("patient", pa));
        return "patientDetail"; 
    }

    // 코멘트 업데이트
    @PostMapping("/updateComment")
    @ResponseBody
    public Map<String, Object> updateComment(@RequestBody Map<String, String> requestData) {
        Map<String, Object> response = new HashMap<>();
        try {
            String pid = requestData.get("pid");
            String commentText = requestData.get("comments");

            
            patientService.addCommentWithTimestamp(pid, commentText);
            List<String> updatedComments = patientService.getAllComments(pid);
            
            response.put("success", true);
            response.put("newComment", updatedComments.get(updatedComments.size() - 1));
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Error updating comment");
        }
        return response;
    }

    @PostMapping("/deleteComment")
    @ResponseBody
    public Map<String, Object> deleteComment(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> response = new HashMap<>();
        try {
            String pid = (String) requestData.get("pid");
            int commentIndex = (int) requestData.get("commentIndex");

            patientService.deleteComment(pid, commentIndex);
            response.put("success", true);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Error deleting comment");
        }
        return response;
    }
    
}
