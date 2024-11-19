package com.study.finalProject.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.finalProject.domain.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
	
	@Query("SELECT p FROM Patient p WHERE p.pid = :pid")
	Patient findByPid(@Param("pid") String pid);

}