package com.study.finalProject.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.finalProject.domain.Series;
import com.study.finalProject.domain.Study;
import com.study.finalProject.repository.SeriesRepository;
import com.study.finalProject.repository.StudyRepository;

@Service
public class StudyService {

    @Autowired
    private StudyRepository studyRepository;
    
    @Autowired
    private SeriesRepository seriesRepository;

    public List<Study> getAllStudies() {
        return studyRepository.findAll();
    }

    public Optional<Study> getStudyById(Long id) {
        return studyRepository.findById(id);
    }

    public Study saveStudy(Study study) {
        return studyRepository.save(study);
    }

    public void deleteStudy(Long id) {
        studyRepository.deleteById(id);
    }

    public List<Series> getSeriesByStudyKey(Long studyKey) {
        return seriesRepository.findByStudyKey(studyKey);
    }

    public List<Study> searchStudiesByKeyword(String keyword) {
        return studyRepository.findByStudyDescContainingOrModalityContainingOrPNameContaining(keyword, keyword, keyword);
    }

    public List<Study> getStudyByPid(String pid) {
        return studyRepository.findByPid(pid);
    }

    // 리포트를 설정하는 별도의 메서드 추가
    public void setReportForStudy(Long studyKey, String report) {
        Study study = studyRepository.findById(studyKey).orElseThrow(() -> new IllegalArgumentException("Study not found"));
        study.setReport(report);
        studyRepository.save(study);
    }
}
