function initializeHistoryDropdown() {
	
	document.getElementById("historyBtn").addEventListener("click", function () {
	    const thumbnailSidebar = document.getElementById("thumbnailSidebar");
	
	    if (!thumbnailSidebar) { 
	        console.error("thumbnailSidebar 요소를 찾을 수 없습니다.");
	        return;
	    }
	
	    // 사이드바 토글
	    if (thumbnailSidebar.classList.contains("open")) {
	        // 닫기
	        thumbnailSidebar.classList.remove("open");
	        console.log("사이드바 닫힘");
	    } else {
	        // 열기
	        thumbnailSidebar.classList.add("open");
	        console.log("사이드바 열림");
	
	        // 썸네일 로드
	        if (!studyKey || !seriesKeys || seriesKeys.length === 0) {
	            console.error("Study Key 또는 Series Keys가 정의되지 않았습니다.");
	            return;
	        }
	        
	        // 사이드바가 열릴 때 Cornerstone 컨테이너 크기 강제 업데이트
            setTimeout(() => {
                const container = document.getElementById("thumbnailContainer");
                if (container) {
                    const cornerstoneElements = container.querySelectorAll('.cornerstone-box');
                    cornerstoneElements.forEach(element => {
                        cornerstone.resize(element, true); // 크기 업데이트
                    });
                }
            }, 100); // DOM 업데이트 이후 호출
	        loadThumbnails(studyKey, seriesKeys);
	    }
	    
	    console.error("seriesKeys:", seriesKeys);
	});

}


// 썸네일 로드 함수
function loadThumbnails(studyKey, seriesKeys) {
    const container = document.getElementById("thumbnailContainer");
    container.innerHTML = ""; // 기존 썸네일 초기화

    // 모든 axios 요청을 Promise로 생성
    const requests = seriesKeys.map(seriesKey =>
        axios.get(`/image/Thumbnail/${studyKey}/series/${seriesKey}`).then(response => ({
            seriesKey,
            imagePaths: response.data || []
        }))
    );

    // 모든 요청이 완료되면 처리
    Promise.all(requests)
        .then(results => {
            results.forEach(({ seriesKey, imagePaths }) => {
                if (imagePaths.length > 0) {
                    // 박스 컨테이너 생성
                    const boxContainer = document.createElement('div');
                    boxContainer.classList.add('series-box');

                    // 텍스트(시리즈 이름) 추가
                    const textOverlay = document.createElement('div');
                    textOverlay.classList.add('series-text');
                    textOverlay.textContent = `Series ${seriesKey}`; // 시리즈 키 텍스트
                    boxContainer.appendChild(textOverlay);

                    // Cornerstone 박스 생성
                    const box = document.createElement('div');
                    box.classList.add('cornerstone-box');
                    boxContainer.appendChild(box);

                    cornerstone.enable(box);
                    const imageId = `wadouri:/dicom-file/${imagePaths[0]}`;
                    console.log("로드할 이미지 ID:", imageId); // 디버깅 로그

                    // 이미지 로드 및 표시
                    cornerstone.loadImage(imageId)
                        .then(image => {
                            cornerstone.displayImage(box, image);
                        })
                        .catch(err => console.error(`시리즈 ${seriesKey} 썸네일 로드 실패:`, err));

                    // 클릭 이벤트 추가
                    box.addEventListener("click", function () {
                        displayImageInDicomViewer(imagePaths[0]); // 클릭 시 DICOM 뷰어에 표시
                    });

                    container.appendChild(boxContainer); // 컨테이너에 박스 추가
                } else {
                    console.warn(`Series ${seriesKey}에 이미지가 없습니다.`);
                }
            });
        })
        .catch(err => console.error("썸네일 로드 중 오류 발생:", err));
}




// DICOM 뷰어에 이미지 표시
function displayImageInDicomViewer(imagePath) {
    const imageId = `wadouri:/dicom-file/${imagePath}`;
    const element = document.getElementById("dicomImage");
    cornerstone.enable(element);

    console.log("로드할 이미지 ID:", imageId); // 로드할 이미지 경로 확인

    cornerstone.loadImage(imageId)
        .then(image => {
            cornerstone.displayImage(element, image);
        })
        .catch(err => console.error("DICOM 이미지 로드 실패:", err));
}

