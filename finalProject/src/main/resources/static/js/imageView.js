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
	    toolDropdown.style.display = 'none';    
	});
	
	// 이전/다음 초기화
	initializePrevNext(element);
	
	// 흑백 초기화
	initializeInvert(element);	
	
	// 밝기/대비 초기화
	initializeBrightnessContrast(element);
	
	// 플레이 클립 초기화
	initializePlayClip(element);
	
	// 시리즈 모아보기 초기화
	initializeViewSeries(element);
	
	// 도구 초기화
	initializeToolDropdown(element);
	
	// 주석 초기화
	initializeAnnotateDropdown(element);
	
	// 초기화 초기화
	initializeReset(element);
	
	// 이미지 레이아웃 초기화
	initializeImageLayout();
	
	// 시리즈 레이아웃
	initializeSeriesLayout();
    
}