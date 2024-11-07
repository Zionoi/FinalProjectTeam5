package com.study.finalProject.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.finalProject.domain.Study;



@Repository
public interface StudyRepository extends JpaRepository<Study, Long>, JpaSpecificationExecutor<Study> {

	List<Study> findByStudyDescContainingOrModalityContainingOrPNameContaining(String studyDesc, String modality, String pName);

	List<Study> findByPid(String pid);
	
	 @Query(value = "SELECT * FROM STUDYTAB WHERE PID = :pid", nativeQuery = true)
	    List<Study> findStudiesByPid(@Param("pid") String pid);

//	List<Study> findAllByPid(String pid);


    // 특정 pid와 연관된 모든 Study 반환
    List<Study> findByPatient_Pid(String pid);
    
    Optional<Study> findById(Long studyKey);

}
