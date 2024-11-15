package com.study.finalProject.domain;



import java.util.ArrayList;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import lombok.Setter;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "PATIENTTAB")
@Getter
@Setter
@NoArgsConstructor
public class Patient {

    @Id
    @Column(name = "PID", length = 64)
    private String pid;

    @Column(name = "PNAME", nullable = false, length = 64)
    private String pName;
    
    @ElementCollection
      
    @CollectionTable(name = "PATIENT_COMMENTS", joinColumns = @JoinColumn(name = "PATIENT_PID"))
              
    @Column(name = "PATIENT_COMMENT")               
    private List<String> comments = new ArrayList<>();

    @Column(name = "PATKEY", length = 64)
    private String patKey;

    @Column(name = "PATIENTKEY")
    private Long patientKey;

    @Column(name = "PLASTNAME", length = 64)
    private String pLastName;

    @Column(name = "PFIRSTNAME", length = 64)
    private String pFirstName;

    @Column(name = "PSEX", length = 2)
    private String pSex;

    @Column(name = "PBIRTHDATE", length = 8)
    private String pBirthDate;

    @Column(name = "PBIRTHTIME", length = 8)
    private String pBirthTime;

    @Column(name = "INSERTDATE", length = 8)
    private String insertDate;

    @Column(name = "INSERTTIME", length = 8)
    private String insertTime;

    @Column(name = "HOSPITALID", columnDefinition = "NUMBER DEFAULT 0")
    private Long hospitalId;

    @Column(name = "PKNAME", length = 64)
    private String pkName;

    @Column(name = "PENAME", length = 64)
    private String peName;

    @Column(name = "INSNAME", length = 255)
    private String insName;

    @Column(name = "DELFLAG")
    private Long delFlag;

    @Column(name = "INSERTED", length = 14)
    private String inserted;

    @Column(name = "UPDATED", length = 14)
    private String updated;

    // RESERVED fields
    @Column(name = "RESERVED1")
    private Long reserved1;

    @Column(name = "RESERVED2")
    private Long reserved2;

    @Column(name = "RESERVED3")
    private Long reserved3;

    @Column(name = "RESERVED4", length = 255)
    private String reserved4;

    @Column(name = "RESERVED5", length = 255)
    private String reserved5;

    @Column(name = "RESERVED6", length = 255)
    private String reserved6;

    @Column(name = "RESERVED7", length = 255)
    private String reserved7;

    @Column(name = "RESERVED8", length = 255)
    private String reserved8;

    @Column(name = "RESERVED9", length = 255)
    private String reserved9;

    @Column(name = "RESERVED10", length = 255)
    private String reserved10;
}