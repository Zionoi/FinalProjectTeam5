document.addEventListener("DOMContentLoaded", function () {
    // 환자 상세 페이지에서 삭제 버튼 클릭 시 확인 메시지 표시
    const deleteButton = document.getElementById("deletePatientButton");
    if (deleteButton) {
        deleteButton.addEventListener("click", function (event) {
            if (!confirm("정말로 이 환자를 삭제하시겠습니까?")) {
                event.preventDefault();
            }
        });
    }

    // 환자 정보 수정 폼 유효성 검사 예시
    const patientForm = document.getElementById("patientForm");
    if (patientForm) {
        patientForm.addEventListener("submit", function (event) {
            const pName = document.getElementById("pName").value;
            if (!pName) {
                alert("환자 이름을 입력해주세요.");
                event.preventDefault();
            }
        });
    }
});
