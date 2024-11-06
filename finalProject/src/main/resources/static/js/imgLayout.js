cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;


// URL에서 studyKey와 seriesKey를 가져오는 함수 추가
function getStudyAndSeriesKeyFromURL() {
    const urlPath = window.location.pathname.split('/');
    const studyKey = urlPath.includes('studies') ? urlPath[urlPath.indexOf('studies') + 1] : null;
    const urlParams = new URLSearchParams(window.location.search);
    const seriesKey = urlParams.get('seriesKey');
    return { studyKey, seriesKey };
}



// 전역 변수 설정
let seriesKeys = ["1", "2", "3"];
const urlParams = new URLSearchParams(window.location.search);
const urlSeriesKeys = urlParams.get('seriesKeys') ? urlParams.get('seriesKeys').split(',') : [];

// 이미지 레이아웃 초기화 함수
function initializeImageLayout() {
    const imgLayoutBtn = document.getElementById('imgLayoutBtn');
    const dropdown = document.getElementById('dropdown');
    const seriesDropdown = document.getElementById('seriesDropdown');

    function toggleImageDropdown() {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        seriesDropdown.style.display = 'none';  // 시리즈 드롭다운 숨김
        
        if (dropdown.style.display === 'none') {
	        resetGridSelection();  // 드롭다운이 닫힐 때 그리드 초기화
	    }
        console.log("Image Layout Dropdown Toggled");
    }

    if (imgLayoutBtn) {
        imgLayoutBtn.addEventListener('click', toggleImageDropdown);
    }

    console.log("Image Layout Initialized");
}



// 첫 번째 이미지를 로드하는 함수 수정
function loadFirstImageForSeries(seriesKey) {
    const { studyKey } = getStudyAndSeriesKeyFromURL();

    if (!studyKey || !seriesKey) {
        console.error("studyKey 또는 seriesKey가 URL에서 찾을 수 없습니다.");
        return;
    }

    // fetch 대신 URL로 리디렉션하여 HTML 페이지를 표시
    const url = `/images/studies/${studyKey}/series/${seriesKey}`;
    window.location.href = url; // HTML 페이지로 이동
}


document.addEventListener('DOMContentLoaded', () => {
    // cornerstone 초기화
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;

    const element = document.getElementById('dicomImage');
    cornerstone.enable(element);
    
    // URL에서 seriesKey 가져오기
    const { studyKey, seriesKey } = getStudyAndSeriesKeyFromURL();
	if (!seriesKey) {
	    console.warn("Series key not found in URL. 기본 레이아웃을 적용합니다.");
	    // 기본 레이아웃을 호출하거나 에러 메시지를 표시
	} else {
	    loadFirstImageForSeries(seriesKey);
	}

    let currentIndex = 0;  // 현재 이미지 인덱스 초기화
    const totalImages = imagePaths.length;  // 전체 이미지 개수
    let gridSize = { rows: 1, cols: 1 };  // 그리드 사이즈 정보
    
    // loadAndDisplayImage 함수 정의 (또는 기존 함수를 대체)
    function loadAndDisplayImage(gridItem, filename, seriesKey) {
		
		if (filename instanceof HTMLElement) {
	        console.error("filename이 HTML 요소로 전달되었습니다. 텍스트로 변환을 시도합니다.");
	        filename = filename.textContent || filename.value || "";
	    }
	
	    // 유효한 filename 값 확인
	    if (!filename || typeof filename !== 'string' || filename === "undefined") {
	        console.error("Invalid filename:", filename);
	        return;
	    }

        const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;
	    cornerstone.loadImage(imageId).then(image => {
	        cornerstone.displayImage(gridItem, image);
	    }).catch(err => {
	        console.error(`Failed to load image for seriesKey ${seriesKey}:`, err);
	        gridItem.style.backgroundColor = 'black';
	    });
    }

    // 첫 번째 이미지를 로드
    if (totalImages > 0) {
        loadAndDisplayImage(imagePaths[currentIndex]);
    }

    // 그리드 레이아웃 생성 및 이미지 로드
    function generateImageGrid(rows, cols) {
        gridSize = { rows, cols };  // 현재 그리드 사이즈 저장
        const gridContainer = document.getElementById('dicomImage');
        gridContainer.innerHTML = '';  // 기존의 그리드를 초기화

        // 선택한 행과 열에 맞춰 그리드 레이아웃 설정
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // 각 셀에 이미지를 로드하여 배치
        for (let i = 0; i < rows * cols; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.style.width = '100%';
            gridItem.style.height = '100%';
            gridContainer.appendChild(gridItem);

            cornerstone.enable(gridItem);

            if (i < totalImages) {
                //const imageId = `wadouri:http://localhost:8080/dicom-file/${imagePaths[(currentIndex + i) % totalImages]}`;
                const imageId = `wadouri:http://localhost:8080/dicom-file/${imagePaths[i % imagePaths.length]}`;
                console.log("이미지 로드 경로:", imageId);

                cornerstone.loadImage(imageId).then(image => {
                    cornerstone.displayImage(gridItem, image);
                }).catch(err => {
                    console.error('이미지 로드 실패:', err);
                });
            } else {
                gridItem.style.backgroundColor = 'black';
            }
        }
    }

    // 다음 이미지를 로드하는 함수
    function loadNextImages() {
        if (currentIndex + gridSize.rows * gridSize.cols < totalImages) {
            currentIndex = (currentIndex + gridSize.rows * gridSize.cols) % totalImages;
            generateImageGrid(gridSize.rows, gridSize.cols);
        }
    }

    // 이전 이미지를 로드하는 함수
    function loadPrevImages() {
        if (currentIndex - gridSize.rows * gridSize.cols >= 0) {
            currentIndex = (currentIndex - gridSize.rows * gridSize.cols + totalImages) % totalImages;
            generateImageGrid(gridSize.rows, gridSize.cols);
        }
    }

    // 그리드 선택 및 적용
    const imgGridSelector = document.getElementById('grid-selector');
    
    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 5; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-selector-item');
            gridItem.dataset.row = i;
            gridItem.dataset.col = j;

            gridItem.addEventListener('mouseover', function () {
                highlightGridSelection(i, j);
            });

            gridItem.addEventListener('click', function () {
                const rows = parseInt(gridItem.dataset.row);
                const cols = parseInt(gridItem.dataset.col);
                generateImageGrid(rows, cols);
                document.getElementById('dropdown').style.display = 'none';
                resetGridSelection();
            });

            imgGridSelector.appendChild(gridItem);
        }
    }

    function highlightGridSelection(rows, cols) {
        const gridItems = document.querySelectorAll('.grid-selector-item');
        gridItems.forEach(item => {
            const itemRow = parseInt(item.dataset.row);
            const itemCol = parseInt(item.dataset.col);
            item.classList.toggle('selected', itemRow <= rows && itemCol <= cols);
        });
    }

    function resetGridSelection() {
        document.querySelectorAll('.grid-selector-item').forEach(item => item.classList.remove('selected'));
    }

    // 기본 1x1 그리드로 시작
    generateImageGrid(1, 1);

   // 이미지 전환 기능 추가
	/*element.addEventListener('wheel', (event) => {
	    event.preventDefault();
	    console.log('deltaY:', event.deltaY);
	
	    if (event.deltaY > 0) {
	        currentIndex = (currentIndex + 1) % totalImages;
	    } else {
	        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
	    }
	
	    const nextImagePath = imagePaths[currentIndex];
	    loadAndDisplayImage(nextImagePath);
	});*/
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
