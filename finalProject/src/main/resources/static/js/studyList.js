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
    if (isRequestInProgress) return; // 중복 요청 방지
    isRequestInProgress = true;
    console.log('과거이력 버튼 실행 확인 : ', pid);
    
    axios.get(`/studyList/${pid}/choice`)
        .then(function (response) {
            document.getElementById('historyContainer').innerHTML = response.data;
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