// 이전/다음 활성화 함수
function initializePrevNext(element) {
    // URL에서 studyKey와 seriesKey를 추출하는 함수
    function getKeysFromURL() {
        const url = window.location.pathname; // 현재 URL 경로 가져오기
        const pathSegments = url.split('/'); // '/'로 경로 분할

        // 'studies'와 'series' 키워드의 위치를 기반으로 studyKey와 seriesKey 추출
        const studyKeyIndex = pathSegments.indexOf('studies') + 1; // 'studies' 다음 값이 studyKey
        const seriesKeyIndex = pathSegments.indexOf('series') + 1; // 'series' 다음 값이 seriesKey

        // 추출된 키 반환
        return {
            studyKey: pathSegments[studyKeyIndex],
            seriesKey: pathSegments[seriesKeyIndex]
        };
    }

    // 초기화
    const { studyKey, seriesKey } = getKeysFromURL();
    let currentSeriesIndex = seriesKeys.indexOf(seriesKey); // 현재 시리즈의 인덱스 계산
    if (currentSeriesIndex === -1) {
        console.warn('현재 seriesKey가 seriesKeys 배열에 없습니다. 기본값으로 설정합니다.');
        currentSeriesIndex = 0;
    }

    // 이전 버튼 이벤트 리스너
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentSeriesIndex > 0) {
            currentSeriesIndex -= 1;
            const previousSeriesKey = seriesKeys[currentSeriesIndex];
            console.log("Previous Series Key:", previousSeriesKey);
            window.location.href = `/images/studies/${studyKey}/series/${previousSeriesKey}`;
        } else {
            console.log('이전 시리즈가 없습니다.');
        }
    });

    // 다음 버튼 이벤트 리스너
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentSeriesIndex < seriesKeys.length - 1) {
            currentSeriesIndex += 1;
            const nextSeriesKey = seriesKeys[currentSeriesIndex];
            console.log("Next Series Key:", nextSeriesKey);
            window.location.href = `/images/studies/${studyKey}/series/${nextSeriesKey}`;
        } else {
            console.log('다음 시리즈가 없습니다.');
        }
    });

    // 이미지를 가져와 로드하는 함수
    function fetchImages(seriesKey) {
        fetch(`/images/studies/${studyKey}/series/${seriesKey}`)
            .then(response => {
                if (!response.ok) {
                    console.error('HTTP 상태 코드:', response.status, response.statusText);
                    return response.text().then(text => {
                        console.error('서버에서 반환된 HTML:', text);
                        throw new Error('서버 응답이 JSON이 아닙니다.');
                    });
                }
                return response.json();
            })
            .then(imagePaths => {
                if (imagePaths.length > 0) {
                    loadImages(imagePaths);
                } else {
                    console.log('이미지를 찾을 수 없습니다.');
                }
            })
            .catch(error => console.error('이미지 로드 중 오류 발생:', error));
    }

    // 이미지를 로드하는 함수
    function loadImages(imagePaths) {
        const imageIds = imagePaths.map(filename => `wadouri:/dicom-file/${filename}`);
        const stack = {
            currentImageIdIndex: currentImageIndex,
            imageIds: imageIds,
            preload: false
        };

        cornerstone.loadImage(imageIds[0]).then(image => {
            cornerstone.displayImage(element, image);
            cornerstoneTools.addToolState(element, 'stack', stack);
        }).catch(err => console.error('이미지 로드 실패:', err));
    }
}
