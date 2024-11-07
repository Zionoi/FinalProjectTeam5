package com.study.finalProject.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

//	@Transactional(readOnly = true)
	public List<Study> getStudyByPid(String pid) {
		List<Study> study = studyRepository.findByPid(pid);
		return study;
	}
}