package com.study.dicomtest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.dicomtest.domain.Image;
import com.study.dicomtest.repository.ImageRepository;

@Service
public class ImageService {
	@Autowired
	ImageRepository imageRepository;

	public List<Image> getImagesByStudyKeyAndSeriesKey(Long studyKey, Long seriesKey) {
		
		return imageRepository.getImagesByStudyKeyAndSeriesKey(studyKey, seriesKey);
	}

}
