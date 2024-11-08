package com.study.finalProject.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.finalProject.domain.Patient;
import com.study.finalProject.repository.PatientRepository;

import jakarta.persistence.EntityNotFoundException;


@Service
public class PatientService {

	@Autowired
    private PatientRepository patientRepository;

    

    // 모든 환자 조회
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // 특정 환자 조회
    public Optional<Patient> getPatientById(String pid) {
        return patientRepository.findById(pid);
    }

    // 환자 추가/수정
    public Patient saveOrUpdatePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // 환자 삭제
    public void deletePatient(String pid) {
        patientRepository.deleteById(pid);
    }
    
 // 코멘트 추가 메서드
    public void updateComments(String pid, String comments) {
        Patient patient = patientRepository.findById(pid)
                                          .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        // 코멘트 추가
        patient.getComments().add(comments);
        
        // Patient 엔티티 저장
        patientRepository.save(patient);
    }

    // 특정 환자의 모든 코멘트를 조회하는 메서드
    public List<String> getAllComments(String pid) {
        Patient patient = patientRepository.findById(pid)
                                          .orElseThrow(() -> new RuntimeException("Patient not found"));
        return patient.getComments();
    }
    
    public Patient findPatientByPid(String pid) {
        return patientRepository.findById(pid).orElseThrow(() -> new EntityNotFoundException("Patient not found"));
    }
    
 // comments 추가 메서드
    public void addCommentWithTimestamp(String pid, String commentText) {
        Patient patient = patientRepository.findByPid(pid);
        if (patient != null) {
            // 날짜와 시간을 포함한 코멘트 포맷
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            String commentWithTimestamp = "[" + timestamp + "] " + commentText;
            
            // comments에 추가
            patient.getComments().add(commentWithTimestamp);
            patientRepository.save(patient);
        }
    }
    public void deleteComment(String pid, int commentIndex) {
        Patient patient = patientRepository.findById(pid)
            .orElseThrow(() -> new EntityNotFoundException("Patient not found"));
        
        if (commentIndex >= 0 && commentIndex < patient.getComments().size()) {
            patient.getComments().remove(commentIndex);
            patientRepository.save(patient);
        } else {
            throw new IllegalArgumentException("Invalid comment index");
        }
    }
    

    
    
    
}
