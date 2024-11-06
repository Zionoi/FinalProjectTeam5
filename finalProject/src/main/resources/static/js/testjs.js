document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
<<<<<<< HEAD
	
	// cornerstone 초기화 함수 호출
    initializeCornerstoneTools();
    
    // cornerstone 및 cornerstoneTools 초기화
    if (typeof cornerstone === 'undefined' || typeof cornerstoneWADOImageLoader === 'undefined') {
        console.error("Cornerstone 또는 Cornerstone WADO Image Loader가 초기화되지 않았습니다.");
        return;
    }
=======
=======

    // Cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
>>>>>>> parent of 545421c (이미지 레이아웃, 시리즈 레이아웃, 회전 기능 수정중)

    // Cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
>>>>>>> parent of 545421c (이미지 레이아웃, 시리즈 레이아웃, 회전 기능 수정중)

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
	cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.init();
    
    const element = document.getElementById('dicomImage');
<<<<<<< HEAD
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


=======
    cornerstone.enable(element);

    let currentIndex = 0;  // 현재 이미지 인덱스 초기화
    const totalImages = imagePaths.length;  // 전체 이미지 개수

    // 이미지 ID 배열 생성
    const imageIds = imagePaths.map(filename => `wadouri:http://localhost:8080/dicom-file/${filename}`);

    // 첫 번째 이미지를 로드
    loadAndDisplayImage(currentIndex);

    function loadAndDisplayImage(index) {
        if (index >= 0 && index < totalImages) {
            currentIndex = index;
            const imageId = imageIds[currentIndex];
            console.log("로딩할 imageId :: ", imageId);

            cornerstone.loadImage(imageId).then(image => {
                cornerstone.displayImage(element, image);
                console.log("cornerstone.getViewport(element) :", cornerstone.getViewport(element));
            }).catch(err => {
                console.error('이미지 로드 실패:', err);
            });
        } else {
            console.error('유효하지 않은 인덱스입니다:', index);
        }
    }

    // 이미지 변경 함수
    function updateTheImage(index) {
        loadAndDisplayImage(index);
    }

    // 초기 이미지 로드
    updateTheImage(0);
>>>>>>> parent of 545421c (이미지 레이아웃, 시리즈 레이아웃, 회전 기능 수정중)

    // 이미지 버튼 이벤트 핸들러 추가
    document.getElementById('imageButton1').addEventListener('click', function (e) {
        updateTheImage(0);
    });

    document.getElementById('imageButton2').addEventListener('click', function (e) {
        updateTheImage(1);
    });

    const wheelEvents = ['mousewheel', 'DOMMouseScroll'];

    wheelEvents.forEach((eventType) => {
        element.addEventListener(eventType, function (e) {
            e.preventDefault();

            // 마우스 휠 방향에 따라 이미지 인덱스 변경
            let delta = e.wheelDelta || -e.detail;
            if (delta > 0) {
                // 휠 업
                if (currentIndex > 0) {
                    updateTheImage(currentIndex - 1);
                }
            } else {
                // 휠 다운
                if (currentIndex < totalImages - 1) {
                    updateTheImage(currentIndex + 1);
                }
            }

            return false; // 페이지 스크롤 방지
        });
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
<<<<<<< HEAD
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
=======
    cornerstone.enable(element);

    let currentIndex = 0;  // 현재 이미지 인덱스 초기화
    const totalImages = imagePaths.length;  // 전체 이미지 개수

    // 이미지 ID 배열 생성
    const imageIds = imagePaths.map(filename => `wadouri:http://localhost:8080/dicom-file/${filename}`);

    // 첫 번째 이미지를 로드
    loadAndDisplayImage(currentIndex);

    function loadAndDisplayImage(index) {
        if (index >= 0 && index < totalImages) {
            currentIndex = index;
            const imageId = imageIds[currentIndex];
            console.log("로딩할 imageId :: ", imageId);

            cornerstone.loadImage(imageId).then(image => {
                cornerstone.displayImage(element, image);
                console.log("cornerstone.getViewport(element) :", cornerstone.getViewport(element));
            }).catch(err => {
                console.error('이미지 로드 실패:', err);
            });
        } else {
            console.error('유효하지 않은 인덱스입니다:', index);
        }
    }

    // 이미지 변경 함수
    function updateTheImage(index) {
        loadAndDisplayImage(index);
    }

    // 초기 이미지 로드
    updateTheImage(0);

    // 이미지 버튼 이벤트 핸들러 추가
    document.getElementById('imageButton1').addEventListener('click', function (e) {
        updateTheImage(0);
    });

    document.getElementById('imageButton2').addEventListener('click', function (e) {
        updateTheImage(1);
    });

    const wheelEvents = ['mousewheel', 'DOMMouseScroll'];

    wheelEvents.forEach((eventType) => {
        element.addEventListener(eventType, function (e) {
            e.preventDefault();

            // 마우스 휠 방향에 따라 이미지 인덱스 변경
            let delta = e.wheelDelta || -e.detail;
            if (delta > 0) {
                // 휠 업
                if (currentIndex > 0) {
                    updateTheImage(currentIndex - 1);
                }
            } else {
                // 휠 다운
                if (currentIndex < totalImages - 1) {
                    updateTheImage(currentIndex + 1);
                }
            }

            return false; // 페이지 스크롤 방지
        });
    });
>>>>>>> parent of 545421c (이미지 레이아웃, 시리즈 레이아웃, 회전 기능 수정중)
});
*/
<<<<<<< HEAD
<<<<<<< HEAD



=======
  
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
=======
  
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
