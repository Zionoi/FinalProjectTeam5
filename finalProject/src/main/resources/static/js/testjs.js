document.addEventListener('DOMContentLoaded', () => {
    // cornerstone 초기화
    if (typeof cornerstone === 'undefined' || typeof cornerstoneWADOImageLoader === 'undefined') {
        console.error("Cornerstone 또는 Cornerstone WADO Image Loader가 초기화되지 않았습니다.");
        return;
    }

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
    let playInterval = null; // 클립 재생을 위한 변수
    let playCheck = false; // 재생 상태를 나타내는 변수
    let toolCheck = false; // 주석 모드 상태를 나타내는 변수

    // 이미지를 로드하고 표시하는 함수
   function loadAndDisplayImage(filename) {
	    if (!filename) {
	        console.error("filename이 비어 있습니다.");
	        return;
	    }
		
	    const imageId = `wadouri:/dicom-file/${filename}`;
	    return cornerstone.loadImage(imageId).then(image => {
	        cornerstone.displayImage(element, image);
	
	        const viewport = cornerstone.getViewport(element);
	        document.getElementById('bottomright').textContent = "Zoom: " + viewport.scale + "x";
	        document.getElementById('bottomleft').textContent = "WW/WC:" + Math.round(viewport.voi.windowWidth)
	            + "/" + Math.round(viewport.voi.windowCenter);
	    }).catch(err => {
	        console.error('이미지 로드 실패:', err);
	    });
	}

    // 이미지를 인덱스로 업데이트하는 함수 (Promise 반환 추가)
    function updateTheImage(imageIndex) {
        return new Promise((resolve, reject) => {
            if (imageIndex >= 0 && imageIndex < totalImages) {
                currentIndex = imageIndex;
                const filename = imagePaths[currentIndex];
                if (!filename) {
                    console.error("Filename not found for current index:", currentIndex);
                    reject("Filename not found");
                    return;
                }
                /*const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;*/
				const imageId = `wadouri:/dicom-file/${filename}`;
				
                cornerstone.loadImage(imageId).then(image => {
                    cornerstone.displayImage(element, image);
                    resolve();
                }).catch(err => {
                    console.error("이미지 로드 실패:", err);
                    reject(err);
                });
            } else {
                reject("Invalid image index");
            }
        });
    }

    // 첫 번째 이미지를 로드하고, 로드 후 추가 이벤트 설정
    updateTheImage(0).then(function () {
        // 이미지가 로드된 후에 이벤트 핸들러 설정
        
     	
         // 주석 선택 옵션 이벤트
	    document.getElementById('annotateSelect').addEventListener('change', function () {
	        const selectedValue = this.value;
	        toolCheck = true;
	
	        if (selectedValue === 'angle') {
				cornerstoneTools.init();
	            const AngleTool = cornerstoneTools.AngleTool;
	            console.log('각도 함수 확인 : ', AngleTool);
	            cornerstoneTools.addTool(AngleTool);
	            cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 });
	            console.log("각도 도구 활성화됨");
	
	        } else if (selectedValue === 'arrow') {
				cornerstoneTools.init();
	            const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;
	            cornerstoneTools.addTool(ArrowAnnotateTool);
	            cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 });
	            console.log("화살표 주석 도구 활성화됨");
	
	        } else if (selectedValue === 'toolExit') {
				cornerstoneTools.init();
	            toolCheck = false;
	            cornerstoneTools.setToolDisabled('Angle');
	            cornerstoneTools.setToolDisabled('ArrowAnnotate');
	            console.log("주석 모드 비활성화됨");
	        }
	    });
	
	    // 이미지 조작 이벤트 핸들러 (주석 모드 활성화 시 이미지 조작 막기)
	    element.addEventListener('mousedown', function (e) {
	        if (toolCheck) return;
	        // 나머지 이미지 조작 관련 코드
	    });

        // 마우스 버튼에 따라 다른 동작 수행
        element.addEventListener('mousedown', function (e) {
            if (toolCheck) return; // 주석 모드 활성화 시 이미지 조작 막기

            let lastX = e.pageX;
            let lastY = e.pageY;
            const mouseButton = e.which; // 1: 왼쪽, 2: 가운데, 3: 오른쪽

            function mouseMoveHandler(e) {
                const deltaX = e.pageX - lastX;
                const deltaY = e.pageY - lastY;
                lastX = e.pageX;
                lastY = e.pageY;

                let viewport = cornerstone.getViewport(element);

                if (mouseButton === 1) {  // 왼쪽 클릭 - 윈도우/레벨 조절
                    viewport.voi.windowWidth += (deltaX / viewport.scale);
                    viewport.voi.windowCenter += (deltaY / viewport.scale);
                    cornerstone.setViewport(element, viewport);
                } else if (mouseButton === 2) {  // 가운데 클릭 - 이미지 이동
                    viewport.translation.x += (deltaX / viewport.scale);
                    viewport.translation.y += (deltaY / viewport.scale);
                    cornerstone.setViewport(element, viewport);
                } else if (mouseButton === 3) {  // 오른쪽 클릭 - 이미지 줌
                    viewport.scale += (deltaY / 100);
                    cornerstone.setViewport(element, viewport);
                }
            }

            function mouseUpHandler() {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            }

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

        // 플레이클립 버튼 클릭 이벤트 추가
        document.getElementById('playClipBtn').addEventListener('click', function () {
            if (toolCheck) return; // 주석 모드 활성화 시 클립 재생 막기

            if (playInterval) {
                // 재생 중이면 중지
                clearInterval(playInterval);
                playInterval = null;
                playCheck = false;
            } else {
                // 재생 시작
                playCheck = true;
                playInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalImages; // 순환 재생
                    updateTheImage(currentIndex);
                }, 50); // 50ms 간격으로 이미지 변경
            }
        });

        // 마우스 휠 이벤트로 이미지 전환
        element.addEventListener('wheel', function (e) {
            if (toolCheck) return; // 주석 모드 활성화 시 이미지 전환 막기
            e.preventDefault();
            
            console.log('deltaY:', e.deltaY);

            if (e.deltaY > 0 && currentIndex < totalImages - 1) {
                currentIndex += 1;
            } else if (e.deltaY < 0 && currentIndex > 0) {
                currentIndex -= 1;
            }
            loadAndDisplayImage(imagePaths[currentIndex]);
        }, { passive: false });

        // 기타 버튼 이벤트 핸들러 추가 (toolCheck가 활성화되면 동작하지 않음)
        document.getElementById('x256').addEventListener('click', function () {
            if (toolCheck) return;
            element.style.width = '256px';
            element.style.height = '256px';
            cornerstone.resize(element);
        });

        document.getElementById('x512').addEventListener('click', function () {
            if (toolCheck) return;
            element.style.width = '512px';
            element.style.height = '512px';
            cornerstone.resize(element);
        });

        document.getElementById('invert').addEventListener('click', function () {
            if (toolCheck) return;
            const viewport = cornerstone.getViewport(element);
            viewport.invert = !viewport.invert;
            cornerstone.setViewport(element, viewport);
        });

        document.getElementById('interpolation').addEventListener('click', function () {
            if (toolCheck) return;
            const viewport = cornerstone.getViewport(element);
            viewport.pixelReplication = !viewport.pixelReplication;
            cornerstone.setViewport(element, viewport);
        });

        document.getElementById('hflip').addEventListener('click', function () {
            if (toolCheck) return;
            const viewport = cornerstone.getViewport(element);
            viewport.hflip = !viewport.hflip;
            cornerstone.setViewport(element, viewport);
        });

        document.getElementById('vflip').addEventListener('click', function () {
            if (toolCheck) return;
            const viewport = cornerstone.getViewport(element);
            viewport.vflip = !viewport.vflip;
            cornerstone.setViewport(element, viewport);
        });

        document.getElementById('rotate').addEventListener('click', function () {
            if (toolCheck) return;
            const viewport = cornerstone.getViewport(element);
            viewport.rotation += 90;
            cornerstone.setViewport(element, viewport);
        });

        element.addEventListener('mousemove', function (event) {
            const pixelCoords = cornerstone.pageToPixel(element, event.pageX, event.pageY);
            document.getElementById('coords').textContent = "pageX=" + event.pageX + ", pageY=" + event.pageY + ", pixelX=" + pixelCoords.x + ", pixelY=" + pixelCoords.y;
        });
    }).catch(err => {
        console.error("첫 번째 이미지 로드 중 오류 발생:", err);
    });
});
