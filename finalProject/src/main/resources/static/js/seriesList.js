document.addEventListener('DOMContentLoaded', () => {
	
	// cornerstone 초기화 함수 호출
    initializeCornerstoneTools();
    
    // cornerstone 및 cornerstoneTools 초기화
    if (typeof cornerstone === 'undefined' || typeof cornerstoneWADOImageLoader === 'undefined') {
        console.error("Cornerstone 또는 Cornerstone WADO Image Loader가 초기화되지 않았습니다.");
        return;
    }

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
	cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.init();
    
    const element = document.getElementById('dicomImage');
    if (!element) {
        console.error("dicomImage 요소를 찾을 수 없습니다.");
        return;
    }
    cornerstone.enable(element);
    
    window.Thumbnail = function(studyKey,seriesKey) {
    
		console.log('테스트js imagePaths : ', imagePaths[0]);
	    
	    axios.get(`/image/Thumbnail/${studyKey}/series/${seriesKey}`, {
	        headers: { 'Accept': 'application/json' }
	    })
	    .then(response => {
	        const imagePaths = response.data;
	        console.log('더블클릭한 이미지 경로 imagePaths :', imagePaths);
	
	        const imageIds =  `wadouri:/dicom-file/${imagePaths[0]}`;
	            console.log("시리즈레이아웃js imageIds : ", imageIds);
	            // cornerstone을 통해 이미지를 로드하고 표시
	            
		
		    // 첫 번째 이미지를 로드
		    cornerstone.loadImage(imageIds).then((image) => {
		        console.log('시리즈 썸네일 이미지 경로 image : ', image);
		        cornerstone.displayImage(element, image);
	             
	            }).catch(err => {
	                console.error(`Failed to load image for seriesKey ${seriesKey}:`, err);
	            });
	       
	    })
    }
});
