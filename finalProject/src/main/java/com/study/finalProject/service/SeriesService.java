package com.study.finalProject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.finalProject.domain.Series;
import com.study.finalProject.domain.Study;
import com.study.finalProject.repository.SeriesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SeriesService {
	
	@Autowired
    private SeriesRepository seriesRepository;

   
    public List<Series> getAllSeries() {
        return seriesRepository.findAll();
    }

    public Optional<Series> getSeriesById(Long seriesKey) {
        return seriesRepository.findById(seriesKey);
    }

    public Series saveOrUpdateSeries(Series series) {
        return seriesRepository.save(series);
    }

    public void deleteSeries(Long seriesKey) {
        seriesRepository.deleteById(seriesKey);
    }
    
    public List<String> getSeriesKeysByStudyKey(Long studyKey) {
        return seriesRepository.findSeriesKeysByStudyKey(studyKey);
    }

    
    
	
}
