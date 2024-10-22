document.addEventListener("DOMContentLoaded", function () {
    // 메인 페이지의 기본 인터랙션 예시
    const loginButton = document.getElementById("loginButton");
    const signupButton = document.getElementById("signupButton");

    if (loginButton) {
        loginButton.addEventListener("click", function () {
            alert("로그인 페이지로 이동합니다.");
            window.location.href = "/studyList";
        });
    }

    if (signupButton) {
        signupButton.addEventListener("click", function () {
            alert("회원가입 페이지로 이동합니다.");
            window.location.href = "/signup";
        });
    }
});
