let isRequestInProgress = false;

function sendStudyKey(studyKey) {
    const seriesContainer = document.getElementById('seriesContainer');

    // historyContainer가 존재하는지 확인
    if (!seriesContainer) {
        console.error('seriesContainer 요소가 존재하지 않습니다.');
        return;
    }

    console.log('시리즈목록 불러오기 버튼 실행 확인 : ', studyKey);
     if (isRequestInProgress) return; // 중복 요청 방지
    isRequestInProgress = true;

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
