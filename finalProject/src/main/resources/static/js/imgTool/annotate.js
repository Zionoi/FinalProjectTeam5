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
	
	// 각도 측정
    document.getElementById('angle').addEventListener('click', () => {
		
		cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('Angle', {
			// 설정
		    configuration: {
		        drawHandles: true,
		        drawHandlesOnHover: false,
		        hideHandlesIfMoving: false,
		        renderDashed: false,
		    }})
    });

    // 화살표 주석
    document.getElementById('arrow').addEventListener('click', () => {
        
        cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('ArrowAnnotate', {
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
		
        cornerstoneTools.setToolActive('Bidirectional', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('Bidirectional', {
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
		
        cornerstoneTools.setToolActive('CobbAngle', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('CobbAngle', {
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
		
        cornerstoneTools.setToolActive('EllipticalRoi', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('EllipticalRoi', {
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
		
        cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('FreehandRoi', {
			// 설정
		    configuration: defaultFreehandConfiguration()
		})
    });
    
    // 길이 측정
    document.getElementById('length').addEventListener('click', () => {
		
        cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('Length', {
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
		
        cornerstoneTools.setToolActive('Probe', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('Probe', {
			// 설정
		    configuration: {
		        drawHandles: true,
        		renderDashed: false,
		    }})
    });

	// 사각형 관심 영역 (ROI) 지정
    document.getElementById('rectangleRoi').addEventListener('click', () => {
		
        cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('RectangleRoi', {
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

	// 텍스트 마커 (주석을 텍스트로 표시)
    document.getElementById('text').addEventListener('click', () => {
		
        cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 })
		cornerstoneTools.addToolState('TextMarker', {
			// 설정
		    configuration: {
		        markers: [],
		        current: '',
		        ascending: true,
		        loop: false,
		        changeTextCallback,
		    }})
    });
    
    
    // 주석 저장 버튼 이벤트 추가
    document.getElementById('save').addEventListener('click', async () => {
        const element = document.getElementById('dicomImage');  // DICOM 이미지 요소
        const imageId = getCurrentImageId();  // 현재 이미지 ID 가져오기
        const annotations = getAnnotationsData(element); // 현재 주석 데이터 가져오기

        try {
            const response = await fetch(`/images/${imageId}/annotations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(annotations)
            });

            if (response.ok) {
                alert('주석이 성공적으로 저장되었습니다.');
            } else {
                alert('주석 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('주석 저장 중 오류:', error);
        }
    });

    // 주석 데이터를 가져오는 함수
    function getAnnotationsData(element) {
        const toolState = cornerstoneTools.globalImageIdSpecificToolStateManager.saveToolState();
        return Object.keys(toolState).map(imageId => ({
            imageId: imageId,
            annotations: toolState[imageId]
        }));
    }

    // 선택된 주석을 저장할 객체
    let selectedAnnotation = {
        toolType: null,
        uid: null,
    };
	
	// 주석 클릭 시 선택된 주석의 정보를 설정하는 함수
	function onAnnotationSelected(event) {
	    const { toolType, measurementData } = event.detail;
	    selectedAnnotation.toolType = toolType;
	    selectedAnnotation.uid = measurementData.uid;
	    console.log(`Selected Annotation - Tool: ${toolType}, UID: ${measurementData.uid}`);
	}
	
	// 선택된 주석만 삭제하는 함수
	function deleteSelectedAnnotation(element) {
	    if (!selectedAnnotation.toolType || !selectedAnnotation.uid) {
	        console.warn("No annotation selected.");
	        return;
	    }
	
	    const toolState = cornerstoneTools.getToolState(element, selectedAnnotation.toolType);
	    if (!toolState || !toolState.data) return;
	
	    // 선택된 주석 ID를 찾아 삭제
	    for (let i = 0; i < toolState.data.length; i++) {
	        if (toolState.data[i].uid === selectedAnnotation.uid) {
	            toolState.data.splice(i, 1);  // 선택된 주석 삭제
	            cornerstone.updateImage(element);  // 이미지 업데이트
	            console.log(`Deleted Annotation - Tool: ${selectedAnnotation.toolType}, UID: ${selectedAnnotation.uid}`);
	            break;
	        }
	    }
	
	    // 선택된 주석 정보 초기화
	    selectedAnnotation.toolType = null;
	    selectedAnnotation.uid = null;
	}
	
	// 주석 클릭 이벤트 리스너 설정
	document.getElementById('dicomImage').addEventListener('cornerstonetoolsmeasurementselected', onAnnotationSelected);
	
	// 삭제 버튼 클릭 시 선택된 주석 삭제
	document.getElementById('delete').addEventListener('click', () => {
	    const element = document.getElementById('dicomImage');
	    deleteSelectedAnnotation(element);
	});
	
	// 특정 주석 삭제 기능
/*function deleteSelectedAnnotation(element, toolType, annotationId) {
    const toolState = cornerstoneTools.getToolState(element, toolType);
    
    if (!toolState || !toolState.data) return;

    // toolState.data 배열에서 선택한 주석의 ID를 찾아 삭제
    for (let i = 0; i < toolState.data.length; i++) {
        if (toolState.data[i].uid === annotationId) {
            toolState.data.splice(i, 1);  // 선택된 주석 삭제
            cornerstone.updateImage(element);  // 화면 업데이트
            break;
        }
    }
}

// 주석을 선택하고 삭제할 수 있도록 설정하는 이벤트 리스너
document.getElementById('deleteSelectedAnnotation').addEventListener('click', () => {
    const element = document.getElementById('dicomImage');
    const toolType = 'Angle';  // 예시로 Angle 주석을 삭제할 때
    const annotationId = '선택한_주석의_ID'; // 실제로는 사용자가 선택한 주석의 ID를 가져와야 함

    deleteSelectedAnnotation(element, toolType, annotationId);
});*/



}
