// 확대 초기화 함수
function initializeReset(element) {

    document.getElementById('resetBtn').addEventListener('click', () => {
        console.log("Reset 버튼 클릭됨");
        cornerstone.reset(element);
    });

}
