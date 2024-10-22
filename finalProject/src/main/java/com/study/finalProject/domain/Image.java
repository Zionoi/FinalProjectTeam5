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
@Table(name = "IMAGETAB")
@Getter
@Setter
@NoArgsConstructor
@IdClass(ImageId.class)		
public class Image {

    @Id
    @Column(name = "IMAGEKEY")
    private Long imageKey;
    @Id
    @Column(name = "STUDYKEY")
    private Long studyKey;
    @Id
    @Column(name = "SERIESKEY")
    private Long seriesKey;

    @Column(name = "STUDYINSUID", nullable = false, length = 64)
    private String studyInsUid;

    @Column(name = "SERIESINSUID", nullable = false, length = 64)
    private String seriesInsUid;

    @Column(name = "SOPINSTANCEUID", nullable = false, length = 64)
    private String sopInstanceUid;

    @Column(name = "SOPCLASSUID", length = 64)
    private String sopClassUid;

    @Column(name = "PATH", length = 256)
    private String path;

    @Column(name = "FNAME", length = 256)
    private String fName;

    @Column(name = "SERIESNUMBER")
    private Long seriesNumber;

    @Column(name = "INSTANCENUM", length = 16)
    private String instanceNum;

    @Column(name = "CURSEQNUM")
    private Long curSeqNum;

    @Column(name = "WINDOW")
    private Long window;

    @Column(name = "LEV")
    private Long lev;

    @Column(name = "CONTENTDATE", length = 8)
    private String contentDate;

    @Column(name = "CONTENTTIME", length = 16)
    private String contentTime;

    @Column(name = "ACQDATE", length = 8)
    private String acqDate;

    @Column(name = "ACQTIME", length = 16)
    private String acqTime;

    @Column(name = "STUDYID", length = 64)
    private String studyId;

    @Column(name = "VIEWPOSITION", length = 255)
    private String viewPosition;

    @Column(name = "LATERALITY", length = 64)
    private String laterality;

    @Column(name = "IMAGETYPE", length = 256)
    private String imageType;

    @Column(name = "FMXDATA", length = 255)
    private String fmxData;

    @Column(name = "IMAGECOMMENTS", length = 255)
    private String imageComments;

    @Column(name = "ADDITIONALDESC", length = 32)
    private String additionalDesc;

    @Column(name = "IMAGEORIENTATION", length = 256)
    private String imageOrientation;

    @Column(name = "IMAGEPOSITION", length = 256)
    private String imagePosition;

    @Column(name = "PIXELSPACING", length = 256)
    private String pixelSpacing;

    @Column(name = "PIXELROWS")
    private Long pixelRows;

    @Column(name = "PIXELCOLUMNS")
    private Long pixelColumns;

    @Column(name = "BITSALLOCATED")
    private Long bitsAllocated;

    @Column(name = "SPECIFICCHARACTERSET", length = 64)
    private String specificCharacterSet;

    @Column(name = "TRANSFERSYNTAXUID", length = 64)
    private String transferSyntaxUid;

    @Column(name = "SOURCEAPPLICATIONENTITYTITLE", length = 16)
    private String sourceApplicationEntityTitle;

    @Column(name = "LOSSYIMAGECOMPRESSION", length = 64)
    private String lossyImageCompression;

    @Column(name = "SAMPLEPERPIXEL")
    private Long samplePerPixel;

    @Column(name = "PHOTOMETRICINTERPRETATION", length = 16)
    private String photometricInterpretation;

    @Column(name = "BITSSTORED")
    private Long bitsStored;

    @Column(name = "HIGHBIT")
    private Long highBit;

    @Column(name = "PIXELREPRESENTATION")
    private Long pixelRepresentation;

    @Column(name = "PLANARCONFIGURATION")
    private Long planarConfiguration;

    @Column(name = "FRAMECNT")
    private Long frameCnt;

    @Column(name = "GEOMSTATUS")
    private Long geomStatus;

    @Column(name = "ARCHSTATUS")
    private Long archStatus;

    @Column(name = "ARCHPATH", length = 255)
    private String archPath;

    @Column(name = "DELFLAG")
    private Long delFlag;

    @Column(name = "VERIFYFLAG")
    private Long verifyFlag;

    @Column(name = "HIDEFLAG")
    private Long hideFlag;

    @Column(name = "KEYFLAG")
    private Long keyFlag;

    @Column(name = "COMPSTATUS")
    private Long compStatus;

    @Column(name = "PRESENTATIONSTATEDATA", length = 255)
    private String presentationStateData;

    @Column(name = "SHARPENVALUE")
    private Long sharpenValue;

    @Column(name = "LUTDATA", length = 255)
    private String lutData;

    @Column(name = "IMAGESIZE")
    private Long imageSize;

    @Column(name = "COMPSIZE")
    private Long compSize;

    @Column(name = "MOVPATH", length = 255)
    private String movPath;

    @Column(name = "MOVFNAME", length = 255)
    private String movFName;

    @Column(name = "MOVIEFLAG")
    private Long movieFlag;

    @Column(name = "CODECTYPE", length = 128)
    private String codecType;

    @Column(name = "FRAMERATE")
    private Float frameRate;

    @Column(name = "FRAMETIME")
    private Float frameTime;

    @Column(name = "RECSTARTDATE", length = 8)
    private String recStartDate;

    @Column(name = "RECSTARTTIME", length = 6)
    private String recStartTime;

    @Column(name = "RECENDDATE", length = 8)
    private String recEndDate;

    @Column(name = "RECENDTIME", length = 6)
    private String recEndTime;

    @Column(name = "MOVSTSTORAGEID")
    private Long movStStorageId;

    @Column(name = "LTSTORAGEID", columnDefinition = "NUMBER(*,0) DEFAULT 0")
    private Long ltStorageId;

    @Column(name = "STSTORAGEID")
    private Long stStorageId;

    @Column(name = "WEBSTORAGEID")
    private Long webStorageId;

    @Column(name = "INSERTDATE", length = 8)
    private String insertDate;

    @Column(name = "INSERTTIME", length = 8)
    private String insertTime;

    @Column(name = "INSERTED", length = 14)
    private String inserted;

    @Column(name = "UPDATED", length = 14)
    private String updated;

    @Column(name = "HOSPITALID", columnDefinition = "NUMBER(*,0) DEFAULT 0")
    private Long hospitalId;

    // RESERVED fields
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

    @Column(name = "PHOTOMETRIC")
    private Long photometric;

    @Column(name = "PATIENTORIENTATION", length = 64)
    private String patientOrientation;

    @Column(name = "PRESENTATIONLUTSHAPE", length = 16)
    private String presentationLutShape;

    @Column(name = "INSTANCECREATIONDATE", length = 8)
    private String instanceCreationDate;

    @Column(name = "INSTANCECREATIONTIME", length = 14)
    private String instanceCreationTime;

    @Column(name = "SOURCEAETITLE", length = 64)
    private String sourceAeTitle;

    @Column(name = "AI_SCORE")
    private Long aiScore;

    @Column(name = "AI_FINDING_COUNT")
    private Long aiFindingCount;

    @Column(name = "REPORTSTATUS", length = 255)
    private String reportStatus;
}