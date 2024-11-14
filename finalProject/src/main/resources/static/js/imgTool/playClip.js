// 플레이클립 활성화 함수
function initializePlayClip(element) {
	
	const totalImages = imagePaths.length;  // 전체 이미지 개수
	let currentIndex = 0;  // 현재 이미지 인덱스 초기화
	let playInterval = null; // 클립 재생을 위한 변수
    let playCheck = false; // 재생 상태를 나타내는 변수
    let speed = 50; // 기본 재생 속도
	
    const playControls = document.getElementById('playControls');
    const togglePlayBtn = document.getElementById('togglePlayBtn');
    const speedInput = document.getElementById('speedInput');
    const decreaseSpeedBtn = document.getElementById('decreaseSpeedBtn');
    const increaseSpeedBtn = document.getElementById('increaseSpeedBtn');
    
	// 플레이클립 버튼 클릭 이벤트 추가
    document.getElementById('playClipBtn').addEventListener('click', function () {
        if (playControls.style.display === 'none') {
            // UI가 숨겨져 있으면 보이게 설정하고 재생 시작
            playControls.style.display = 'block';
            startClip();
        } else {
            // UI가 보이면 숨기고 재생 중지
            playControls.style.display = 'none';
            stopClip();
        }
    });
    
    // 재생을 시작하는 함수
    function startClip() {
        playCheck = true;
        playInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateTheImage(currentIndex);
        }, speed);
        togglePlayBtn.textContent = "멈춤";
    }
    
    // 재생을 중지하는 함수
    function stopClip() {
        clearInterval(playInterval);
        playInterval = null;
        playCheck = false;
        togglePlayBtn.textContent = "재생";
    }
    
    // 재생/멈춤 상태를 전환하는 함수
    togglePlayBtn.addEventListener('click', function () {
        if (playCheck) {
            stopClip();
        } else {
            startClip();
        }
    });
    
	// 속도 입력 필드 값이 변경될 때 호출되는 함수
    speedInput.addEventListener('input', function () {
        const newSpeed = parseInt(speedInput.value, 10);
        updateSpeed(newSpeed);
    });
    
    // 업/다운 버튼 이벤트 추가
    decreaseSpeedBtn.addEventListener('click', function () {
        updateSpeed(speed - 10); // 속도 감소
    });

    increaseSpeedBtn.addEventListener('click', function () {
        updateSpeed(speed + 10); // 속도 증가
    });

    // 속도 업데이트 함수
    function updateSpeed(newSpeed) {
        if (newSpeed >= 10 && newSpeed <= 500) {
            speed = newSpeed;
            speedInput.value = speed; // 숫자 입력칸 업데이트
            if (playCheck) {
                stopClip();
                startClip();
            }
        }
    }

    // 이미지를 인덱스로 업데이트하는 함수
    function updateTheImage(imageIndex) {
        return new Promise((resolve, reject) => {
            if (imageIndex >= 0 && imageIndex < totalImages) {
                currentIndex = imageIndex;
                const filename = imagePaths[currentIndex];
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