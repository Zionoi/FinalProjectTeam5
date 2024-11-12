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
    //cornerstoneTools.init();

    const element = document.getElementById('dicomImage');
    if (!element) {
        console.error("dicomImage 요소를 찾을 수 없습니다.");
        return;
    }
    cornerstone.enable(element);
    
	cornerstoneTools.init();


	// 이동
	
	// 확대
	cornerstoneTools.addTool(cornerstoneTools.ZoomTool, {
	  // Optional configuration
	  configuration: {
	    invert: false,
	    preventZoomOutsideImage: false,
	    minScale: .1,
	    maxScale: 20.0,
	  }
	});
	
	cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 })

    // 돋보기
    const MagnifyTool = cornerstoneTools.MagnifyTool;
	cornerstoneTools.addTool(MagnifyTool);
	// 회전
	cornerstoneTools.addTool(cornerstoneTools.RotateTool);
	
	// 주석
	cornerstoneTools.addTool(cornerstoneTools.AngleTool);
	cornerstoneTools.addTool(cornerstoneTools.ArrowAnnotateTool);
	cornerstoneTools.addTool(cornerstoneTools.BidirectionalTool);
	cornerstoneTools.addTool(cornerstoneTools.CobbAngleTool);
	cornerstoneTools.addTool(cornerstoneTools.EllipticalRoiTool);
	cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);
	cornerstoneTools.addTool(cornerstoneTools.LengthTool);
	cornerstoneTools.addTool(cornerstoneTools.ProbeTool);
	cornerstoneTools.addTool(cornerstoneTools.RectangleRoiTool);
	cornerstoneTools.addTool(cornerstoneTools.TextMarkerTool);

    
	console.log('테스트js imagePaths : ', imagePaths[0]);
	
    // 이미지 스택 정의
    const imageIds = imagePaths.map(filename => `wadouri:/dicom-file/${filename}`);
    const stack = {
        currentImageIdIndex: 0,
        imageIds: imageIds,
        preload: false	// 프리로딩을 비활성화
    };
	console.log('테스트js imageIds : ', imageIds[0]);
	
    // 첫 번째 이미지를 로드하고 스택 상태 설정
    cornerstone.loadImage(imageIds[0]).then((image) => {
        cornerstone.displayImage(element, image);
        cornerstoneTools.addStackStateManager(element, ['stack']);
        cornerstoneTools.addToolState(element, 'stack', stack);
    }).catch(err => {
        console.error('첫 번째 이미지 로드 실패:', err);
    });

    // StackScrollTool 추가 및 활성화
    const StackScrollTool = cornerstoneTools.StackScrollMouseWheelTool;  // StackScrollTool 대신 StackScrollMouseWheelTool 사용
    cornerstoneTools.addToolForElement(element, StackScrollTool); // addTool 대신 addToolForElement 사용
    cornerstoneTools.setToolActiveForElement(element, 'StackScrollMouseWheel', {}); // setToolActive 대신 setToolActiveForElement 사용

    console.log("StackScrollTool 활성화 완료 - 마우스 휠 사용");
});