// 시리즈 모아보기 활성화 함수
async function fetchSeriesImages(studyKey, seriesKeys) {
    let combinedImageIds = [];

    try {
        const response = await fetch(`/studies/${studyKey}/series-images?seriesKeys=${seriesKeys.join(',')}`);

        // JSON 응답이 아닌 경우 처리
        if (!response.ok) {
            throw new Error(`서버 오류: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("JSON 응답이 아님");
        }

        const seriesImagesMap = await response.json();

        // 시리즈 이미지 경로 병합
        for (const seriesKey in seriesImagesMap) {
            const imagePaths = seriesImagesMap[seriesKey].map(path => `wadouri:/dicom-file/${path}`);
            combinedImageIds = combinedImageIds.concat(imagePaths);
        }

        return combinedImageIds;
    } catch (error) {
        console.error("시리즈 이미지를 불러오는 중 오류 발생:", error);
        return [];
    }
}


function initializeViewSeries(element, studyKey, seriesKeys) {
    document.getElementById('viewSeriesBtn').addEventListener('click', async () => {
        const combinedImageIds = await fetchSeriesImages(studyKey, seriesKeys);

        if (combinedImageIds.length === 0) {
            console.error("이미지를 불러올 수 없습니다.");
            return;
        }

        const stack = {
            currentImageIdIndex: currentImageIndex,  // 현재 인덱스에서 시작
            imageIds: combinedImageIds
        };

        // 첫 번째 이미지를 로드하고 cornerstone에 표시
        cornerstone.loadImage(combinedImageIds[currentImageIndex]).then(image => {
            cornerstone.displayImage(element, image);
            cornerstoneTools.addStackStateManager(element, ['stack']);
            cornerstoneTools.addToolState(element, 'stack', stack);
        });

        // StackScrollTool 활성화하여 휠로 이미지 전환 가능하게 설정
        cornerstoneTools.setToolActiveForElement(element, 'StackScrollMouseWheel', {});
        console.log("모든 시리즈 로드 완료, 마우스 휠로 이미지 전환 가능");
        console.log("시리즈 모아보기 시작 - 현재 이미지 인덱스:", currentImageIndex);
        
        // 마우스 휠 이벤트를 사용해 currentImageIndex 업데이트
        element.addEventListener('wheel', (event) => {
            event.preventDefault();
            currentImageIndex = (currentImageIndex + (event.deltaY > 0 ? 1 : -1) + combinedImageIds.length) % combinedImageIds.length;
        });
    });
}
