// 시리즈 모아보기 활성화 함수
async function fetchSeriesImages(studyKey, seriesKeys) {
    // 시리즈 이미지들을 병합할 배열
    let combinedImageIds = [];

    try {
        // 서버에서 각 시리즈에 대한 이미지를 가져옴
        const response = await fetch(`/studies/${studyKey}/series-images?seriesKeys=${seriesKeys.join(',')}`);
        const seriesImagesMap = await response.json();

        // 각 시리즈의 이미지 경로에 'wadouri:' 접두사를 추가하여 cornerstone에서 인식 가능하게 설정
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
            currentImageIdIndex: 0,
            imageIds: combinedImageIds
        };

        // 첫 번째 이미지를 로드하고 cornerstone에 표시
        cornerstone.loadImage(combinedImageIds[0]).then(image => {
            cornerstone.displayImage(element, image);
            cornerstoneTools.addStackStateManager(element, ['stack']);
            cornerstoneTools.addToolState(element, 'stack', stack);
        });

        // StackScrollTool 활성화하여 휠로 이미지 전환 가능하게 설정
        cornerstoneTools.setToolActiveForElement(element, 'StackScrollMouseWheel', {});
        console.log("모든 시리즈 로드 완료, 마우스 휠로 이미지 전환 가능");
    });
}
