package com.study.finalProject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.finalProject.domain.Series;
import com.study.finalProject.domain.Study;
import com.study.finalProject.repository.SeriesRepository;
import com.study.finalProject.repository.StudyRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class StudyService {

    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private SeriesRepository seriesRepository;

    public List<Study> getAllStudies() {
        return studyRepository.findAll();
    }

    public Study getStudyById(Long id) {
        return studyRepository.findById(id).orElse(null);
    }

    public Study saveStudy(Study study) {
        return studyRepository.save(study);
    }

    public void deleteStudy(Long id) {
        studyRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Series> getSeriesByStudyKey(Long studyKey) {
        return seriesRepository.findByStudyKey(studyKey);
    }

    @Transactional(readOnly = true)
    public List<Study> searchStudiesByKeyword(String keyword) {
        return studyRepository.findByStudyDescContainingOrModalityContainingOrPNameContaining(keyword, keyword, keyword);
    }

    @Transactional(readOnly = true)
    public List<Study> getStudyByPid(String pid) {
        return studyRepository.findByPatient_Pid(pid);
    }

    @Transactional(readOnly = true)
    public Page<Study> findStudiesByPid(String pid, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return studyRepository.findByPatient_Pid(pid, pageable);
    }

    @Transactional(readOnly = true)
    public Study findStudyByPatientId(String pid) {
        return studyRepository.findByPatient_Pid(pid).stream().findFirst().orElse(null);
    }
}
