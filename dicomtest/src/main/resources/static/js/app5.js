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
	
	

	// 4. Add event handlers to flip or rotate the image
    document.getElementById('hFlip').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.hflip = !viewport.hflip;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('vFlip').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.vflip = !viewport.vflip;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('lRotate').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.rotation-=90;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('rRotate').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.rotation+=90;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('reset').addEventListener('click', function (e) {
        cornerstone.reset(element);
    });

    element.addEventListener('mousemove', function(event) {
        const pixelCoords = cornerstone.pageToPixel(element, event.pageX, event.pageY);
        document.getElementById('coords').textContent = "pageX=" + event.pageX + ", pageY=" + event.pageY + ", pixelX=" + pixelCoords.x + ", pixelY=" + pixelCoords.y;
    });

	
})