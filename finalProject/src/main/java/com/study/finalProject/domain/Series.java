package com.study.finalProject.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "SERIESTAB")
@Getter
@Setter
@NoArgsConstructor  // 기본 생성자 자동 생성
@IdClass(SeriesId.class)
public class Series {

    

    @Id
    @Column(name = "SERIESKEY")
    private Long seriesKey;
    
    @Id
    @Column(name = "STUDYKEY")
    private Long studyKey;

    @Column(name = "STUDYINSUID", nullable = false, length = 64)
    private String studyInsUid;

    @Column(name = "SERIESINSUID", nullable = false, length = 64)
    private String seriesInsUid;

    @Column(name = "SERIESNUM")
    private Long seriesNum;

    @Column(name = "SERIESCURSEQNUM")
    private Long seriesCurSeqNum;

    @Column(name = "STUDYID", length = 64)
    private String studyId;

    @Column(name = "MODALITY", length = 16)
    private String modality;

    @Column(name = "SERIESDESC", length = 256)
    private String seriesDesc;

    @Column(name = "PROTOCOLNAME", length = 64)
    private String protocolName;

    @Column(name = "VIEWPOSITION", length = 255)
    private String viewPosition;

    @Column(name = "LATERALITY", length = 64)
    private String laterality;

    @Column(name = "COMMENTS", length = 255)
    private String comments;

    @Column(name = "IMAGECNT")
    private Long imageCnt;

    @Column(name = "MOVIECNT")
    private Long movieCnt;

    @Column(name = "SERIESTYPE", length = 64)
    private String seriesType;

    @Column(name = "VERIFYFLAG")
    private Long verifyFlag;

    @Column(name = "DELFLAG")
    private Long delFlag;

    @Column(name = "SERIESDATE", length = 8)
    private String seriesDate;

    @Column(name = "SERIESTIME", length = 14)
    private String seriesTime;

    @Column(name = "INSERTDATE", length = 8)
    private String insertDate;

    @Column(name = "INSERTTIME", length = 8)
    private String insertTime;

    @Column(name = "HOSPITALID")
    private Long hospitalId;

    @Column(name = "PERFORMINGPHYSICIANNAME", length = 255)
    private String performingPhysicianName;

    @Column(name = "OPERATORSNAME", length = 255)
    private String operatorsName;

    @Column(name = "PATPOSITION", length = 255)
    private String patPosition;

    @Column(name = "MANUFACTURER", length = 255)
    private String manufacturer;

    @Column(name = "INSTITUTIONNAME", length = 255)
    private String institutionName;

    @Column(name = "STATIONNAME", length = 255)
    private String stationName;

    @Column(name = "INSTITUTIONALDEPARTMENTNAME", length = 255)
    private String institutionalDepartmentName;

    @Column(name = "MANUMODELNAME", length = 255)
    private String manuModelName;

    @Column(name = "NONIMAGECOUNT")
    private Long nonImageCount;

    @Column(name = "FILESIZE")
    private Long fileSize;

    @Column(name = "INSERTED", length = 14)
    private String inserted;

    @Column(name = "UPDATED", length = 14)
    private String updated;

    @Column(name = "RESERVED1")
    private Long reserved1;

    @Column(name = "RESERVED2")
    private Long reserved2;

    @Column(name = "RESERVED3")
    private Long reserved3;

    @Column(name = "RESERVED4", length = 255)
    private String reserved4;

    @Column(name = "RESERVED5", length = 255)
    private String reserved5;

    @Column(name = "RESERVED6", length = 255)
    private String reserved6;

    @Column(name = "RESERVED7", length = 255)
    private String reserved7;

    @Column(name = "RESERVED8", length = 255)
    private String reserved8;

    @Column(name = "RESERVED9", length = 255)
    private String reserved9;

    @Column(name = "RESERVED10", length = 255)
    private String reserved10;

    @Column(name = "ANATOMICAL_ORIENTATION_TYPE", length = 255)
    private String anatomicalOrientationType;

    @Column(name = "BODY_PART", length = 255)
    private String bodyPart;

    @Column(name = "INSERT_DATE", length = 255)
    private String insertDateLong;

    @Column(name = "INSERT_TIME", length = 255)
    private String insertTimeLong;

    @Column(name = "INSTITUTION_NAME", length = 255)
    private String institutionNameLong;

    @Column(name = "INSTITUTIONAL_DEPARTMENT_NAME", length = 255)
    private String institutionalDepartmentNameLong;

    @Column(name = "OPERATORS_NAME", length = 255)
    private String operatorsNameLong;

    @Column(name = "PAT_POSITION", length = 255)
    private String patPositionLong;

    @Column(name = "PERFORMING_PHYSICIAN_NAME", length = 255)
    private String performingPhysicianNameLong;

    @Column(name = "PROTOCOL_NAME", length = 255)
    private String protocolNameLong;

    @Column(name = "SERIES_DATE", length = 255)
    private String seriesDateLong;

    @Column(name = "SERIES_DESC", length = 255)
    private String seriesDescLong;

    @Column(name = "SERIES_INS_UID", length = 255)
    private String seriesInsUidLong;

    @Column(name = "SERIES_TIME", length = 255)
    private String seriesTimeLong;

    @Column(name = "SERIES_TYPE", length = 255)
    private String seriesTypeLong;

    @Column(name = "STATION_NAME", length = 255)
    private String stationNameLong;

    @Column(name = "STUDY_ID", length = 255)
    private String studyIdLong;

    @Column(name = "STUDY_INS_UID", length = 255)
    private String studyInsUidLong;

    @Column(name = "VIEW_POSITION", length = 255)
    private String viewPositionLong;

    @Column(name = "SERIES_KEY", precision = 19, scale = 2)
    private Long seriesKeyLong;

    @Column(name = "MANU_MODELNAME", length = 255)
    private String manuModelNameLong;
}