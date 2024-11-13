// 도구 드롭다운 초기화 함수
function initializeToolDropdown(element) {
    const toolBtn = document.getElementById('toolBtn');
    const toolDropdown = document.getElementById('toolDropdown');

    // cornerstone 활성화 확인
    if (!cornerstone.getEnabledElement(element)) {
        cornerstone.enable(element);  // cornerstone 활성화
    }

    // 도구 버튼 클릭 시 드롭다운 토글
    toolBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toolDropdown.style.display = toolDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // 드롭다운 내부 클릭 시 닫히지 않도록 설정
    toolDropdown.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    setupToolControls(element);  // 회전 제어 설정 호출
}

// 도구 제어 설정 함수
function setupToolControls(element) {
	
	// 돋보기 기능
    document.getElementById('magnifier').addEventListener('click', () => {
		
		activateTool(element, 'Magnify'); // `activateTool` 호출
		cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('Magnify', {
		      configuration: {
			        magnifySize: 300,
			        magnificationLevel: 2,
		      }});
    });

    // 회전 기능
    document.getElementById('rotate').addEventListener('click', () => {
		
		activateTool(element, 'Rotate'); // `activateTool` 호출
		cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('Rotate', {
		      configuration: {
			        roundAngles: false,
			        flipHorizontal: false,
			        flipVertical: false,
			        rotateScale: 1,
		      }});
    });
  
    document.getElementById('hFlip').addEventListener('click', () => {
        const viewport = cornerstone.getViewport(element);
        viewport.hflip = !viewport.hflip;
        console.log("현재 회전 값:", viewport.hflip);  // 회전 값 확인
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('vFlip').addEventListener('click', () => {
        const viewport = cornerstone.getViewport(element);
        viewport.vflip = !viewport.vflip;
        console.log("현재 회전 값:", viewport.hflip);  // 회전 값 확인
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('lRotate').addEventListener('click', () => {
        const viewport = cornerstone.getViewport(element);
        viewport.rotation -= 90;
        console.log("현재 회전 값:", viewport.rotation);  // 회전 값 확인
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('rRotate').addEventListener('click', () => {
        const viewport = cornerstone.getViewport(element);
        viewport.rotation += 90;
        console.log("현재 회전 값:", viewport.rotation);  // 회전 값 확인
        cornerstone.setViewport(element, viewport);
    });

    
}
