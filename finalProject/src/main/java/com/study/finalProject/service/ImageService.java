package com.study.finalProject.service;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.study.finalProject.domain.Annotation;
import com.study.finalProject.domain.Image;
import com.study.finalProject.repository.ImageRepository;


@Service
public class ImageService {
	
	private final ImageRepository imageRepository;
	// 의존성 주입
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

	// studyKey와 seriesKey로 이미지 목록 가져오기
	public List<Image> getImagesByStudyKeyAndSeriesKey(Long studyKey, Long seriesKey) {
		
		return imageRepository.getImagesByStudyKeyAndSeriesKey(studyKey, seriesKey);
	}
	
	// 다음 시리즈
	public List<String> getNextSeriesImages(Long studyKey, Long seriesKey) {
        List<Image> images = imageRepository.findNextSeriesImages(studyKey, seriesKey);
        List<String> imagePaths = new ArrayList<>();
        for (Image image : images) {
            String fullPath = Paths.get(image.getPath(), image.getFName()).toString().replace("\\", "/");
            imagePaths.add(fullPath);
        }
        return imagePaths;
    }

	// 이전 시리즈
    public List<String> getPreviousSeriesImages(Long studyKey, Long seriesKey) {
        List<Image> images = imageRepository.findPreviousSeriesImages(studyKey, seriesKey);
        List<String> imagePaths = new ArrayList<>();
        for (Image image : images) {
            String fullPath = Paths.get(image.getPath(), image.getFName()).toString().replace("\\", "/");
            imagePaths.add(fullPath);
        }
        return imagePaths;
    }
    
    public void saveAnnotations(Long imageId, List<Annotation> annotations) {
        Image image = imageRepository.findById(imageId).orElseThrow(() -> new IllegalArgumentException("Image not found"));
        image.setAnnotations(annotations);  // 주석 데이터 저장
        imageRepository.save(image);
    }

}
