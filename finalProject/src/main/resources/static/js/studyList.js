document.addEventListener("DOMContentLoaded", function () {
    // 스터디 목록 클릭 시 상세 페이지로 이동
    const studyItems = document.querySelectorAll(".study-item");
    studyItems.forEach(item => {
        item.addEventListener("click", function () {
            const studyKey = this.dataset.studyKey;
            window.location.href = `/studies/${studyKey}`;
        });
    });

    // 삭제 버튼 클릭 시 확인 메시지 표시
    const deleteButtons = document.querySelectorAll(".delete-study");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            if (!confirm("정말로 이 스터디를 삭제하시겠습니까?")) {
                event.preventDefault();
            }
        });
    });
    
    
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
            console.log('백엔드에서 전달받은 값 response.data', response.data)
            historyContainer.innerHTML = response.data;
        })
        .catch(function (error) {
            console.error('Error:', error);
        })
        .finally(function () {
            isRequestInProgress = false; // 요청 완료 후 다시 활성화
        });
}






/**
 * 
 */