// 흑백 초기화 함수
function initializeInvert(element) {
    //const element = document.getElementById('dicomImage');

    document.getElementById('invertBtn').addEventListener('click', function () {
	    //if (toolCheck) return;
	    const viewport = cornerstone.getViewport(element);
	    viewport.invert = !viewport.invert;
	    cornerstone.setViewport(element, viewport);
	});

}

