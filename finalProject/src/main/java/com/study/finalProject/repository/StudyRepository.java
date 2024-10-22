package com.study.finalProject.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.finalProject.domain.Study;



@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {

	List<Study> findByStudyDescContainingOrModalityContainingOrPNameContaining(String studyDesc, String modality, String pName);

}
