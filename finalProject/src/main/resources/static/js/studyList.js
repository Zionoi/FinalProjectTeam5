document.addEventListener("DOMContentLoaded", function () {
    // 기존 코드: 스터디 목록 클릭 시 상세 페이지로 이동
    const studyItems = document.querySelectorAll(".study-item");
    studyItems.forEach(item => {
        item.addEventListener("click", function () {
            const studyKey = this.dataset.studyKey;
            window.location.href = `/studies/${studyKey}`;
        });
    });

    // 기존 코드: 삭제 버튼 클릭 시 확인 메시지 표시
    const deleteButtons = document.querySelectorAll(".delete-study");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            if (!confirm("정말로 이 스터디를 삭제하시겠습니까?")) {
                event.preventDefault();
            }
        });
    });

    // cornerstone 및 cornerstone-wado-image-loader 설정
    if (typeof cornerstone === 'undefined' || typeof cornerstoneWADOImageLoader === 'undefined') {
        console.error("Cornerstone 또는 Cornerstone WADO Image Loader가 초기화되지 않았습니다.");
        return;
    }

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.configure({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
        }
    });

    // Thumbnail 함수 정의
    window.Thumbnail = function (studyKey, seriesKey) {
        console.log("Thumbnail 함수 실행 - studyKey:", studyKey, "seriesKey:", seriesKey);

        // Axios 요청을 통해 이미지 경로 가져오기
        axios.get(`/image/Thumbnail/${studyKey}/series/${seriesKey}`, {
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            const imagePaths = response.data;
            console.log('받은 썸네일 이미지 경로:', imagePaths);

            if (imagePaths.length > 0) {
                const imageId = `wadouri:/dicom-file/${imagePaths[0]}`;
                console.log("imageId:", imageId);

                const element = document.getElementById('dicomImage');
                if (!element) {
                    console.error("dicomImage 요소가 존재하지 않습니다.");
                    return;
                }

                cornerstone.enable(element);

                cornerstone.loadImage(imageId).then((image) => {
                    cornerstone.displayImage(element, image);
                }).catch(err => {
                    console.error('이미지 로드 실패:', err);
                });
            } else {
                console.error("이미지 경로가 비어 있습니다.");
            }
        })
        .catch(err => {
            console.error('이미지 요청 실패:', err);
        });
    };
});




let isRequestInProgress = false;

function sendPid(pid) {
    const historyContainer = document.getElementById('historyContainer');
    // historyContainer가 존재하는지 확인
    if (!historyContainer) {
        console.error('historyContainer 요소가 존재하지 않습니다.');
        return;
    }

    if (isRequestInProgress) return; // 중복 요청 방지
    isRequestInProgress = true;

    console.log('과거이력 버튼 실행 확인 : ', pid);

    axios.get(`/studyList/${pid}/choice`)
        .then(function (response) {
            // 서버에서 받은 HTML 프래그먼트를 해당 영역에 삽입
            /*console.log('백엔드에서 전달받은 값 response.data', response.data)*/
            historyContainer.innerHTML = response.data;
        })
        .catch(function (error) {
            console.error('Error:', error);
        })
        .finally(function () {
            isRequestInProgress = false; // 요청 완료 후 다시 활성화
        });
}


let isRequestProgress = false;

function sendStudyKey(studyKey) {
    const seriesContainer = document.getElementById('seriesContainer');

    // historyContainer가 존재하는지 확인
    if (!seriesContainer) {
        console.error('seriesContainer 요소가 존재하지 않습니다.');
        return;
    }

     if (isRequestProgress) return; // 중복 요청 방지
    isRequestProgress = true;
    console.log('시리즈목록 불러오기 버튼 실행 확인 : ', studyKey);

    axios.get(`/studyList/${studyKey}/series`)
        .then(function (response) {
            // 서버에서 받은 HTML 프래그먼트를 해당 영역에 삽입
            console.log('백엔드에서 전달받은 시리즈 값 response.data', response.data)
            seriesContainer.innerHTML = response.data;
        })
        .catch(function (error) {
            console.error('Error:', error);
        })
        .finally(function () {
            isRequestProgress = false; // 요청 완료 후 다시 활성화
        });
}



/**
 * 
 */