package com.study.finalProject.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.finalProject.domain.Series;


public interface SeriesRepository extends JpaRepository<Series, Long> {
    List<Series> findByStudyKey(Long studyKey);
}
