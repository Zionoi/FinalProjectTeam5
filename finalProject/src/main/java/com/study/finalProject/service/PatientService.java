package com.study.finalProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.finalProject.domain.Patient;
import com.study.finalProject.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(String pid) {
        return patientRepository.findById(pid);
    }

    public Patient saveOrUpdatePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public void deletePatient(String pid) {
        patientRepository.deleteById(pid);
    }

    public void updateComments(String pid, String comments) {
        Patient patient = patientRepository.findByPid(pid);
        System.out.println("서비스 pid 확인"+ pid);
    	System.out.println("서비스 코멘트 확인"+ comments);
    	System.out.println("서비스 patient 확인"+ patient);     
            patient.setComments(comments);
            patientRepository.save(patient);   
    }

    public Patient findPatientByPid(String pid) {
        return patientRepository.findByPid(pid);
    }
}
