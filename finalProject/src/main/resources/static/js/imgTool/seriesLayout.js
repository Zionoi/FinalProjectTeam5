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

// 시리즈 레이아웃 드롭다운에서 행과 열 선택 및 적용
function applySeriesGridLayout(rows, cols) {
	
    // seriesKeys와 studyKey는 images.html에서 Thymeleaf를 통해 주입된 값을 사용
    if (!seriesKeys || !studyKey) {
        console.error("seriesKeys 또는 studyKey를 찾을 수 없습니다.");
        return;
    }

    // 시리즈 키 목록에 해당하는 이미지 데이터를 가져와 레이아웃에 적용
    fetch(`/studies/${studyKey}/series-images?seriesKeys=${seriesKeys.join(',')}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(seriesImagesMap => {
            console.log("Fetched series images map:", seriesImagesMap);
            generateSeriesLayout(rows, cols, seriesImagesMap); // 시리즈 이미지 그리드 생성
        })
        .catch(error => {
            console.error('Error fetching series images:', error);
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


     Object.keys(seriesImagesMap).slice(0, totalCells).forEach(seriesKey => {

        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);

        cornerstone.enable(gridItem);

        const imagePaths = seriesImagesMap[seriesKey];
        if (imagePaths && imagePaths.length > 0) {
            let filename = imagePaths[currentIndex % imagePaths.length];

            loadAndDisplayImage(gridItem, filename, seriesKey);

            // 마우스 휠 이벤트로 이미지 전환
            gridItem.addEventListener('wheel', event => {

                event.preventDefault();
                currentIndex = (currentIndex + (event.deltaY > 0 ? 1 : -1) + imagePaths.length) % imagePaths.length;
                loadAndDisplayImage(gridItem, imagePaths[currentIndex], seriesKey);
            });

            
             // 더블 클릭 이벤트로 1x1 레이아웃 전환
            gridItem.addEventListener('dblclick', () => {
                applySingleSeriesLayout(seriesKey);
                enableImageLayoutButton(); // 더블 클릭 시 이미지 레이아웃 버튼 활성화
            });
        } else {
            gridItem.style.backgroundColor = 'black';
            console.warn(`No images found for seriesKey: ${seriesKey}.`);

        }
    });
}

// 셀에 이미지를 로드하고 표시하는 함수
function loadAndDisplayImage(gridItem, filename, seriesKey) {


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



// 시리즈 이미지 데이터를 가져와서 레이아웃 생성 함수 호출
async function fetchImagesAndGenerateLayout(rows, cols) {
    const { studyKey } = getStudyAndSeriesKeyFromURL();

    if (!studyKey) {
        console.error("studyKey가 URL에서 찾을 수 없습니다.");
        return;
    }


    // 서버에 요청을 보내 시리즈 키 목록에 해당하는 이미지 데이터를 가져옴
    fetch(`/studies/${studyKey}/series-images?seriesKeys=${seriesKeys.join(',')}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(seriesImagesMap => {
            console.log("Fetched series images map:", seriesImagesMap);
            generateSeriesLayout(rows, cols, seriesImagesMap); // 시리즈 이미지 그리드 생성
        })
        .catch(error => {
            console.error('Error fetching series images:', error);
        });

}

// 선택된 시리즈에 대해 1x1 레이아웃을 적용하는 함수
function applySingleSeriesLayout(seriesKey) {
    const gridContainer = document.getElementById('dicomImage');


    // 기존 콘텐츠 완전히 제거
    gridContainer.innerHTML = '';
    gridContainer.style.display = 'block';


    // cornerstone 활성화 - 중복 활성화를 방지하기 위해 gridContainer가 이미 활성화되었는지 확인
    if (!cornerstone.getEnabledElement(gridContainer)) {
        cornerstone.enable(gridContainer);
    }

    // Thymeleaf로 전달된 studyKey 변수를 사용하여 fetch 요청

    fetch(`/images/studies/${studyKey}/series/${seriesKey}`, {
        headers: { 'Accept': 'text/html' }  // HTML 형식으로 응답 요청
    })
    .then(response => {

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.text();  // HTML 형식 응답을 텍스트로 변환
    })
    .then(html => {
        // HTML 응답이 이미지 경로를 포함하고 있다고 가정하고 파싱합니다.
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imgElement = doc.querySelector('img');
        
        if (imgElement) {
            let imagePath = imgElement.getAttribute('src');

            // 경로의 '\' 문자를 '/'로 변경
            imagePath = imagePath.replace(/\\/g, '/');
            const imageId = `wadouri:http://localhost:8080${imagePath}`;

            // cornerstone을 통해 이미지를 로드하고 표시
            cornerstone.loadImage(imageId).then(image => {
                cornerstone.displayImage(gridContainer, image);
                console.log(`Displayed image for seriesKey: ${seriesKey}, imageId: ${imageId}`);
            }).catch(err => {
                console.error(`Failed to load image for seriesKey ${seriesKey}:`, err);
                gridContainer.style.backgroundColor = 'black';
            });
        } else {
            console.error('No image found in the HTML response');
            gridContainer.style.backgroundColor = 'black';
        }
    })
    .catch(error => {
        console.error(`Error fetching HTML content for series ${seriesKey}:`, error);
        gridContainer.style.backgroundColor = 'black';
    });
}

// 초기화 호출
setupSeriesGridSelector();
