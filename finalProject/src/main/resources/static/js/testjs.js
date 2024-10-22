document.addEventListener('DOMContentLoaded', () => {

    // Cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;

    const element = document.getElementById('dicomImage');
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
});
