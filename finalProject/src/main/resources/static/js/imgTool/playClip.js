// 플레이클립 활성화 함수
function initializePlayClip(element) {
	
	const totalImages = imagePaths.length;  // 전체 이미지 개수
	let currentIndex = 0;  // 현재 이미지 인덱스 초기화
	let playInterval = null; // 클립 재생을 위한 변수
    let playCheck = false; // 재생 상태를 나타내는 변수
	
	// 플레이클립 버튼 클릭 이벤트 추가
    document.getElementById('playClipBtn').addEventListener('click', function () {
        //if (toolCheck) return; // 주석 모드 활성화 시 클립 재생 막기

        if (playInterval) {
            // 재생 중이면 중지
            clearInterval(playInterval);
            playInterval = null;
            playCheck = false;
        } else {
            // 재생 시작
            playCheck = true;
            playInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalImages; // 순환 재생
                updateTheImage(currentIndex);
            }, 50); // 50ms 간격으로 이미지 변경
        }
    });
    
    // 이미지를 인덱스로 업데이트하는 함수 (Promise 반환 추가)
    function updateTheImage(imageIndex) {
        return new Promise((resolve, reject) => {
            if (imageIndex >= 0 && imageIndex < totalImages) {
                currentIndex = imageIndex;
                const filename = imagePaths[currentIndex];
                if (!filename) {
                    console.error("Filename not found for current index:", currentIndex);
                    reject("Filename not found");
                    return;
                }
                const imageId = `wadouri:http://localhost:8080/dicom-file/${filename}`;

                cornerstone.loadImage(imageId).then(image => {
                    cornerstone.displayImage(element, image);
                    resolve();
                }).catch(err => {
                    console.error("이미지 로드 실패:", err);
                    reject(err);
                });
            } else {
                reject("Invalid image index");
            }
        });
    }

}
