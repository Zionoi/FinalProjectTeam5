package com.study.finalProject.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.study.finalProject.domain.Series;
import com.study.finalProject.domain.Study;


public interface SeriesRepository extends JpaRepository<Series, Long> {
    List<Series> findByStudyKey(Long studyKey);
    
    @Query("SELECT s.seriesKey FROM Series s WHERE s.studyKey = :studyKey")
    List<String> findSeriesKeysByStudyKey(@Param("studyKey") Long studyKey);
    
}
