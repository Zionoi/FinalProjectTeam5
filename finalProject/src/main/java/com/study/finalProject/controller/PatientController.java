package com.study.finalProject.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.study.finalProject.domain.Patient;
import com.study.finalProject.domain.Study;
import com.study.finalProject.service.PatientService;
import com.study.finalProject.service.StudyService;

@Controller
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private StudyService studyService;

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

    // 환자의 Study 목록 페이지
    @GetMapping("/studyList/{pid}/patientDetail")
    public String getPatientDetail(@PathVariable("pid") String pid,
                                   @RequestParam(value = "page", defaultValue = "0") int page,
                                   Model model) {
        int size = 10;
        Page<Study> studyPage = studyService.findStudiesByPid(pid, page, size);

        model.addAttribute("choiceStudies", studyPage.getContent());
        model.addAttribute("totalPages", studyPage.getTotalPages());
        model.addAttribute("currentPage", page);
        return "studyChoice"; // studyChoice.html
    }

    // 환자 댓글 업데이트
    @PostMapping("/updateComment")
    public String updateComment(@RequestParam("pid") String pid, 
                                @RequestParam("comments") String comments) {
        System.out.println("컨트롤러 pid 확인: " + pid);
        System.out.println("컨트롤러 코멘트 확인: " + comments);
        
        patientService.updateComments(pid, comments);
        return "redirect:/patients/" + pid; // 댓글 업데이트 후 환자 상세 페이지로 리디렉션
    }

    // 보고서 페이지
    @GetMapping("/reportPage")
    public String reportPage(@RequestParam("pid") String pid, Model model) {
        Patient patient = patientService.findPatientByPid(pid);
        List<Study> studies = studyService.getStudyByPid(pid); // 변경된 메서드 호출

        model.addAttribute("patient", patient);
        model.addAttribute("studies", studies);

        return "reportPage"; // reportPage.html
    }
}
