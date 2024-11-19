package com.study.finalProject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.finalProject.domain.Image;



@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{

	List<Image> getImagesByStudyKeyAndSeriesKey(Long studyKey, Long seriesKey);

}
