document.addEventListener("DOMContentLoaded", function () {
	
    initializeImageLayout();

    
    // 이미지 미리보기 클릭 시 상세 페이지로 이동
    /*const imageThumbnails = document.querySelectorAll(".image-thumbnail");
    imageThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            const imageKey = this.dataset.imageKey;
            window.location.href = `/images/${imageKey}`;
        });
    });*/
    
    
	// 페이지 다른 곳 클릭 시 드롭다운 닫기
	document.addEventListener('click', () => {
	    rotationDropdown.style.display = 'none';
	});

	// 회전 초기화
	initializeRotationDropdown();
});
