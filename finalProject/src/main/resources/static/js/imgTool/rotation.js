// 회전 드롭다운 초기화 함수
function initializeRotationDropdown() {
	console.log("initializeRotationDropdown 실행 중...");
    const rotateBtn = document.getElementById('rotateBtn');
    const rotationDropdown = document.getElementById('rotationDropdown');
    const element = document.getElementById('dicomImage');
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
    
    if (!rotateBtn || !rotationDropdown) {
        console.error("rotateBtn 또는 rotationDropdown 요소를 찾을 수 없습니다.");
        return;
    }
<<<<<<< HEAD
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
=======
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)

    // cornerstone 활성화 확인
    if (!cornerstone.getEnabledElement(element)) {
        cornerstone.enable(element);  // cornerstone 활성화
    }

    // 회전 버튼 클릭 시 드롭다운 토글
    rotateBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        rotationDropdown.style.display = rotationDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // 드롭다운 내부 클릭 시 닫히지 않도록 설정
    rotationDropdown.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    setupRotationControls(element);  // 회전 제어 설정 호출
}

// 회전 제어 설정 함수
function setupRotationControls() {
    console.log("setupRotationControls 실행 중...");
<<<<<<< HEAD
<<<<<<< HEAD

    const element = document.getElementById('dicomImage');
    /*if (!element) {
        console.error("dicomImage 요소를 찾을 수 없습니다.");
        return;
    }*/
=======
    
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
=======
    
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
    if (element && cornerstone.getEnabledElement(element)) {
	    console.log("dicomImage 요소가 활성화되었습니다.");
	} else {
	    console.error("dicomImage 요소가 없거나 활성화되지 않았습니다.");
	}


    document.getElementById('hFlip').addEventListener('click', () => {
        console.log("HFlip 버튼 클릭됨");
        const viewport = cornerstone.getViewport(element);
        viewport.hflip = !viewport.hflip;
        console.log("현재 회전 값:", viewport.hflip);  // 회전 값 확인
        cornerstone.setViewport(element, viewport);
<<<<<<< HEAD
<<<<<<< HEAD
        cornerstone.updateImage(element);  // 강제 업데이트
=======
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
=======
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
    });

    document.getElementById('vFlip').addEventListener('click', () => {
        console.log("VFlip 버튼 클릭됨");
        const viewport = cornerstone.getViewport(element);
        viewport.vflip = !viewport.vflip;
        console.log("현재 회전 값:", viewport.hflip);  // 회전 값 확인
        cornerstone.setViewport(element, viewport);
<<<<<<< HEAD
<<<<<<< HEAD
        cornerstone.updateImage(element);  // 강제 업데이트
=======
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
=======
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
    });

    document.getElementById('lRotate').addEventListener('click', () => {
        console.log("Rotate Left 버튼 클릭됨");
        const viewport = cornerstone.getViewport(element);
        viewport.rotation -= 90;
        console.log("현재 회전 값:", viewport.rotation);  // 회전 값 확인
        cornerstone.setViewport(element, viewport);
<<<<<<< HEAD
<<<<<<< HEAD
        cornerstone.updateImage(element);  // 강제 업데이트
=======
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
=======
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
    });

    document.getElementById('rRotate').addEventListener('click', () => {
        console.log("Rotate Right 버튼 클릭됨");
        const viewport = cornerstone.getViewport(element);
        viewport.rotation += 90;
        console.log("현재 회전 값:", viewport.rotation);  // 회전 값 확인
        cornerstone.setViewport(element, viewport);
<<<<<<< HEAD
<<<<<<< HEAD
        cornerstone.updateImage(element);  // 강제 업데이트
=======
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
=======
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
    });

    document.getElementById('resetRotate').addEventListener('click', () => {
        console.log("Reset 버튼 클릭됨");
        cornerstone.reset(element);
        cornerstone.updateImage(element);  // 강제 업데이트
    });
}
<<<<<<< HEAD
=======

// 초기화 
<<<<<<< HEAD
initializeRotationDropdown();
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
=======
initializeRotationDropdown();
>>>>>>> parent of ee1d356 (Merge branch 'main' into develop)
