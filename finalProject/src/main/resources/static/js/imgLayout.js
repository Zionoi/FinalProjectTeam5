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
function generateImageGrid(rows, cols) {
    const gridContainer = document.getElementById('dicomImage');
    gridContainer.innerHTML = '';  // 기존의 그리드를 초기화

    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    // 이미지 스택 설정
    const imageIds = imagePaths.map(filename => `wadouri:http://localhost:8080/dicom-file/${filename}`);
    const stack = { currentImageIdIndex: 0, imageIds: imageIds };

    // 그리드 항목 생성 및 스택 할당
    for (let i = 0; i < rows * cols; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);

        cornerstone.enable(gridItem);

        if (i < imageIds.length) {
            cornerstone.loadImage(imageIds[i]).then(image => {
                cornerstone.displayImage(gridItem, image);
                cornerstoneTools.addStackStateManager(gridItem, ['stack']);
                cornerstoneTools.addToolState(gridItem, 'stack', stack);
            }).catch(err => {
                console.error('이미지 로드 실패:', err);
            });
        } else {
            gridItem.style.backgroundColor = 'black';
        }
    }

    // StackScrollTool 추가 및 마우스 휠로 활성화
    cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
    cornerstoneTools.setToolActive('StackScroll', { bindings: [{ mouseButtonMask: 1 }] });
    console.log("StackScrollTool 활성화 완료 - 마우스 휠로 이미지 스택 전환");
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