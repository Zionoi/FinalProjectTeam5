let activeTool = null;

function activateTool(element, toolName) {
    // cornerstone 요소가 활성화되었는지 확인
    if (!cornerstone.getEnabledElement(element)) {
        cornerstone.enable(element);  // 필요 시 cornerstone 활성화
    }

    console.log("현재 activeTool:", activeTool, "설정하려는 toolName:", toolName);

    if (activeTool === toolName) {
        console.log("활성화된 도구를 다시 클릭하여 비활성화합니다:", toolName);
        cornerstoneTools.setToolDisabledForElement(element, toolName);
        activeTool = null;
        setDefaultTools(element);
    } else {
        console.log("새 도구를 활성화합니다:", toolName);
        if (activeTool) {
            cornerstoneTools.setToolDisabledForElement(element, activeTool);
        }
        cornerstoneTools.setToolActiveForElement(element, toolName, { mouseButtonMask: 1 });
        activeTool = toolName;
    }
}



// 기본 도구 활성화 함수
function setDefaultTools(element) {
    cornerstoneTools.setToolActiveForElement(element, 'Pan', { mouseButtonMask: 1 });
    //cornerstoneTools.setToolActiveForElement(element, 'Zoom', { mouseButtonMask: 2 }); // 우클릭 클릭으로 확대
    //cornerstoneTools.setToolActiveForElement(element, 'Wwwc', { mouseButtonMask: 4 }); // 휠클릭 클릭으로 윈도우 레벨 조절   
}

// cornerstone 및 cornerstoneTools 초기화
function initializeCornerstoneTools() {
	
	const element = document.getElementById('dicomImage');  
    cornerstone.enable(element);
    
	cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.init();


	// 페이지 다른 곳 클릭 시 드롭다운 닫기
	/*document.addEventListener('click', () => {
	    toolDropdown.style.display = 'none';    
	});*/
	
	// 이전/다음 초기화
	initializePrevNext(element);
	
	// 흑백 초기화
	initializeInvert(element);	
	
	// 밝기/대비 초기화
	//initializeBrightnessContrast(element);
	
	// 플레이 클립 초기화
	initializePlayClip(element);
	
	// 시리즈 모아보기 초기화
	initializeViewSeries(element, studyKey, seriesKeys)
	
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

    document.getElementById("ct3d").addEventListener("click", function() {
        // imagePaths를 세션 스토리지에 저장
        sessionStorage.setItem('imagePaths', JSON.stringify(imagePaths));

        // ct3d.html로 페이지 이동
        window.location.href = "/ct3d";
    });
    


