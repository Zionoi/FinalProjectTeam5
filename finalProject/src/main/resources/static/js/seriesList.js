document.addEventListener("DOMContentLoaded", function () {
    // patient-list-section tr 클릭 이벤트
    document.querySelectorAll(".patient-list-section tr").forEach(row => {
        row.addEventListener("click", function () {
            const pid = this.querySelector("button[name=pastStudy]").value;
            if (pid) {
                sendPidAndLoadSeriesAndThumbnail(pid);
            }
        });
    });
});

// 검사 이력과 시리즈 목록을 동시에 불러오고 첫 번째 시리즈의 첫 번째 이미지를 썸네일로 표시
function sendPidAndLoadSeriesAndThumbnail(pid) {
    const historyContainer = document.getElementById("historyContainer");
    const seriesContainer = document.getElementById("seriesContainer");

    if (!historyContainer || !seriesContainer) {
        console.error("historyContainer 또는 seriesContainer 요소가 존재하지 않습니다.");
        return;
    }

    // 검사 이력 로드 (studyChoice.html 프래그먼트)
    axios.get(`/studyList/${pid}/choice`)
        .then(response => {
            historyContainer.innerHTML = response.data;

            // 첫 번째 study의 studyKey를 가져와 시리즈 목록 로드 및 첫 번째 썸네일 표시
            const firstStudyRow = document.querySelector(".historytbody-section tr");
            if (firstStudyRow) {
                const studyKey = firstStudyRow.getAttribute("data-study-key");
                if (studyKey) {
                    loadSeriesAndFirstThumbnail(studyKey); // 시리즈 목록과 첫 번째 썸네일 로드
                }
            }
        })
        .catch(error => console.error("검사 이력 로드 실패:", error));
}

// 시리즈 목록을 로드하고 첫 번째 시리즈의 첫 번째 썸네일을 표시
function loadSeriesAndFirstThumbnail(studyKey) {
    axios.get(`/studyList/${studyKey}/series`)
        .then(response => {
            document.getElementById("seriesContainer").innerHTML = response.data;

            // 첫 번째 시리즈를 찾고 해당 시리즈의 첫 번째 이미지를 로드하여 썸네일 표시
            const firstSeriesRow = document.querySelector(".series-table-body tr");
            if (firstSeriesRow) {
                const seriesKey = firstSeriesRow.getAttribute("data-series-key");
                if (seriesKey) {
                    Thumbnail(studyKey, seriesKey);
                }
            }

            // 시리즈 목록의 각 행에 클릭 이벤트 추가 (각 시리즈의 첫 번째 이미지 표시)
            document.querySelectorAll(".series-table-body tr").forEach(row => {
                row.addEventListener("click", function () {
                    const clickedSeriesKey = this.getAttribute("data-series-key");
                    if (clickedSeriesKey) {
                        Thumbnail(studyKey, clickedSeriesKey);
                    }
                });
            });
        })
        .catch(error => console.error("시리즈 목록 로드 실패:", error));
}

// Thumbnail 함수: 특정 studyKey와 seriesKey로 첫 번째 이미지를 dicomImage div에 표시
window.Thumbnail = function (studyKey, seriesKey) {
    axios.get(`/image/Thumbnail/${studyKey}/series/${seriesKey}`, {
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        const imagePaths = response.data;
        if (imagePaths.length > 0) {
            const imageId = `wadouri:/dicom-file/${imagePaths[0]}`;
            const element = document.getElementById("dicomImage");
            if (!element) {
                console.error("dicomImage 요소가 존재하지 않습니다.");
                return;
            }
			// 이전 이미지를 제거하고 캐시를 초기화
            cornerstone.imageCache.purgeCache();
            cornerstone.enable(element);
            cornerstone.loadImage(imageId).then(image => {
                cornerstone.displayImage(element, image);
            }).catch(err => console.error("이미지 로드 실패:", err));
        } else {
            console.error("이미지 경로가 비어 있습니다.");
        }
    })
    .catch(err => console.error("이미지 요청 실패:", err));
};
