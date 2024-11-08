package com.study.finalProject.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.finalProject.domain.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
	Patient findByPid(String pid);
}
