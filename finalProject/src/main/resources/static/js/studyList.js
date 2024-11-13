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

        axios.get(`/image/Thumbnail/${studyKey}/series/${seriesKey}`, {
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            const imagePaths = response.data;
            console.log('받은 썸네일 이미지 경로:', imagePaths);

            if (imagePaths.length > 0) {
                const imageId = `wadouri:/dicom-file/${imagePaths[0]}`;
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
    if (!historyContainer) {
        console.error('historyContainer 요소가 존재하지 않습니다.');
        return;
    }

    if (isRequestInProgress) return; // 중복 요청 방지
    isRequestInProgress = true;

    console.log('과거이력 버튼 실행 확인 : ', pid);

    axios.get(`/studyList/${pid}/choice`)
        .then(function (response) {
            historyContainer.innerHTML = response.data;

            // studyKey를 사용해 첫 번째 시리즈 자동 로드
            const firstStudyRow = document.querySelector(".series-table-body tr");
            if (firstStudyRow) {
                const studyKey = firstStudyRow.getAttribute("data-study-key");
                const seriesKey = firstStudyRow.getAttribute("data-series-key");
                if (studyKey && seriesKey) {
                    Thumbnail(studyKey, seriesKey); // 첫 번째 시리즈의 첫 번째 이미지 표시
                }
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        })
        .finally(function () {
            isRequestInProgress = false;
        });
}

let isRequestProgress = false;

function sendStudyKey(studyKey) {
    const seriesContainer = document.getElementById('seriesContainer');

    if (!seriesContainer) {
        console.error('seriesContainer 요소가 존재하지 않습니다.');
        return;
    }

    if (isRequestProgress) return; // 중복 요청 방지
    isRequestProgress = true;
    console.log('시리즈목록 불러오기 버튼 실행 확인 : ', studyKey);

    axios.get(`/studyList/${studyKey}/series`)
        .then(function (response) {
            seriesContainer.innerHTML = response.data;

            // 시리즈 목록의 첫 번째 항목 자동 표시
            const firstSeriesRow = document.querySelector(".series-table-body tr");
            if (firstSeriesRow) {
                const firstSeriesKey = firstSeriesRow.getAttribute("data-series-key");
                if (firstSeriesKey) {
                    Thumbnail(studyKey, firstSeriesKey);
                }
            }

            // 각 시리즈 클릭 시 해당 시리즈의 첫 번째 이미지 표시
            const seriesRows = document.querySelectorAll(".series-table-body tr");
            seriesRows.forEach(row => {
                row.addEventListener("click", function () {
                    const clickedSeriesKey = this.getAttribute("data-series-key");
                    if (clickedSeriesKey) {
                        Thumbnail(studyKey, clickedSeriesKey);
                    }
                });
            });
        })
        .catch(function (error) {
            console.error('Error:', error);
        })
        .finally(function () {
            isRequestProgress = false;
        });
}
