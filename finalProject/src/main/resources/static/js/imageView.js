// cornerstone 및 cornerstoneTools 초기화
function initializeCornerstoneTools() {
	
	const element = document.getElementById('dicomImage');  
    cornerstone.enable(element);
    
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.init();


	// 페이지 다른 곳 클릭 시 드롭다운 닫기
	document.addEventListener('click', () => {
	    rotationDropdown.style.display = 'none';
	});
	
	// 회전 초기화
	initializeRotationDropdown(element);
	
	// 이미지 레이아웃 초기화
	initializeImageLayout();
	
	// 시리즈 레이아웃
	initializeSeriesLayout();
    
}