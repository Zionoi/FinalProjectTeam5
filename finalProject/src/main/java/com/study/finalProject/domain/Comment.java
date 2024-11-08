package com.study.finalProject.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PATIENT_COMMENT")
@Getter
@Setter
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "COMMENT_TEXT", nullable = false)
    private String text;

    @Column(name = "TIMESTAMP", nullable = false)
    private String timestamp;

    @ManyToOne
    @JoinColumn(name = "PID", nullable = false)
    private Patient patient;
}
