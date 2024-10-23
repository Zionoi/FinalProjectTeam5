package com.study.finalProject.controller;




import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List; // 리스트를 사용하기 위해 필요
//import com.study.dicom.Study; // Study 엔티티 클래스 경로 (패키지명은 실제 프로젝트에 맞게 수정)
//import com.study.dicom.Series; // Series 엔티티 클래스 경로
//import com.study.dicom.Image; // Image 엔티티 클래스 경로

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
        return "index";  // 인덱스 페이지
    }
    
    
    
    @GetMapping("/studyList")
    public String getAllStudies(Model model) {
        try {
            List<Study> studies = studyService.getAllStudies();
            
            if (studies == null) {
                studies = new ArrayList<>(); // null인 경우 빈 리스트로 처리
            }
            
            model.addAttribute("studies", studies);
            System.out.println("스터디리스트페이지 실행확인 studies :" + studies);
        } catch (Exception e) {
            model.addAttribute("errorMessage", "데이터를 불러오는 중 오류가 발생했습니다.");
            return "error"; // 에러 페이지로 이동
        }
        
        return "studyList"; 
    }
    
    // 특정 Study에 속한 Series 목록을 전달
    @GetMapping("/studyList/{studyKey}/series")
    public String listSeries(@PathVariable("studyKey") Long studyKey, Model model) {
        List<Series> seriesList = studyService.getSeriesByStudyKey(studyKey);
        model.addAttribute("series", seriesList);
        return "series";
    }
    
    @GetMapping("/studyList/{pid}/choice")
    public String studyChoice(@PathVariable("pid") String pid, Model model) {
    	System.out.println("초이스 메소드 실행확인 pid : "+pid);
        try {
            List<Study> choiceStudies = studyService.getStudyByPid(pid);
            model.addAttribute("choiceStudies", choiceStudies);
            System.out.println("초이스 메소드 실행확인 choiceStudies : "+ choiceStudies);
            return "studyChoice :: studyChoice";
        } catch (Exception e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "error"; // 에러 페이지로 이동
        }
    }
  

//    // 특정 스터디 상세 페이지
//    @GetMapping("/{studyKey}")
//    public String getStudyById(@PathVariable Long studyKey, Model model) {
//        studyService.getStudyById(studyKey).ifPresent(study -> model.addAttribute("study", study));
//        return "studyDetail"; // 타임리프 템플릿 파일 이름 (studyDetail.html)
//    }

    // 스터디 추가 폼 페이지
    @GetMapping("/studyList/new")
    public String createStudyForm(Model model) {
        model.addAttribute("study", new Study());
        return "createStudy"; // 타임리프 템플릿 파일 이름 (createStudy.html)
    }
//
//    // 스터디 추가/수정 처리
//    @PostMapping("/studyList")
//    public String saveOrUpdateStudy(@ModelAttribute Study study) {
//        studyService.saveStudy(study);
//        return "redirect:/studies";
//    }

    // 스터디 삭제
    @PostMapping("/studyList/{studyKey}/delete")
    public String deleteStudy(@PathVariable Long studyKey) {
        studyService.deleteStudy(studyKey);
        return "redirect:/studies";
    }
    
    // 세션에 검색 조건을 저장하기 위한 초기화 메서드
    @ModelAttribute("searchCriteria")
    public List<String> initializeSearchCriteria() {
        return new ArrayList<>();
    }

    // 일반 검색
    @GetMapping("/studyList/search")
    public String searchStudies(
        @RequestParam(name = "searchQuery", required = false) String searchQuery,
        @RequestParam(name = "criteria", required = false) String criteria,
        @ModelAttribute("searchCriteria") List<String> searchCriteria,
        Model model) {

        // 새로운 검색 조건이 들어오면 세션에 추가
        if (criteria != null && searchQuery != null && !searchQuery.isEmpty()) {
            String currentCondition = criteria + ": " + searchQuery;
            if (!searchCriteria.contains(currentCondition)) {
                searchCriteria.add(currentCondition);
            }
        }

        // 검색 실행
        return performSearch(searchCriteria, model);
    }

    // 날짜 검색
    @GetMapping("/studyList/dateSearch")
    public String searchByDate(
        @RequestParam(name = "startDate", required = false) String startDateStr,
        @RequestParam(name = "endDate", required = false) String endDateStr,
        @ModelAttribute("searchCriteria") List<String> searchCriteria,
        Model model) {

        // 날짜 검색 조건을 세션에 추가
        if (startDateStr != null && !startDateStr.isEmpty() && endDateStr != null && !endDateStr.isEmpty()) {
            String dateCondition = "dateRange: " + startDateStr + " ~ " + endDateStr;
            if (!searchCriteria.contains(dateCondition)) {
                searchCriteria.add(dateCondition);
            }
        }

        // 검색 실행
        return performSearch(searchCriteria, model);
    }

    // 공통 검색 메서드
    private String performSearch(List<String> searchCriteria, Model model) {
        Specification<Study> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 세션에 저장된 모든 검색 조건을 기준으로 검색
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
                        // 날짜 범위 검색 처리
                        String[] dates = searchValue.split(" ~ ");
                        try {
                            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                            Date startDate = dateFormat.parse(dates[0].trim());
                            Date endDate = dateFormat.parse(dates[1].trim());

                            // 날짜 타입으로 between 조건을 처리
                            predicates.add(criteriaBuilder.between(root.get("studyDate").as(Date.class), startDate, endDate));
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                        break;
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        // 동적 쿼리 실행
        List<Study> searchResults = studyRepository.findAll(spec);

        // 검색 조건과 검색 결과를 모델에 전달
        model.addAttribute("searchResults", searchResults);
        model.addAttribute("searchCriteria", searchCriteria);

        return "studyList";  // 검색 결과를 보여줄 뷰
    }


    // 검색 조건 초기화
    @GetMapping("/studyList/search/reset")
    public String resetSearch(SessionStatus sessionStatus) {
        sessionStatus.setComplete();  // 세션 초기화
        return "redirect:/studyList/search";  // 검색 페이지로 리다이렉트
    }
    
    //특정 검색 조건 제외
    @GetMapping("/studyList/removeCriteria")
    public String removeCriteria(
        @RequestParam("index") int index,
        @ModelAttribute("searchCriteria") List<String> searchCriteria,
        Model model) {

        // 선택된 검색 조건을 세션에서 제거
        if (index >= 0 && index < searchCriteria.size()) {
            searchCriteria.remove(index);
        }

        // 나머지 조건으로 검색 수행
        return performSearch(searchCriteria, model);
    }
    
    
}