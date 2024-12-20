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

- **Frontend:** Thymeleaf, VTK.js, Cornerstone.js  
- **Backend:** Spring Boot (JPA)  
- **Database:** Oracle  
- **Deployment:** AWS

---

## 📸 **D-VIEW의 주요 화면**  

> **아래는 D-VIEW의 주요 화면 예시입니다.**  

### 메인 페이지
![메인 페이지](https://github.com/user-attachments/assets/6859c86f-eca4-4f7e-a1e2-c76c7cd7f42e)

---

### DCM 이미지 출력
![DViewImgAnnotate](https://github.com/user-attachments/assets/29f86cbe-1d3f-4431-83d9-f5bc0044cf99)
![DViewImgTool2](https://github.com/user-attachments/assets/1cd58f74-90e4-43be-9ec1-a890be235a5d)


---

### CT 데이터 3D 렌더링
![DView3D](https://github.com/user-attachments/assets/192cca35-6a91-4baf-977a-c7114a184d1d)




