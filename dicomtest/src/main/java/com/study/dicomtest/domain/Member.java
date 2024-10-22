package com.study.dicomtest.domain;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;  // 기본 키

    @Column(nullable = false, unique = true)
    private String username;  // 로그인용 사용자 이름 (고유값)

    @Column(nullable = false)
    private String password;  // 비밀번호

    @Column(nullable = false)
    private String role;  // 사용자 역할 (예: ADMIN, USER 등)

    @Column
    private String email;  // 이메일 (선택)

    @ElementCollection
    @CollectionTable(name = "member_patients", joinColumns = @JoinColumn(name = "member_id"))
    @Column(name = "patient_name")
    private List<String> patientNames;  // 사용자가 담당하는 환자 이름 리스트
}

