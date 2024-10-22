package com.study.dicomtest.repository;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.dicomtest.domain.Series;

public interface SeriesRepository extends JpaRepository<Series, Long> {
    List<Series> findByStudyKey(Long studyKey);
}
