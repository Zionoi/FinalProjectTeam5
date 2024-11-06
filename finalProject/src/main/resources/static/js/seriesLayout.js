// 시리즈 레이아웃 버튼과 드롭다운 초기화 함수
function initializeSeriesLayout() {
    const seriesLayoutBtn = document.getElementById('seriesLayoutBtn');
    const seriesDropdown = document.getElementById('seriesDropdown');

    if (seriesLayoutBtn) {
        // 시리즈 레이아웃 버튼 클릭 이벤트 추가
        seriesLayoutBtn.addEventListener('click', function () {
            seriesDropdown.style.display = seriesDropdown.style.display === 'block' ? 'none' : 'block';
            console.log("Series Layout Dropdown Toggled");
        });
    } else {
        console.error("Series Layout 버튼을 찾을 수 없습니다.");
    }
}

// 시리즈 드롭다운을 토글하는 함수 (중복 방지용으로 별도 함수로 분리)
function toggleSeriesDropdown() {
    const seriesDropdown = document.getElementById('seriesDropdown');
    const dropdown = document.getElementById('dropdown');

    seriesDropdown.style.display = seriesDropdown.style.display === 'block' ? 'none' : 'block';
    dropdown.style.display = 'none';  // 이미지 레이아웃 드롭다운 숨김

    if (seriesDropdown.style.display === 'none') {
        resetGridSelection();  // 드롭다운이 닫힐 때 그리드 초기화
    }
    console.log("Series Layout Dropdown Toggled");
}

// 이미지 레이아웃 버튼 비활성화 함수
function disableImageLayoutButton() {
    const imgLayoutBtn = document.getElementById('imgLayoutBtn');
    if (imgLayoutBtn) imgLayoutBtn.disabled = true;
}

// 이미지 레이아웃 버튼 활성화 함수
function enableImageLayoutButton() {
    const imgLayoutBtn = document.getElementById('imgLayoutBtn');
    if (imgLayoutBtn) imgLayoutBtn.disabled = false;
}

/*// 드롭다운에서 선택된 행과 열로 레이아웃을 적용하기 위한 그리드 생성
const seriesGridSelector = document.getElementById('series-grid-selector');

if (seriesGridSelector) { // 요소가 존재하는지 확인
    seriesGridSelector.innerHTML = ''; // 기존 요소 제거하여 중복 방지
    for (let row = 1; row <= 5; row++) {
        for (let col = 1; col <= 5; col++) {
            const gridOption = document.createElement('div');
            gridOption.classList.add('grid-option');
            gridOption.dataset.row = row;
            gridOption.dataset.col = col;

            // 그리드 옵션에 호버 기능 추가
            gridOption.addEventListener('mouseover', function () {
                highlightGridSelection(row, col);
            });

            // 그리드 옵션 클릭 시 선택한 행과 열로 시리즈 레이아웃 생성
            gridOption.addEventListener('click', function () {
                const selectedRows = parseInt(gridOption.dataset.row);
                const selectedCols = parseInt(gridOption.dataset.col);
                applySeriesGridLayout(selectedRows, selectedCols); // 선택된 행과 열로 레이아웃 적용
            });

            seriesGridSelector.appendChild(gridOption);
        }
    }
} else {
    console.error("seriesGridSelector 요소를 찾을 수 없습니다. HTML 파일에서 'seriesGridSelector' ID를 확인하세요.");
}
*/

// 드롭다운에서 선택된 행과 열에 맞춰 시리즈 레이아웃을 적용하기 위한 그리드 생성
function setupSeriesGridSelector() {
    const seriesGridSelector = document.getElementById('series-grid-selector');

    if (seriesGridSelector) { 
        seriesGridSelector.innerHTML = ''; // 기존 요소 제거하여 중복 방지
        for (let row = 1; row <= 5; row++) {
            for (let col = 1; col <= 5; col++) {
                const gridOption = document.createElement('div');
                gridOption.classList.add('grid-option');
                gridOption.dataset.row = row;
                gridOption.dataset.col = col;

                // 호버 시 선택된 셀 강조 표시
                gridOption.addEventListener('mouseover', function () {
                    highlightGridSelection(row, col);
                });

                // 클릭 시 해당 행과 열로 레이아웃 적용
                gridOption.addEventListener('click', function () {
                    const selectedRows = parseInt(gridOption.dataset.row);
                    const selectedCols = parseInt(gridOption.dataset.col);
                    applySeriesGridLayout(selectedRows, selectedCols);
                    seriesDropdown.style.display = 'none'; // 드롭다운 닫기
                });

                seriesGridSelector.appendChild(gridOption);
            }
        }
    } else {
        console.error("seriesGridSelector 요소를 찾을 수 없습니다.");
    }
}

// 선택된 그리드 강조 표시 함수
function highlightGridSelection(rows, cols) {
    const gridItems = document.querySelectorAll('.grid-option');
    gridItems.forEach(item => {
        const itemRow = parseInt(item.dataset.row);
        const itemCol = parseInt(item.dataset.col);
        item.classList.toggle('selected', itemRow <= rows && itemCol <= cols);
    });
}

// 시리즈 이미지 레이아웃 생성 함수
function generateSeriesLayout(rows, cols, seriesImagesMap) {
    const gridContainer = document.getElementById('dicomImage');
    gridContainer.innerHTML = '';  // 기존 그리드 초기화
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    disableImageLayoutButton(); // 시리즈 레이아웃 선택 시 이미지 레이아웃 버튼 비활성화

    const totalCells = rows * cols;
    let currentIndex = 0;

    Object.keys(seriesImagesMap).slice(0, totalCells).forEach((seriesKey, index) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);

        cornerstone.enable(gridItem);

        const imagePaths = seriesImagesMap[seriesKey];
        if (imagePaths && imagePaths.length > 0) {
            let filename = imagePaths[currentIndex % imagePaths.length];
            
            if (filename instanceof HTMLElement) {
                console.error("filename이 HTML 요소로 전달되었습니다. 텍스트로 변환합니다.");
                filename = filename.textContent || filename.value || "";
            }
            
            if (filename && typeof filename === 'string') {
                loadAndDisplayImage(gridItem, filename, seriesKey);
            } else {
                console.error("올바른 경로가 아닌 filename:", filename);
                gridItem.style.backgroundColor = 'black';
            }

            // 마우스 휠 이벤트로 이미지 전환
            gridItem.addEventListener('wheel', (event) => {
                event.preventDefault();
                currentIndex = (currentIndex + (event.deltaY > 0 ? 1 : -1) + imagePaths.length) % imagePaths.length;
                loadAndDisplayImage(gridItem, imagePaths[currentIndex], seriesKey);
            });

            // 더블클릭 이벤트로 1x1 레이아웃 전환 및 이미지 레이아웃 버튼 활성화
            gridItem.addEventListener('dblclick', () => {
                applySingleSeriesLayout(seriesKey);
                enableImageLayoutButton(); // 더블클릭 시 이미지 레이아웃 버튼 활성화
            });
        } else {
            gridItem.style.backgroundColor = 'black';
            console.warn(`No images found for seriesKey: ${seriesKey}. Cell will display black background.`);
        }
    });
}

// 셀에 이미지를 로드하고 표시하는 함수
function loadAndDisplayImage(gridItem, filename, seriesKey) {
    if (filename instanceof HTMLElement) {
        console.error("filename이 HTML 요소로 전달되었습니다. 올바른 문자열 값을 전달해야 합니다.");
        filename = filename.textContent || filename.value || ""; // 텍스트 내용으로 변경
    }

    if (!filename || typeof filename !== 'string') {
        console.error("Invalid filename:", filename);
        return;
    }

    const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;
    console.log("Loading image with ID:", imageId);

    cornerstone.loadImage(imageId).then(image => {
        cornerstone.displayImage(gridItem, image);
        console.log(`Displayed image for seriesKey: ${seriesKey}, imageId: ${imageId}`);
    }).catch(err => {
        console.error(`Failed to load image for seriesKey ${seriesKey}:`, err);
        gridItem.style.backgroundColor = 'black';
    });
}

// 시리즈 레이아웃 드롭다운에서 행과 열 선택 및 적용
function applySeriesGridLayout(rows, cols) {
    const { studyKey } = getStudyAndSeriesKeyFromURL();

    if (!studyKey) {
        console.error("studyKey가 URL에서 찾을 수 없습니다.");
        return;
    }

    fetchImagesAndGenerateLayout(rows, cols);
}

// 시리즈 이미지 데이터를 가져와서 레이아웃 생성 함수 호출
async function fetchImagesAndGenerateLayout(rows, cols) {
    const { studyKey } = getStudyAndSeriesKeyFromURL();

    if (!studyKey) {
        console.error("studyKey가 URL에서 찾을 수 없습니다.");
        return;
    }

    try {
        const response = await fetch(`/studies/${studyKey}/series-images?seriesKeys=${seriesKeys.join(',')}`);
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const seriesImagesMap = await response.json();
        console.log("Fetched series images map:", seriesImagesMap);

        generateSeriesLayout(rows, cols, seriesImagesMap);
    } catch (error) {
        console.error('Error fetching series images:', error);
    }
}

// 선택된 시리즈에 대해 1x1 레이아웃을 적용하는 함수
function applySingleSeriesLayout(seriesKey) {
    const gridContainer = document.getElementById('dicomImage');
    
    // 기존 컨텐츠 초기화 (내부에 중복된 div가 생기지 않도록)
    gridContainer.innerHTML = '';
    gridContainer.style.display = 'block';  // 1x1 레이아웃 설정을 위해 display 스타일을 단순화

    // cornerstone 활성화 - 중복 활성화를 방지하기 위해 gridContainer가 이미 활성화되었는지 확인
    if (!cornerstone.getEnabledElement(gridContainer)) {
        cornerstone.enable(gridContainer);
    }

    const { studyKey } = getStudyAndSeriesKeyFromURL();
    if (!studyKey) {
        console.error("studyKey가 URL에서 찾을 수 없습니다.");
        return;
    }

    // HTML 형식의 응답을 요청하여 이미지 로드
    fetch(`/images/studies/${studyKey}/series/${seriesKey}`, {
        headers: { 'Accept': 'text/html' }  // HTML 형식으로 응답 요청
    })
    .then(response => {
        if (!response.ok) throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        return response.text();  // HTML 형식을 텍스트로 변환
    })
    .then(html => {
        // HTML 응답을 gridContainer에 삽입하여 렌더링
        gridContainer.innerHTML = html;
        console.log(`Displayed HTML content for seriesKey: ${seriesKey}`);
    })
    .catch(error => {
        console.error(`Error fetching HTML content for series ${seriesKey}:`, error);
        gridContainer.style.backgroundColor = 'black';  // 에러 발생 시 배경을 검정으로 설정
    })
    .finally(() => {
        enableImageLayoutButton(); // 더블클릭하여 1x1 레이아웃 적용 시 이미지 레이아웃 버튼 활성화
        console.log(`Single series layout applied for seriesKey ${seriesKey} with 1x1 grid.`);
    });
}

// 초기화 호출
initializeSeriesLayout();
setupSeriesGridSelector();
