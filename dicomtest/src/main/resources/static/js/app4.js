document.addEventListener('DOMContentLoaded', ()=> {
	
	//1.
	// cornerstone 초기화 문구
	cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
	cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
	
	// 이미지를 넣을 요소 얻어오기
	const element = document.getElementById('dicomImage');
	
	// 이미지 요소를 초기화 (반드시 해야함)
	cornerstone.enable(element);
	
	// 이미지 얻어오기 (static은 루트임 그아래부터 경로 잡아주면 됨. ex) 'wadouri:img/파일이름' )
	const imageId = 'wadouri:img/MR.1.2.392.200036.9116.4.1.6116.40033.5.3001.1.1152393810.dcm';
	
	// 얻어온 이미지 요소에 로드하기
	cornerstone.loadImage(imageId).then(image => {
		cornerstone.displayImage(element, image);
	}).catch(err => {
		console.log('이미지 로드 실패 : ', err);
	})
	
	

	// 3. Add event handlers to zoom the image in and out
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

	
})