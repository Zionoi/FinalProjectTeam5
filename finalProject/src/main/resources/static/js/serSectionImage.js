function sendStudySeriesKey(studyKey) {
    const serSectionImageContainer = document.getElementById('serSectionImageContainer');

    // historyContainer가 존재하는지 확인
    if (!serSectionImageContainer) {
        console.error('serSectionImageContainer 요소가 존재하지 않습니다.');
        return;
    }

    console.log('과거이력 버튼 실행 확인 : ', studyKey);

    axios.get(`/images/studies/${studyKey}/series/${seriesKey}`)
        .then(function (response) {
            // 서버에서 받은 HTML 프래그먼트를 해당 영역에 삽입
            console.log('백엔드에서 전달받은 값 response.data', response.data)
            serSectionImageContainer.innerHTML = response.data;
        })
        .catch(function (error) {
            console.error('Error:', error);
        })
        .finally(function () {
            isRequestProgress = false; // 요청 완료 후 다시 활성화
        });
}
