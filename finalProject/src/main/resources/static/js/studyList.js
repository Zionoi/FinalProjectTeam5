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
/**
 * 
 */