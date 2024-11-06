document.addEventListener('DOMContentLoaded', () => {
	// cornerstone 초기화
    if (typeof cornerstone === 'undefined' || typeof cornerstoneWADOImageLoader === 'undefined') {
        console.error("Cornerstone 또는 Cornerstone WADO Image Loader가 초기화되지 않았습니다.");
        return;
    }
    
    // cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
	cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;

    const element = document.getElementById('dicomImage');
    if (!element) {
        console.error("dicomImage 요소를 찾을 수 없습니다.");
        return;
    }
    cornerstone.enable(element);    
    
    if (!Array.isArray(imagePaths) || imagePaths.length === 0) {
        console.error("imagePaths 배열이 비어 있거나 정의되지 않았습니다.");
        return;
    }
    
    let currentIndex = 0;  // 현재 이미지 인덱스 초기화
    const totalImages = imagePaths.length;  // 전체 이미지 개수

    // 첫 번째 이미지를 로드
    loadAndDisplayImage(imagePaths[currentIndex]);

    // 이미지를 로드하고 표시하는 함수
    function loadAndDisplayImage(filename, targetElement) {
		if (!filename) {
            console.error("filename이 비어 있습니다.");
            return;
        }
        
        const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;  // HTTP 경로 사용
        console.log("filename 넘겨받은 경로 :: ", filename);
        
        cornerstone.loadImage(imageId).then(image => {
            cornerstone.displayImage(targetElement, image);
        }).catch(err => {
            console.error('이미지 로드 실패:', err);
        });
    }

    // 이미지를 인덱스로 업데이트하는 함수
   function updateTheImage(imageIndex) {
	    if (imageIndex >= 0 && imageIndex < totalImages) {
	        currentIndex = imageIndex;
	        const filename = imagePaths[currentIndex];
	        if (!filename) {
	            console.error("Filename not found for current index:", currentIndex);
	            return;
	        }
	        const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;
	        console.log("이미지 로드 경로:", imageId);
	
	        cornerstone.loadImage(imageId).then(image => {
	            cornerstone.displayImage(element, image);
	        }).catch(err => {
	            console.error("이미지 로드 실패:", err);
	        });
	    }
	}

    // 마우스 휠 이벤트로 이미지 전환
    element.addEventListener('wheel', function (e) {
        e.preventDefault();
        console.log('deltaY:', e.deltaY);

        if (e.deltaY > 0 && currentIndex < totalImages - 1) {
            currentIndex += 1;
        } else if (e.deltaY < 0 && currentIndex > 0) {
            currentIndex -= 1;
        }
        loadAndDisplayImage(imagePaths[currentIndex]);
    }, { passive: false });

    // 첫 번째 이미지를 페이지 로드 시 표시
    updateTheImage(0);

});
