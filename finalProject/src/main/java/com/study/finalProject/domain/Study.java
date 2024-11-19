package com.study.finalProject.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "STUDYTAB")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Study {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STUDYKEY")
    private Long studyKey;

    @ManyToOne
    @JoinColumn(name = "pid", referencedColumnName = "pid", insertable = false, updatable = false)
    private Patient patient;
    
    @Column(name = "STUDYINSUID", nullable = false, length = 64)
    private String studyInsUid;

    @Column(name = "PATKEY", length = 64)
    private String patKey;

    @Column(name = "ACCESSNUM", length = 64)
    private String accessNum;

    @Column(name = "STUDYDATE", length = 16)
    private String studyDate;

    @Column(name = "STUDYTIME", length = 14)
    private String studyTime;

    @Column(name = "STUDYID", length = 64)
    private String studyId;

    @Column(name = "EXAMCODE", length = 64)
    private String examCode;

    @Column(name = "STUDYDESC", length = 256)
    private String studyDesc;

    @Column(name = "MODALITY", length = 16)
    private String modality;

    @Column(name = "BODYPART", length = 256)
    private String bodyPart;

    @Column(name = "PATIENTKEY")
    private Long patientKey;

    @Column(name = "PID", length = 64)
    private String pid;

    @Column(name = "PNAME", length = 64)
    private String PName;

    // 추가된 리포트 필드
    @Column(name = "REPORT", length = 4000)
    private String report;

    @Column(name = "PLASTNAME", length = 64)
    private String pLastName;

    @Column(name = "PFIRSTNAME", length = 64)
    private String pFirstName;

    @Column(name = "PKNAME", length = 64)
    private String pkName;

    @Column(name = "PENAME", length = 64)
    private String peName;

    @Column(name = "PSEX", length = 16)
    private String pSex;

    @Column(name = "PBIRTHDATETIME", length = 16)
    private String pBirthDateTime;

    @Column(name = "PATAGE", length = 16)
    private String patAge;

    @Column(name = "EXAMSTATUS")
    private Integer examStatus;

    @Column(name = "REPORTSTATUS")
    private Integer reportStatus;

    @Column(name = "SERIESCNT")
    private Integer seriesCnt;

    @Column(name = "SERIESMOVIECNT")
    private Integer seriesMovieCnt;

    @Column(name = "IMAGECNT")
    private Integer imageCnt;

    @Column(name = "MOVIECNT")
    private Integer movieCnt;

    @Column(name = "NONSERIESCOUNT")
    private Integer nonSeriesCount;

    @Column(name = "NONIMAGECOUNT")
    private Integer nonImageCount;

    @Column(name = "VERIFYFLAG")
    private Integer verifyFlag;

    @Column(name = "VERIFYDATETIME", length = 14)
    private String verifyDateTime;

    @Column(name = "DEPT", length = 64)
    private String dept;

    @Column(name = "REFPHYSICIANNAME", length = 64)
    private String refPhysicianName;

    @Column(name = "REQPHYSICIANNAME", length = 64)
    private String reqPhysicianName;

    @Column(name = "PERFPHYSICIANNAME", length = 64)
    private String perfPhysicianName;

    @Column(name = "OPERATORSNAME", length = 64)
    private String operatorsName;

    @Column(name = "REFERTODRID", length = 64)
    private String referToDrId;

    @Column(name = "REFERTODRNAME", length = 64)
    private String referToDrName;

    @Column(name = "PATKIND", length = 1)
    private String patKind;

    @Column(name = "WARD", length = 64)
    private String ward;

    @Column(name = "SICKNAME", length = 256)
    private String sickName;

    @Column(name = "ADDEDINFO", length = 256)
    private String addedInfo;

    @Column(name = "HISCOMMENTS", length = 256)
    private String hisComments;

    @Column(name = "HISADDEDINFO1", length = 256)
    private String hisAddedInfo1;

    @Column(name = "HISADDEDINFO2", length = 256)
    private String hisAddedInfo2;

    @Column(name = "HISADDEDINFO3", length = 256)
    private String hisAddedInfo3;

    @Column(name = "INSNAME", length = 64)
    private String insName;

    @Column(name = "STATIONNAME", length = 64)
    private String stationName;

    @Column(name = "CONFIRMDATETIME", length = 16)
    private String confirmDateTime;

    @Column(name = "READINGDATETIME", length = 16)
    private String readingDateTime;

    @Column(name = "TRANSCRIBEDDATETIME", length = 16)
    private String transcribedDateTime;

    @Column(name = "READTYPE")
    private Integer readType;

    @Column(name = "READCODE", length = 64)
    private String readCode;

    @Column(name = "READCODEDESC", length = 200)
    private String readCodeDesc;

    @Column(name = "READINGDR", length = 64)
    private String readingDr;

    @Column(name = "CONFIRMDR", length = 64)
    private String confirmDr;

    @Column(name = "TRANSCRIPTIONIST", length = 64)
    private String transcriptionist;

    @Column(name = "READINGKEYWORD", length = 128)
    private String readingKeyword;

    @Column(name = "TEACHINGCASED")
    private Integer teachingCased;

    @Column(name = "STEREOCOUNT", columnDefinition = "NUMBER(10, 0) DEFAULT 0")
    private Integer stereoCount = 0;

    @Column(name = "PROTOCOLNAME", length = 256)
    private String protocolName;

    @Column(name = "VIEWPOSITION", length = 255)
    private String viewPosition;

    @Column(name = "LATERALITY", length = 255)
    private String laterality;

    @Column(name = "REASON4STUDY", length = 255)
    private String reason4Study;

    @Column(name = "COMMENTS", length = 255)
    private String comments;
    
    // getPName() 메서드는 한 번만 정의
    public String getPName() {
        return patient != null ? patient.getPName() : PName;
    }

    @Column(name = "STUDYTYPE", length = 64)
    private String studyType;

    @Column(name = "ARCHSTATUS")
    private Integer archStatus;

    @Column(name = "COMPSTATUS")
    private Integer compStatus;

    @Column(name = "DELFLAG")
    private Integer delFlag;

    @Column(name = "BACKUPSTATUS", columnDefinition = "NUMBER(10, 0) DEFAULT 0")
    private Integer backupStatus = 0;

    @Column(name = "BACKUPLABEL", length = 64)
    private String backupLabel;

    @Column(name = "BACKUPDATETIME", length = 16)
    private String backupDateTime;

    @Column(name = "MISMATCHFLAG", columnDefinition = "NUMBER(10, 0) DEFAULT 0")
    private Integer mismatchFlag = 0;

    @Column(name = "READINGPRIORITY", columnDefinition = "NUMBER(10, 0) DEFAULT 0")
    private Integer readingPriority = 0;

    @Column(name = "ABNORMALPATIENT", columnDefinition = "NUMBER(10, 0) DEFAULT 0")
    private Integer abnormalPatient = 0;

    @Column(name = "INSERTDATE", length = 8)
    private String insertDate;

    @Column(name = "INSERTTIME", length = 8)
    private String insertTime;

    @Column(name = "HOSPITALID", columnDefinition = "NUMBER(10, 0) DEFAULT 0")
    private Integer hospitalId = 0;

    @Column(name = "BURNCNT", columnDefinition = "NUMBER(10, 0) DEFAULT 0")
    private Integer burnCnt = 0;

    @Column(name = "BURNDATETIME", length = 16)
    private String burnDateTime;

    @Column(name = "VALIDATEFLAG", nullable = false)
    private Integer validateFlag;

    @Column(name = "REQREADSTATUS", columnDefinition = "NUMBER(10, 0) DEFAULT 0")
    private Integer reqReadStatus = 0;

    @Column(name = "PRIMARYSTUDY", length = 64)
    private String primaryStudy;
}
