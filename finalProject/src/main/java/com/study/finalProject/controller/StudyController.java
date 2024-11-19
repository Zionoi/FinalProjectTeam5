package com.study.finalProject.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import com.study.finalProject.domain.Series;
import com.study.finalProject.domain.Study;
import com.study.finalProject.repository.StudyRepository;
import com.study.finalProject.service.SeriesService;
import com.study.finalProject.service.StudyService;

import jakarta.persistence.criteria.Predicate;

@Controller
@SessionAttributes("searchCriteria")
public class StudyController {

    @Autowired
    private StudyService studyService;

    @Autowired
    private SeriesService seriesService;

    @Autowired
    private StudyRepository studyRepository;

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/studyList")
    public String getAllStudies(Model model) {
        List<Study> studies = studyService.getAllStudies();
        model.addAttribute("studies", studies);
        return "studyList";
    }

    @GetMapping("/studyList/{studyKey}/series")
    public String seriesList(@PathVariable("studyKey") Long studyKey, Model model) {
        List<Series> seriesList = studyService.getSeriesByStudyKey(studyKey);
        model.addAttribute("series", seriesList);
        return "series :: seriesSection";
    }

    @GetMapping("/studyList/{pid}/choice")
    public String studyChoice(@PathVariable("pid") String pid, Model model) {
        List<Study> choiceStudies = studyService.getStudyByPid(pid);
        model.addAttribute("choiceStudies", choiceStudies);
        return "studyChoice :: studyChoice";
    }

    @GetMapping("/studyList/new")
    public String createStudyForm(Model model) {
        model.addAttribute("study", new Study());
        return "createStudy";
    }

    @PostMapping("/studyList/{studyKey}/delete")
    public String deleteStudy(@PathVariable Long studyKey) {
        studyService.deleteStudy(studyKey);
        return "redirect:/studies";
    }

    @ModelAttribute("searchCriteria")
    public List<String> initializeSearchCriteria() {
        return new ArrayList<>();
    }

    @GetMapping("/studyList/search")
    public String searchStudies(@RequestParam(name = "searchQuery", required = false) String searchQuery,
                                @RequestParam(name = "criteria", required = false) String criteria,
                                @ModelAttribute("searchCriteria") List<String> searchCriteria,
                                Model model) {
        if (criteria != null && searchQuery != null && !searchQuery.isEmpty()) {
            String currentCondition = criteria + ": " + searchQuery;
            if (!searchCriteria.contains(currentCondition)) {
                searchCriteria.add(currentCondition);
            }
        }
        return performSearch(searchCriteria, model);
    }

    @GetMapping("/studyList/dateSearch")
    public String searchByDate(@RequestParam(name = "startDate", required = false) String startDateStr,
                               @RequestParam(name = "endDate", required = false) String endDateStr,
                               @ModelAttribute("searchCriteria") List<String> searchCriteria,
                               Model model) {
        searchCriteria.removeIf(condition -> condition.startsWith("dateRange"));
        if (startDateStr != null && !startDateStr.isEmpty() && endDateStr != null && !endDateStr.isEmpty()) {
            searchCriteria.add("dateRange: " + startDateStr + " ~ " + endDateStr);
        }
        return performSearch(searchCriteria, model);
    }

    private String performSearch(List<String> searchCriteria, Model model) {
        Specification<Study> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            for (String condition : searchCriteria) {
                String[] parts = condition.split(": ");
                String searchType = parts[0];
                String searchValue = parts[1];
                switch (searchType) {
                    case "patientName":
                        predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("PName")), "%" + searchValue.toLowerCase() + "%"));
                        break;
                    case "doctorName":
                        predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("operatorsName")), "%" + searchValue.toLowerCase() + "%"));
                        break;
                    case "equipment":
                        predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("modality")), "%" + searchValue.toLowerCase() + "%"));
                        break;
                    case "examName":
                        predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("studyDesc")), "%" + searchValue.toLowerCase() + "%"));
                        break;
                    case "dateRange":
                        String[] dates = searchValue.split(" ~ ");
                        try {
                            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                            Date startDate = dateFormat.parse(dates[0].trim());
                            Date endDate = dateFormat.parse(dates[1].trim());
                            predicates.add(criteriaBuilder.between(root.get("studyDate").as(Date.class), startDate, endDate));
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                        break;
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        List<Study> searchResults = studyRepository.findAll(spec);
        model.addAttribute("searchResults", searchResults);
        model.addAttribute("searchCriteria", searchCriteria);
        return "studyList";
    }

    @GetMapping("/studyList/search/reset")
    public String resetSearch(SessionStatus sessionStatus) {
        sessionStatus.setComplete();
        return "redirect:/studyList/search";
    }
    
    //코멘트 업데이트
    @PostMapping("/updateReport")
    public String updateReport(@RequestParam Long studyKey, @RequestParam String report) {
        studyService.setReportForStudy(studyKey, report);
        return "Report updated successfully";
    }
    
    @GetMapping("/ct3d")
    public String showCT3DView() {
        return "ct3d"; 
    }
}
