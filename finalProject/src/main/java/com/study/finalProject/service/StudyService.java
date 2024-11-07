package com.study.finalProject.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

//	@Transactional(readOnly = true)
	public List<Study> getStudyByPid(String pid) {
        return studyRepository.findByPatient_Pid(pid);
    }

    public Page<Study> findStudiesByPid(String pid, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return studyRepository.findByPatient_Pid(pid, pageable);
    }

    public Study findStudyByPatientId(String pid) {
        return studyRepository.findByPatient_Pid(pid).stream().findFirst().orElse(null);
    }

}