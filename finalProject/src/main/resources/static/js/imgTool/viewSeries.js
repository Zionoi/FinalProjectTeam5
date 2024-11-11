// 시리즈 모아보기 활성화 함수
function initializeViewSeries(element) {
	
	// 시리즈 모아보기 버튼 클릭 이벤트 추가
    document.getElementById('viewSeriesBtn').addEventListener('click', function () {
	    const element = document.getElementById('dicomImage');
	    let combinedImageIds = [];
	
	    // 각 시리즈의 이미지를 불러와서 combinedImageIds에 추가
	    seriesKeys.forEach(seriesKey => {
	        // 각 시리즈의 이미지 경로를 불러오는 함수를 가정
	        const seriesImageIds = getSeriesImageIds(studyKey, seriesKey);
	        combinedImageIds = combinedImageIds.concat(seriesImageIds);
	    });
	
	    const stack = {
	        currentImageIdIndex: 0,
	        imageIds: combinedImageIds
	    };
	
	    cornerstone.loadImage(combinedImageIds[0]).then(image => {
	        cornerstone.displayImage(element, image);
	        cornerstoneTools.addStackStateManager(element, ['stack']);
	        cornerstoneTools.addToolState(element, 'stack', stack);
	    });
	
	    // StackScrollTool 활성화
	    cornerstoneTools.setToolActive('StackScroll', { bindings: [{ mouseButtonMask: 1 }] });
	    
	    console.log("모든 시리즈 로드 완료, 마우스 휠로 이미지 전환 가능");
	});

}
