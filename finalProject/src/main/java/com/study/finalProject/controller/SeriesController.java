package com.study.finalProject.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.finalProject.domain.Series;
import com.study.finalProject.service.SeriesService;

@Controller
@RequestMapping("/series")
public class SeriesController {
	
	@Autowired
    private SeriesService seriesService;

  
    // 모든 시리즈 목록 페이지
    @GetMapping
    public String getAllSeries(Model model) {
        List<Series> seriesList = seriesService.getAllSeries();
        model.addAttribute("seriesList", seriesList);
        return "seriesList"; // 타임리프 템플릿 파일 이름 (seriesList.html)
    }

    // 특정 시리즈 상세 페이지
    @GetMapping("/{seriesKey}")
    public String getSeriesById(@PathVariable Long seriesKey, Model model) {
        seriesService.getSeriesById(seriesKey).ifPresent(series -> model.addAttribute("series", series));
        return "seriesDetail"; // 타임리프 템플릿 파일 이름 (seriesDetail.html)
    }

    // 시리즈 추가 폼 페이지
    @GetMapping("/new")
    public String createSeriesForm(Model model) {
        model.addAttribute("series", new Series());
        return "createSeries"; // 타임리프 템플릿 파일 이름 (createSeries.html)
    }

    // 시리즈 추가/수정 처리
    @PostMapping
    public String saveOrUpdateSeries(@ModelAttribute Series series) {
        seriesService.saveOrUpdateSeries(series);
        return "redirect:/series";
    }

    // 시리즈 삭제
    @PostMapping("/{seriesKey}/delete")
    public String deleteSeries(@PathVariable Long seriesKey) {
        seriesService.deleteSeries(seriesKey);
        return "redirect:/series";
    }
}
