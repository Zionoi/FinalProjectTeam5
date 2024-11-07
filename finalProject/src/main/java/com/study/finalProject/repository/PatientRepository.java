package com.study.finalProject.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.finalProject.domain.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
	Patient findByPid(String pid);
	@Modifying
	@Query("UPDATE Patient p SET p.comments = :comments WHERE p.pid = :pid")
	void updateComments(@Param("pid") Long pid, @Param("comments") String comments);
}
