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

    // 이미지 스택 정의
    const imageIds = imagePaths.map(filename => `wadouri:http://localhost:8080/dicom-file/${filename}`);
    const stack = {
        currentImageIdIndex: 0,
        imageIds: imageIds
    };

    // 첫 번째 이미지를 로드하고 스택 상태 설정
    cornerstone.loadImage(imageIds[0]).then((image) => {
        cornerstone.displayImage(element, image);
        cornerstoneTools.addStackStateManager(element, ['stack']);
        cornerstoneTools.addToolState(element, 'stack', stack);
    }).catch(err => {
        console.error('첫 번째 이미지 로드 실패:', err);
    });

    // StackScrollTool 추가 및 마우스 휠로 활성화
    const StackScrollTool = cornerstoneTools.StackScrollTool;
    cornerstoneTools.addTool(StackScrollTool);

    // `MouseWheel` 이벤트로 StackScrollTool 활성화
    cornerstoneTools.setToolActive('StackScroll', { bindings: [{ mouseButtonMask: 'MouseWheel' }] });

    console.log("StackScrollTool 활성화 완료 - 마우스 휠 사용");


	  element.addEventListener('mousedown', function (e) {
        let lastX = e.pageX;
        let lastY = e.pageY;

        function mouseMoveHandler(e) {
            const deltaX = e.pageX - lastX;
            const deltaY = e.pageY - lastY;
            lastX = e.pageX;
            lastY = e.pageY;
            console.log('드래그 확인 :',deltaX,deltaY)

            let viewport = cornerstone.getViewport(element);
            viewport.voi.windowWidth += (deltaX / viewport.scale);
            viewport.voi.windowCenter += (deltaY / viewport.scale);
            cornerstone.setViewport(element, viewport);

            document.getElementById('bottomleft').textContent = "WW/WC:" + Math.round(viewport.voi.windowWidth)
                + "/" + Math.round(viewport.voi.windowCenter);
        }

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });



});













//이슬님 코드
/*document.addEventListener('DOMContentLoaded', () => {
	
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

    // 이미지 스택 정의
    const imageIds = imagePaths.map(filename => `wadouri:http://localhost:8080/dicom-file/${filename}`);
    const stack = {
        currentImageIdIndex: 0,
        imageIds: imageIds
    };

    // 첫 번째 이미지를 로드하고 스택 상태 설정
    cornerstone.loadImage(imageIds[0]).then((image) => {
        cornerstone.displayImage(element, image);
        cornerstoneTools.addStackStateManager(element, ['stack']);
        cornerstoneTools.addToolState(element, 'stack', stack);
    }).catch(err => {
        console.error('첫 번째 이미지 로드 실패:', err);
    });

    // StackScrollTool 추가 및 마우스 휠로 활성화
    const StackScrollTool = cornerstoneTools.StackScrollTool;
    cornerstoneTools.addTool(StackScrollTool);

    // `MouseWheel` 이벤트로 StackScrollTool 활성화
    cornerstoneTools.setToolActive('StackScroll', { bindings: [{ mouseButtonMask: 'MouseWheel' }] });

    console.log("StackScrollTool 활성화 완료 - 마우스 휠 사용");
});
*/
<<<<<<< HEAD
<<<<<<< HEAD



=======
  
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
=======
  
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
