package com.study.finalProject.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.finalProject.domain.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
    // 추가적인 쿼리 메서드가 필요하다면 여기에 작성하세요.
}
