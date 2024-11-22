package com.study.finalProject.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "REPORTTAB")
@Getter
@Setter
@NoArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REPORT_ID")
    private Long id;

    @Column(name = "REPORT_NAME", nullable = false, length = 255)
    private String name;

    @Column(name = "DETAILS", columnDefinition = "TEXT")
    private String details;

    @ManyToOne
    @JoinColumn(name = "PATIENT_PID")
    private Patient patient;
}
