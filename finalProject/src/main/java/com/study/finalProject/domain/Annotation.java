package com.study.finalProject.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Annotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;      // 주석의 유형 (예: "text", "arrow" 등)
    private String data;      // 주석의 실제 데이터 (좌표, 텍스트 등)

    @ManyToOne
    private Image image;      // 주석이 속한 이미지와의 관계 설정

    // 기본 생성자
    public Annotation() {
    }

    // 필요한 Getter, Setter 메서드 추가
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}
