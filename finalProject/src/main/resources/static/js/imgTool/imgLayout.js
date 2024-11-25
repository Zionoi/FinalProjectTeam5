// 이미지 레이아웃 초기화 함수
function initializeImageLayout() {
    const imgLayoutBtn = document.getElementById('imgLayoutBtn');
    const dropdown = document.getElementById('dropdown');
    const gridSelector = document.getElementById('grid-selector');

    function toggleImageDropdown() {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        document.getElementById('seriesDropdown').style.display = 'none'; // 다른 드롭다운 숨기기
    }

    imgLayoutBtn.addEventListener('click', toggleImageDropdown);

    // 그리드 선택기 설정 함수 호출
    setupImageGridSelector(gridSelector);

    console.log("이미지 레이아웃 초기화 완료");
}

// 그리드 선택기를 설정하는 함수
function setupImageGridSelector(gridSelector) {
    gridSelector.innerHTML = ''; // 기존 그리드를 초기화하여 중복 방지
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

            // 클릭 시 해당 행과 열로 이미지 레이아웃 적용
            gridOption.addEventListener('click', function () {
                const selectedRows = parseInt(gridOption.dataset.row);
                const selectedCols = parseInt(gridOption.dataset.col);
                generateImageGrid(selectedRows, selectedCols);
                dropdown.style.display = 'none'; // 드롭다운 닫기
            });

            gridSelector.appendChild(gridOption);
        }
    }
}

// 그리드 레이아웃 생성 및 이미지 로드 (스택 적용)
// 그리드 레이아웃 생성 및 이미지 로드
function generateImageGrid(rows, cols) {
    const gridContainer = document.getElementById('dicomImage');
    gridContainer.innerHTML = ''; // 기존의 그리드를 초기화

    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const imageIds = imagePaths.map(filename => `wadouri:/dicom-file/${filename}`);
    const totalImages = imageIds.length;
    const totalCells = rows * cols;
    let currentStartIndex = 0; // 현재 시작 인덱스

    // 각 셀의 이미지를 초기화
    function loadGridImages(startIndex) {
        for (let i = 0; i < totalCells; i++) {
            const gridItem = gridContainer.children[i];
            const imageIndex = startIndex + i;

            if (imageIndex < totalImages) {
                cornerstone.loadImage(imageIds[imageIndex]).then(image => {
                    cornerstone.displayImage(gridItem, image);
                }).catch(err => {
                    console.error('이미지 로드 실패:', err);
                });
            } else {
                // 이미지가 없으면 검은색 배경
                gridItem.style.backgroundColor = 'black';
            }
        }
    }

    // 초기 그리드 생성
    for (let i = 0; i < totalCells; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);

        cornerstone.enable(gridItem);
    }

    // 초기 이미지 로드
    loadGridImages(currentStartIndex);

    // 휠 이벤트로 이미지 전환
    gridContainer.addEventListener('wheel', (event) => {
        event.preventDefault();

        const direction = event.deltaY > 0 ? 1 : -1; // 휠 방향 감지
        const newStartIndex = currentStartIndex + direction * totalCells;

        // 첫 번째 및 마지막 범위를 초과하지 않도록 제한
        if (newStartIndex < 0 || newStartIndex >= totalImages) {
            console.log('이미지 전환 제한: 첫 번째 또는 마지막 이미지 범위입니다.');
            return;
        }

        currentStartIndex = newStartIndex;
        loadGridImages(currentStartIndex);
    });
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

// 선택 초기화 함수
function resetGridSelection() {
    const gridItems = document.querySelectorAll('.grid-option');
    gridItems.forEach(item => item.classList.remove('selected'));
}