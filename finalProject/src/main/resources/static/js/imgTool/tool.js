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
	
	document.getElementById('magnifier').addEventListener('click', () => {
        
    });
    
    document.getElementById('zoom').addEventListener('click', () => { 
		
		 /*// Add event handlers to zoom the image in and out
	    document.getElementById('zoomIn').addEventListener('click', function (e) {
	        const viewport = cornerstone.getViewport(element);
	        viewport.scale += 0.25;
	        cornerstone.setViewport(element, viewport);
	    });
	    document.getElementById('zoomOut').addEventListener('click', function (e) {
	        const viewport = cornerstone.getViewport(element);
	        viewport.scale -= 0.25;
	        cornerstone.setViewport(element, viewport);
	    });
	    document.getElementById('reset').addEventListener('click', function (e) {
	        cornerstone.reset(element);
	    });
	
	    */
          
        // add event handlers to pan image on mouse move
	    element.addEventListener('mousedown', function (e) {
	      let lastX = e.pageX;
	      let lastY = e.pageY;
	
	      function mouseMoveHandler(e) {
	        const deltaX = e.pageX - lastX;
	        const deltaY = e.pageY - lastY;
	        lastX = e.pageX;
	        lastY = e.pageY;
	
	        const viewport = cornerstone.getViewport(element);
	        viewport.translation.x += (deltaX / viewport.scale);
	        viewport.translation.y += (deltaY / viewport.scale);
	        cornerstone.setViewport(element, viewport);
	      }
	
	      function mouseUpHandler() {
	        document.removeEventListener('mousemove', mouseMoveHandler);
	        document.removeEventListener('mouseup', mouseUpHandler);
	      }
	
	      document.addEventListener('mousemove', mouseMoveHandler);
	      document.addEventListener('mouseup', mouseUpHandler);
	    });
	
	    const mouseWheelEvents = ['mousewheel', 'DOMMouseScroll'];
	    mouseWheelEvents.forEach(function(eventType) {
	      element.addEventListener(eventType, function (e) {
	        // Firefox e.detail > 0 scroll back, < 0 scroll forward
	        // chrome/safari e.wheelDelta < 0 scroll back, > 0 scroll forward
	        let viewport = cornerstone.getViewport(element);
	        if (e.wheelDelta < 0 || e.detail > 0) {
	          viewport.scale -= 0.25;
	        } else {
	          viewport.scale += 0.25;
	        }
	
	        cornerstone.setViewport(element, viewport);
	
	        // Prevent page from scrolling
	        return false;
	      });
	    });
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
