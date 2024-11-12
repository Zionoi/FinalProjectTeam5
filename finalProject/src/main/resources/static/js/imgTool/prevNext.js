// URL에서 studyKey와 seriesKey를 추출하는 함수
function getSeriesKeyFromURL() {
    const url = window.location.pathname; // 현재 URL 경로 가져오기
    const pathSegments = url.split('/'); // '/'로 경로 분할
    
    // 경로에서 studyKey와 seriesKey가 포함된 위치를 찾고 값 반환
    //const studyKey = pathSegments[pathSegments.indexOf('studies') + 1];
    const seriesKey = pathSegments[pathSegments.indexOf('series') + 1];
    
    return {  seriesKey };
}

// 추출된 seriesKey로 초기화
const {  seriesKey } = getSeriesKeyFromURL();
let currentSeriesKey = seriesKey; // 초기값을 URL에서 설정된 seriesKey로 설정


// 이전/다음 활성화 함수
function initializePrevNext(element) {

	// 이전 버튼
    document.getElementById('prevBtn').addEventListener('click', () => {
		fetch(`/images/studies/${studyKey}/series/${currentSeriesKey}/previous`)
        .then(response => response.json())
        .then(previousImages => {
            if (previousImages.length > 0) {
                loadImages(previousImages);
                currentSeriesKey = getPreviousSeriesKey(); // 이전 시리즈의 seriesKey 업데이트
            }
        })
        .catch(error => console.error('이전 시리즈 로드 중 오류 발생:', error));
    });
    
    // 다음 버튼
    document.getElementById('nextBtn').addEventListener('click', () => {
		fetch(`/images/studies/${studyKey}/series/${currentSeriesKey}/next`)
        .then(response => response.json())
        .then(nextImages => {
            if (nextImages.length > 0) {
                loadImages(nextImages);
                currentSeriesKey = getNextSeriesKey(); // 다음 시리즈의 seriesKey 업데이트
            }
        })
        .catch(error => console.error('다음 시리즈 로드 중 오류 발생:', error));
    });
    
    function loadImages(imagePaths) {
    const imageIds = imagePaths.map(filename => `wadouri:/dicom-file/${filename}`);
    const stack = {
        currentImageIdIndex: 0,
        imageIds: imageIds,
        preload: false
    };

    cornerstone.loadImage(imageIds[0]).then((image) => {
        cornerstone.displayImage(element, image);
        cornerstoneTools.addToolState(element, 'stack', stack);
    }).catch(err => console.error('이미지 로드 실패:', err));
}
   

}
