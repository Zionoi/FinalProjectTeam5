// 밝기/대비 조절 활성화 함수
function initializeBrightnessContrast(element) {
	
	// 윈도우 레벨로 수정
	
	let isAdjusting = false;

    let lastX = 0;
    let lastY = 0;

	// 버튼 클릭 시 밝기/대비 조절 활성화/비활성화 전환
    document.getElementById('brightnessBtn').addEventListener('click', () => {
		isAdjusting = !isAdjusting;
        brightnessBtn.classList.toggle('active', isAdjusting); // 버튼 활성화 상태 표시
    });
   
 	// 마우스 드래그로 밝기/대비 조절
	element.addEventListener('mousedown', function (e) {
		if (!isAdjusting) return; // 활성화 상태에서만 작동
			
	    let lastX = e.pageX;
	    let lastY = e.pageY;
	
	    function mouseMoveHandler(e) {
	      const deltaX = e.pageX - lastX;
	      const deltaY = e.pageY - lastY;
	      lastX = e.pageX;
	      lastY = e.pageY;
	
	      let viewport = cornerstone.getViewport(element);
	      viewport.voi.windowWidth += (deltaX / viewport.scale);
	      viewport.voi.windowCenter += (deltaY / viewport.scale);
	      cornerstone.setViewport(element, viewport);
	    }
	
	    function mouseUpHandler() {
	      document.removeEventListener('mousemove', mouseMoveHandler);
	      document.removeEventListener('mouseup', mouseUpHandler);
	    }
	
	      document.addEventListener('mousemove', mouseMoveHandler);
	      document.addEventListener('mouseup', mouseUpHandler);
	});

}
