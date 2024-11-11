package com.study.finalProject.controller;


import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.study.finalProject.domain.Image;
import com.study.finalProject.service.ImageService;
import com.study.finalProject.service.SeriesService;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class ImageController {

    @Autowired
    private ImageService imageService; // ImageService를 통해 데이터베이스 접근
    
    @Autowired
    private SeriesService seriesService; 
    
    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    // 하드코딩 방지
    @Value("${pacs.storage.path}")
    private String pacsStoragePath;

    // 스터디키와 시리즈키를 사용해 데이터베이스에서 이미지 경로와 파일 이름을 조회
    @GetMapping("/images/studies/{studyKey}/series/{seriesKey}")
    public String getImagesByStudyKeyAndSeriesKey(@PathVariable("studyKey") Long studyKey,
                                                  @PathVariable("seriesKey") Long seriesKey,
                                                  Model model) {
    	
    	// 스터디 키를 통해 해당하는 모든 시리즈 키 목록 가져오기
    	List<String> seriesKeys = seriesService.getSeriesKeysByStudyKey(studyKey);
        model.addAttribute("studyKey", studyKey);
        model.addAttribute("seriesKey", seriesKey);
        model.addAttribute("seriesKeys", seriesKeys);
        
        // 데이터베이스에서 이미지 정보 조회
        List<Image> images = imageService.getImagesByStudyKeyAndSeriesKey(studyKey, seriesKey);

        if (images != null && !images.isEmpty()) {
            List<String> imagePaths = new ArrayList<>();

            // 각 이미지의 경로와 파일명을 결합하여 리스트에 추가
            for (Image image : images) {
                // 데이터베이스에서 가져온 path와 fname을 합쳐서 서버의 경로를 구성
            	String fullPath = Paths.get(image.getPath(), image.getFName()).toString().replace("\\", "/"); // 경로와 파일 이름을 결합
                imagePaths.add(fullPath); // 전체 경로를 추가
            }
            System.out.println("이미지 경로+이름 리스트 imagePaths: " + imagePaths);
            // 모델에 이미지 경로 리스트 추가
            model.addAttribute("imagePaths", imagePaths);
            return "images"; // 이미지 뷰 페이지로 이동
        } else {
            return "errorView"; // 이미지가 없을 경우 에러 페이지로 이동
        }
    }

    // 이미지 파일을 제공하는 메서드: 파일 시스템에서 파일을 찾아서 클라이언트에 제공
    @GetMapping("/dicom-file/**")
    public ResponseEntity<Resource> getImage(HttpServletRequest request) throws MalformedURLException {
        // 경로 얻어오기 ("/dicom-file/" 이후 경로)
        String fullPath = request.getRequestURI().replace("/dicom-file/", "");
        Path filePath = Paths.get(pacsStoragePath, fullPath);
        Resource resource = new UrlResource(filePath.toUri());
        
        logger.info("생성된 파일 경로: {}", filePath);

        System.out.println("생성된 파일 경로: " + filePath.toString()); // 경로 확인 로그
        System.out.println("생성된 resource 파일 경로: " + resource); // 경로 확인 로그

        if (resource.exists() && resource.isReadable()) {
            // 파일이 존재하면 HTTP 응답으로 파일 제공
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            // 파일이 없을 경우 404 에러
            System.out.println("파일을 찾을 수 없습니다: " + filePath.toString());
            return ResponseEntity.notFound().build();
        }
    }
    
    // 여러 시리즈 키를 사용하여 해당하는 이미지들을 가져오는 메서드 추가
    @GetMapping("/studies/{studyKey}/series-images")
    public ResponseEntity<Map<Long, List<String>>> getSeriesImagesByStudyKey(
            @PathVariable("studyKey") Long studyKey,
            @RequestParam("seriesKeys") List<Long> seriesKeys) {

        Map<Long, List<String>> seriesImagesMap = new HashMap<>();

        for (Long seriesKey : seriesKeys) {
            List<Image> images = imageService.getImagesByStudyKeyAndSeriesKey(studyKey, seriesKey);
            List<String> imagePaths = new ArrayList<>();
            
            for (Image image : images) {
                String fullPath = Paths.get(image.getPath(), image.getFName()).toString().replace("\\", "/");
                imagePaths.add(fullPath);
            }
            
            seriesImagesMap.put(seriesKey, imagePaths);
        }

        return ResponseEntity.ok(seriesImagesMap);
    }
    
//    
//    
// 
//        // 모든 이미지 목록 페이지
//        @GetMapping
//        public String getAllImages(Model model) {
//            List<Image> images = imageService.getAllImages();
//            model.addAttribute("images", images);
//            return "imageList"; // 타임리프 템플릿 파일 이름 (imageList.html)
//        }
//
//        // 특정 이미지 상세 페이지
//        @GetMapping("/{imageKey}")
//        public String getImageById(@PathVariable Long imageKey, Model model) {
//            imageService.getImageById(imageKey).ifPresent(image -> model.addAttribute("image", image));
//            return "imageDetail"; // 타임리프 템플릿 파일 이름 (imageDetail.html)
//        }
//
//        // 이미지 추가 폼 페이지
//        @GetMapping("/new")
//        public String createImageForm(Model model) {
//            model.addAttribute("image", new Image());
//            return "createImage"; // 타임리프 템플릿 파일 이름 (createImage.html)
//        }
//
//        // 이미지 추가/수정 처리
//        @PostMapping
//        public String saveOrUpdateImage(@ModelAttribute Image image) {
//            imageService.saveOrUpdateImage(image);
//            return "redirect:/images";
//        }
//
//        // 이미지 삭제
//        @PostMapping("/{imageKey}/delete")
//        public String deleteImage(@PathVariable Long imageKey) {
//            imageService.deleteImage(imageKey);
//            return "redirect:/images";
//        }
//    }

    
    
}
