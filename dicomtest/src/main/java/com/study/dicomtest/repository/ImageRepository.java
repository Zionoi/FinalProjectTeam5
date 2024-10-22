package com.study.dicomtest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.dicomtest.domain.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{

	List<Image> getImagesByStudyKeyAndSeriesKey(Long studyKey, Long seriesKey);

}
