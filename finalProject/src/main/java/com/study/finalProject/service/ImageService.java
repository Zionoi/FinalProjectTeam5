package com.study.finalProject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.finalProject.domain.Image;
import com.study.finalProject.repository.ImageRepository;


@Service
public class ImageService {
	@Autowired
	ImageRepository imageRepository;

	// studyKey와 seriesKey로 이미지 목록 가져오기
	public List<Image> getImagesByStudyKeyAndSeriesKey(Long studyKey, Long seriesKey) {
		
		return imageRepository.getImagesByStudyKeyAndSeriesKey(studyKey, seriesKey);
	}

}
