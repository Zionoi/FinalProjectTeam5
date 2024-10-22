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
	
	

	function loadImage(imagePath) {
            const imageId = 'wadouri:http://localhost:8080/' + imagePath;
            
            // Enable the Cornerstone element
            const element = document.getElementById('dicomImage');
            cornerstone.enable(element);

            // Load the image and display it
            cornerstone.loadAndCacheImage(imageId).then(function(image) {
                cornerstone.displayImage(element, image);
            }).catch(function(err) {
                console.log("Error loading image:", err);
            });
        }
	
})