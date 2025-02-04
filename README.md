# D-VIEW - 의료용 DICOM 이미지 뷰어 🩺

**D-VIEW**는 의료용 DICOM 파일을 웹 브라우저에서 손쉽게 조회하고 관리할 수 있는 웹 애플리케이션입니다.  
의료 데이터의 안전한 관리와 사용자 친화적인 UI를 통해 병원 내 의료진의 업무 효율성을 높이고,  
CT 데이터를 3D로 렌더링하여 직관적인 시각 정보를 제공합니다.

---

## 🔗 프로젝트 소개

- **프로젝트 이름:** D-VIEW (의료용 DICOM 이미지 뷰어)
- **프로젝트 목적:**  
  의료진이 DICOM 데이터를 직관적으로 조회하고, 환자별 검사 이력을 관리할 수 있는 웹 애플리케이션.  
  CT 데이터의 3D 렌더링과 사용자 친화적인 UI를 통해, 의료진의 업무 효율성과 환자 관리의 용이성을 높입니다.
  
- **프로젝트 특징:**  
  DICOM 파일 뷰어인 D-VIEW는 **의료진의 효율적인 업무 환경을 지원**하기 위해 개발되었습니다.  
  특히, CT 데이터를 3D로 시각화하여 더 직관적인 정보를 제공하고,  
  Cornerstone.js 및 VTK.js를 통해 **DCM 파일 이미지 출력 및 3D 렌더링**을 구현하였습니다.

---

## 🧑‍🤝‍🧑 팀원 소개

| **팀장** : **김요한** | **팀원** : **임성훈**, **엄이슬**, **김주영**, **정승연** |

### **담당 기능**

- **로그인 기능**  
  - Spring Security를 사용한 로그인 기능 구현.  
  - 유저별 접근 제어와 보안 강화.  

- **환자 데이터 관리**  
  - 환자의 과거 검사 이력을 StudyList.html에서 StudyChoice.html로 전달하여 표시.  
  - 선택한 환자의 검사 내역을 Series.html로 전달하여 촬영 자료 목록을 확인 가능.  

- **DCM 파일 이미지 출력**  
  - Cornerstone.js를 활용하여 DICOM 파일을 출력하는 로직 구현.  
  - WADO URI 방식으로 파일 경로를 설정하고, 서버 측에서 경로 매핑 로직을 설계.  

- **CT 데이터 3D 렌더링**  
  - VTK.js를 사용해 CT 데이터를 3D로 시각화.  
  - 피부, 뼈 등 요소별로 투명도와 조명값을 조절할 수 있도록 구현.  

- **페이지 프래그먼트 구조 설계**  
  - 프래그먼트를 사용하여 페이지 일부만 재렌더링하도록 설계하여 사용자 경험 향상.  

---

## ⚙️ 기술 스택

- **Frontend:** HTML5, CSS, JavaScript, Thymeleaf, VTK.js, Cornerstone.js  
- **Backend:** Spring Boot (JPA)  
- **Database:** Oracle  
- **Deployment:** AWS  
- **Version Control & Communication:** GitHub, Discord  


---

## 📸 **D-VIEW의 주요 화면**  

### 메인 페이지  
<img src="https://github.com/user-attachments/assets/6859c86f-eca4-4f7e-a1e2-c76c7cd7f42e" width="66%" />

- **설명:**
  - 환자 검색, 전체 목록 조회, 검사 이력 확인 기능 제공
  - 다중 검색 기능을 지원하며, 날짜, 환자 이름, 검사 장비, 담당 의사 이름, 검사명을 검색 조건으로 추가 가능
  - 검색 조건이 추가될 때마다 실시간으로 리스트를 재렌더링하여 검색 속도 및 편의성을 향상

- **트러블슈팅:**
  - 검색 시 다중 필터링이 적용되지 않는 문제 발생
  - 필터 조건을 동적으로 업데이트하여 해결

### DCM 이미지 출력 페이지  
<img src="https://github.com/user-attachments/assets/29f86cbe-1d3f-4431-83d9-f5bc0044cf99" width="66%" />

- **설명:**
  - 선택한 의료 촬영의 세부 내용을 확인할 수 있는 페이지
  - 여러 주석 및 도구를 활용하여 이미지 분석 가능
  - 마우스 버튼 별 기능을 할당하여 사용자의 편의성 증대 (드래그, 회전, 확대, 휠 스크롤 이동 기능 제공)

- **트러블슈팅:**
  - 클라이언트에서 서버 로컬 저장소의 PACSStorage 폴더에 직접 접근할 수 없는 문제 발생
  - Spring Boot 컨트롤러에서 이미지 파일 경로를 반환하는 API를 생성하여 해결

### CT 데이터 3D 렌더링 페이지  
<img src="https://github.com/user-attachments/assets/192cca35-6a91-4baf-977a-c7114a184d1d" width="66%" />

- **설명:**
  - DICOM 파일의 CT 데이터를 3D로 렌더링하여 직관적인 시각 정보 제공
  - VTK.js를 활용하여 각 신체 조직(피부, 근육, 뼈 등)의 밀도값을 기준으로 부위별 투명도 실시간 조절 가능
  - 명도, 채도 등의 조명값 조정 및 CT 데이터의 슬라이드 배열을 조절하여 단면도를 확인하는 기능 구현

- **트러블슈팅:**
  - CT 데이터의 색상 및 투명도 매핑이 부정확하여 시각화가 직관적이지 않은 문제 발생
  - Color Transfer Function 및 Opacity Transfer Function을 세분화하여 정확한 HU 값 범위 적용 및 사용자 피드백 기반 조정
  - UI에 밀도 조절 슬라이더를 추가하여 사용자가 직접 조정 가능하도록 개선

---

## 🔧 트러블슈팅

### 1. 이미지 경로 매핑 문제
- **문제:**  
  클라이언트가 서버의 로컬 디스크에 저장된 PACSStorage 폴더의 이미지 파일에 직접 접근할 수 없었습니다.
이를 해결하기 위해 서버에서 이미지 파일 경로를 처리하는 엔드포인트를 생성해야 했습니다.

- **해결:**  
  Spring Boot 컨트롤러에서 별도의 메소드를 정의하여, 클라이언트 요청이 들어오면 해당 이미지 파일을 찾아 반환하도록 설정했습니다.
이를 통해 /dicom-file/** 경로를 통해 클라이언트가 이미지에 접근할 수 있도록 처리했습니다.

---

### 2. CT 데이터의 색상 및 투명도 매핑 문제
- **문제:**  
  CT 데이터에서 피부, 뼈, 근육 등 각 조직의 밀값에 따라 정확히 투명도를 매핑하는 데 어려움이 있었습니다.
잘못된 매핑으로 인해 시각화된 데이터가 직관적이지 않아 사용자 피드백이 좋지 않았습니다.

- **해결:**  
  각 조직의 HU 값 범위를 명확히 정의하고, 이를 기반으로 Color Transfer Function과 Opacity Transfer Function을 더욱 세분화해 설정했습니다.
사용자 피드백을 기반으로 HU 값 범위와 매핑을 조정했습니다.
UI에 설정한 밀도값 별 슬라이더를 추가하여 사용자 스스로 투명도를 조정할 수 있도록 구현했습니다

---
## ✨ 프로젝트 소감  

D-VIEW 프로젝트를 통해 의료 데이터를 웹에서 직관적으로 다룰 수 있도록 하는 과정을 경험하며 많은 성장을 이뤘습니다.  

- **기술적 성장**  
  Cornerstone.js와 VTK.js를 활용하여 DICOM 데이터를 2D/3D로 시각화하면서, 의료 데이터의 구조와 DICOM 표준에 대해 깊이 이해할 수 있었습니다.  
  또한, Spring Boot와 Thymeleaf를 활용한 서버-클라이언트 간 데이터 흐름을 최적화하고, 검색 기능과 실시간 렌더링을 개선하면서 사용자 경험을 극대화하는 방법에 대해 여러 방향으로 생각해 볼 수 있었습니다.  

- **협업과 문제 해결**  
  팀원들과의 협업 과정에서 코드 리뷰와 문서화를 적극 활용하여 원활한 개발 프로세스를 유지할 수 있었습니다.  
  특히, 검색 기능과 PACSStorage 이미지 접근 문제 등에서 다양한 해결 방안을 논의하고 적용하면서, 실제 의료 데이터 시스템을 다룰 때 발생할 수 있는 문제를 해결하는 경험을 할 수 있었습니다.  

- **향후 개선 방향**  
  - DICOM 파일의 메타데이터를 활용하여 사용자 맞춤형 분석 기능 추가  
  - 3D 렌더링의 성능 최적화를 통해 대용량 데이터에서도 부드러운 조작 지원  
 

---
