<<<<<<< HEAD
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
=======
document.addEventListener("DOMContentLoaded", function () {
    // 이미지 미리보기 클릭 시 상세 페이지로 이동
    const imageThumbnails = document.querySelectorAll(".image-thumbnail");
    imageThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            const imageKey = this.dataset.imageKey;
            window.location.href = `/images/${imageKey}`;
        });
    });

    // 이미지 보기 조작 관련 버튼들 예시
    const flipButton = document.getElementById("flipButton");
    const rotateButton = document.getElementById("rotateButton");

    if (flipButton) {
        flipButton.addEventListener("click", function () {
            // 이미지 뒤집기 로직
            alert("이미지를 뒤집습니다.");
        });
    }

    if (rotateButton) {
        rotateButton.addEventListener("click", function () {
            // 이미지 회전 로직
            alert("이미지를 회전합니다.");
        });
    }
});
>>>>>>> parent of 2aa8a4a (Merge pull request #8 from Zionoi/iseulUm)
