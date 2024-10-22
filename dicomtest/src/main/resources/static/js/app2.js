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
	
	// 2. Add event handler to the ww/wc apply button
    document.getElementById('apply').addEventListener('click', function (e) {
        let viewport = cornerstone.getViewport(element);
        viewport.voi.windowWidth = parseFloat(document.getElementById('ww').value);
        viewport.voi.windowCenter = parseFloat(document.getElementById('wc').value);
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('invert').addEventListener('click', function (e) {
        let viewport = cornerstone.getViewport(element);
        viewport.invert = !viewport.invert;
        cornerstone.setViewport(element, viewport);
    });

    // add event handlers to mouse move to adjust window/center
    element.addEventListener('mousedown', function (e) {
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
        };

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
	
	/*// Add event handler for mouse wheel to adjust windowCenter 마우스 휠로 값 변경해주는 함수
element.addEventListener('wheel', function (e) {
    e.preventDefault(); // Prevents the default scrolling behavior

    let viewport = cornerstone.getViewport(element);

    // Adjust windowCenter based on wheel delta
    const delta = e.deltaY; // deltaY gives the amount of scroll
    const scaleFactor = 10; // Control the sensitivity of the scroll adjustment

    // Increase or decrease the windowCenter depending on the scroll direction
    viewport.voi.windowCenter += delta > 0 ? scaleFactor : -scaleFactor;

    cornerstone.setViewport(element, viewport);
});*/

	
})