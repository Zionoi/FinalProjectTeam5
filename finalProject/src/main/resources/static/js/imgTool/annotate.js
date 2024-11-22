// 주석 드롭다운 초기화 함수
function initializeAnnotateDropdown(element) {
    const toolBtn = document.getElementById('annotateBtn');
    const toolDropdown = document.getElementById('annotateDropdown');

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

    setupAnnotateControls(element); 
}

// 주석 제어 설정 함수
function setupAnnotateControls(element) {
	
	// 좌표를 업데이트하는 이벤트 리스너 추가
	element.addEventListener('cornerstonetoolsmousemove', (event) => {
	    currentCoords = event.detail.currentPoints;
	});
	
	// 각도 측정
    document.getElementById('angle').addEventListener('click', () => {
		
		activateTool(element, 'Angle'); // `activateTool` 호출
		cornerstoneTools.setToolActive(element, 'Angle', { mouseButtonMask: 1 })
		/*cornerstoneTools.addToolState(element, 'Angle', {
			// 설정
		    configuration: {
		        drawHandles: true,
		        drawHandlesOnHover: false,
		        hideHandlesIfMoving: false,
		        renderDashed: false,
		    }})*/
		cornerstoneTools.addToolState(element, 'Angle', {
                      visible: true,
                      active: false,
                      color: undefined,
                      invalidated: true,
                      handles: {
                          start: { x: 0, y: 0, highlight: true, active: false },
                          middle: { x: 0, y: 0, highlight: true, active: false },
                          end: { x: 0, y: 0, highlight: true, active: true },
                          textBox: {
                              active: false,
                              hasMoved: false,
                              movesIndependently: false,
                              drawnIndependently: true,
                              allowedOutsideImage: true,
                              hasBoundingBox: true,
                          }
                      }
                  });
    });

    // 화살표 주석
    document.getElementById('arrow').addEventListener('click', () => {
        
        activateTool(element, 'ArrowAnnotate'); // `activateTool` 호출
        cornerstoneTools.setToolActive(element, 'ArrowAnnotate', coords, { mouseButtonMask: 1 })
		cornerstoneTools.addToolState(element, 'ArrowAnnotate', {
			// 설정
		    configuration: {
		        getTextCallback,
		        changeTextCallback,
		        drawHandles: true,
		        drawHandlesOnHover: false,
		        hideHandlesIfMoving: false,
		        arrowFirst: true,
		        renderDashed: false,
		        allowEmptyLabel: false,
		    }})
        
    });
  
  	// 양방향 측정
    document.getElementById('bidirectional').addEventListener('click', () => {
		
		activateTool(element, 'Bidirectional'); // `activateTool` 호출
        cornerstoneTools.setToolActive(element, 'Bidirectional', coords, { mouseButtonMask: 1 })
		cornerstoneTools.addToolState(element, 'Bidirectional', {
			// 설정
		    configuration: {
		        changeMeasurementLocationCallback: emptyLocationCallback,
		        getMeasurementLocationCallback: emptyLocationCallback,
		        textBox: '',
		        shadow: '',
		        drawHandles: true,
		        drawHandlesOnHover: true,
		        hideHandlesIfMoving: false,
		        renderDashed: false,
		        additionalData: [],
		    }})
    });

	// Cobb 각도 (측만증 진단 시 사용되는 각도)
    document.getElementById('cobb').addEventListener('click', () => {
		
		activateTool(element, 'CobbAngle'); // `activateTool` 호출
        cornerstoneTools.setToolActive(element, 'CobbAngle', coords, { mouseButtonMask: 1 })
		cornerstoneTools.addToolState(element, 'CobbAngle', {
			// 설정
		    configuration: {
		        drawHandles: true,
		        drawHandlesOnHover: false,
		        hideHandlesIfMoving: false,
		        renderDashed: false,
		    }})
    });

	// 타원형 관심 영역 (ROI) 지정
    document.getElementById('ellipticalRoi').addEventListener('click', () => {
		
		activateTool(element, 'EllipticalRoi'); // `activateTool` 호출
        cornerstoneTools.setToolActive(element, 'EllipticalRoi', coords, { mouseButtonMask: 1 })
		cornerstoneTools.addToolState(element, 'EllipticalRoi', {
			// 설정
		    configuration: {
		        // showMinMax: false,
		        // showHounsfieldUnits: true,
		        drawHandlesOnHover: false,
		        hideHandlesIfMoving: false,
		        renderDashed: false,
		    }})
    });

	// 자유형 관심 영역 (ROI) 지정
    document.getElementById('freehandRoi').addEventListener('click', () => {
		
		activateTool(element, 'FreehandRoi'); // `activateTool` 호출
        cornerstoneTools.setToolActive(element, 'FreehandRoi', coords, { mouseButtonMask: 1 })
		cornerstoneTools.addToolState(element, 'FreehandRoi', {
			// 설정
		    configuration: defaultFreehandConfiguration()
		})
    });
    
    // 길이 측정
    document.getElementById('length').addEventListener('click', () => {
		
		activateTool(element, 'Length'); // `activateTool` 호출
        cornerstoneTools.setToolActive(element, 'Length', coords, { mouseButtonMask: 1 })
		cornerstoneTools.addToolState(element, 'Length', {
			// 설정
		    configuration: {
		        drawHandles: true,
		        drawHandlesOnHover: false,
		        hideHandlesIfMoving: false,
		        renderDashed: false,
		        digits: 2,
		    }})
    });

	// 프로브 (지정된 위치의 값을 확인하는 도구)
    document.getElementById('probe').addEventListener('click', () => {
		
		activateTool(element, 'Probe'); // `activateTool` 호출
        cornerstoneTools.setToolActive(element, 'Probe', coords, { mouseButtonMask: 1 })
		cornerstoneTools.addToolState(element, 'Probe', {
			// 설정
		    configuration: {
		        drawHandles: true,
        		renderDashed: false,
		    }})
    });

	// 사각형 관심 영역 (ROI) 지정
    document.getElementById('rectangleRoi').addEventListener('click', () => {
		
		activateTool(element, 'RectangleRoi'); // `activateTool` 호출
        cornerstoneTools.setToolActive(element, 'RectangleRoi', coords, { mouseButtonMask: 1 })
		cornerstoneTools.addToolState(element, 'RectangleRoi', {
			// 설정
		    configuration: {
		        drawHandles: true,
		        drawHandlesOnHover: false,
		        hideHandlesIfMoving: false,
		        renderDashed: false,
		        // showMinMax: false,
		        // showHounsfieldUnits: true
		    }})
    });
    
    // changeTextCallback 함수 정의
	function changeTextCallback(data, eventData, doneCallback) {
	    // 사용자가 입력할 텍스트를 프롬프트로 요청
	    const newText = prompt("새로운 텍스트를 입력하세요:", data.text || '');
	
	    // 사용자가 취소를 누르지 않았다면 텍스트를 업데이트합니다.
	    if (newText !== null) {
	        data.text = newText;
	        doneCallback();
	    } else {
	        doneCallback();
	    }
	}


	/*document.getElementById('text').addEventListener('click', () => {
		
		activateTool(element, 'TextMarker'); // `activateTool` 호출
        cornerstoneTools.setToolActive(element, 'TextMarker', coords, { mouseButtonMask: 1 })
		cornerstoneTools.addToolState(element, 'TextMarker', {
			// 설정
		   configuration: {
		        markers: [],
		        current: '',
		        ascending: true,
		        loop: false,
		        changeTextCallback: changeTextCallback
		      }
		 })
    });*/
    
    // 텍스트 마커 (주석을 텍스트로 표시)
	/*document.getElementById('text').addEventListener('click', () => {
		cornerstone.enable(element);
		cornerstoneTools.init();
	    activateTool(element, 'TextMarker'); // `activateTool` 호출
	    cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 });
	
	    try {
	        
	        // 주석 도구 상태 추가
	        cornerstoneTools.addToolState(element, 'TextMarker', {
	            // 설정
	            drawHandles: true,
	        		renderDashed: false,
					visible: true,
					active: true,
					text: '바로 이거야~',
					color: undefined,
					markers: ['F5', 'F4', 'F3', 'F2', 'F1'],
					current: 'F5',
	                ascending: true,
	                loop: true,
	                changeTextCallback,
	                handles: {
					  start: {x: 0, y: 0},
			          end: {
			            x: 1000,
			            y: 1000,
			            highlight: true,
			            active: true,
			            hasBoundingBox: true
			          }
			        }
	            });
	    } catch (error) {
	        console.warn("TextMarker configuration 오류:", error);
	    }
	});*/
    
    // 주석 지우기
	document.getElementById('delete').addEventListener('click', () => {
		
		activateTool(element, 'Eraser'); // `activateTool` 호출
	    cornerstoneTools.setToolActive(element, 'Eraser', coords, { mouseButtonMask: 1 })
		cornerstoneTools.addToolState(element, 'Eraser')
	});

}
