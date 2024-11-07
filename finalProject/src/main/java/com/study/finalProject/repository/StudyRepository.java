package com.study.finalProject.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import com.study.finalProject.domain.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long>, JpaSpecificationExecutor<Study> {
    
    // 검색 키워드에 따른 Study 목록 조회
    List<Study> findByStudyDescContainingOrModalityContainingOrPNameContaining(String studyDesc, String modality, String pName);

    // pid 기준 페이지 단위로 Study 조회
    Page<Study> findByPatient_Pid(String pid, Pageable pageable);

    // 특정 pid와 연관된 모든 Study 반환
    List<Study> findByPatient_Pid(String pid);
}
