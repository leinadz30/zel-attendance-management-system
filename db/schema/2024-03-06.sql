PGDMP     6                    |            zamsdb    15.4    15.4 �    r           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            s           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            t           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            u           1262    28397    zamsdb    DATABASE     �   CREATE DATABASE zamsdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE zamsdb;
                postgres    false                        2615    28398    dbo    SCHEMA        CREATE SCHEMA dbo;
    DROP SCHEMA dbo;
                postgres    false                       1255    28806    usp_reset() 	   PROCEDURE     *
  CREATE PROCEDURE dbo.usp_reset()
    LANGUAGE plpgsql
    AS $_$
begin

	DELETE FROM dbo."LinkStudentRequest";
	DELETE FROM dbo."EmployeeUser";
	DELETE FROM dbo."UserFirebaseToken";
	DELETE FROM dbo."StudentStrand";
	DELETE FROM dbo."Strands";
	DELETE FROM dbo."StudentCourse";
	DELETE FROM dbo."StudentSection";
	DELETE FROM dbo."SchoolRequestAccess";
	DELETE FROM dbo."Operators";
	DELETE FROM dbo."TapLogs";
	DELETE FROM dbo."Machines";
	DELETE FROM dbo."Notifications";
	DELETE FROM dbo."UserFirebaseToken";
	DELETE FROM dbo."UserOneSignalSubscription";
	DELETE FROM dbo."ParentStudent";
	DELETE FROM dbo."Parents";
	DELETE FROM dbo."Students";
	DELETE FROM dbo."Courses";
	DELETE FROM dbo."Sections";
	DELETE FROM dbo."EmployeeUser";
	DELETE FROM dbo."Employees";
	DELETE FROM dbo."EmployeeUserAccess";
	DELETE FROM dbo."EmployeeTitles";
	DELETE FROM dbo."Departments";
	DELETE FROM dbo."SchoolYearLevels";
	DELETE FROM dbo."Schools";
	DELETE FROM dbo."UserProfilePic";
	DELETE FROM dbo."Files";
	DELETE FROM dbo."Users";
	
	ALTER SEQUENCE dbo."Strands_StrandId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Files_FileId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."LinkStudentRequest_LinkStudentRequestId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Operators_OperatorId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Schools_SchoolId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."SchoolYearLevels_SchoolYearLevelId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."EmployeeUserAccess_EmployeeUserAccessId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Departments_DepartmentId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Sections_SectionId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Courses_CourseId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Users_UserId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Employees_EmployeeId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."EmployeeTitles_EmployeeTitleId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Students_StudentId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Parents_ParentId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Notifications_NotificationId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Machines_MachineId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."TapLogs_TapLogId_seq" RESTART WITH 1;
	
	INSERT INTO dbo."Users" (
		"UserCode",
		"UserName",
		"Password", 
		"UserType",
		"DateRegistered")
	VALUES (
			'000001',
			'admin',
			'$2b$10$LqN3kzfgaYnP5PfDZFfT4edUFqh5Lu7amIxeDDDmu/KEqQFze.p8a',  
			'OPERATOR',
			(now() AT TIME ZONE 'Asia/Manila'::text)
	);

	INSERT INTO dbo."Operators" (
		"OperatorCode",
		"UserId",
		"Name")
	VALUES (
			'000001',
			1,
			'Admin Admin'
	);
	
END;
$_$;
     DROP PROCEDURE dbo.usp_reset();
       dbo          postgres    false    6                       1259    72358    Announcements    TABLE     5  CREATE TABLE dbo."Announcements" (
    "AnnouncementId" bigint NOT NULL,
    "AnnouncementCode" character varying,
    "SchoolId" bigint NOT NULL,
    "Title" character varying NOT NULL,
    "Description" character varying NOT NULL,
    "TargetDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "TargetType" character varying NOT NULL,
    "TargetIds" character varying[] NOT NULL,
    "Scheduled" boolean DEFAULT false NOT NULL,
    "CreatedDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "CreatedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Draft" boolean DEFAULT false NOT NULL,
    "Sent" boolean DEFAULT false NOT NULL,
    "Active" boolean DEFAULT true NOT NULL
);
     DROP TABLE dbo."Announcements";
       dbo         heap    postgres    false    6                       1259    72357     Announcements_AnnouncementId_seq    SEQUENCE     �   ALTER TABLE dbo."Announcements" ALTER COLUMN "AnnouncementId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Announcements_AnnouncementId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    259            �            1259    28439    Courses    TABLE     �  CREATE TABLE dbo."Courses" (
    "CourseId" bigint NOT NULL,
    "CourseCode" character varying,
    "SchoolId" bigint NOT NULL,
    "Name" character varying NOT NULL,
    "CreatedDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "CreatedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Active" boolean DEFAULT true NOT NULL
);
    DROP TABLE dbo."Courses";
       dbo         heap    postgres    false    6            �            1259    28438    Courses_CourseId_seq    SEQUENCE     �   ALTER TABLE dbo."Courses" ALTER COLUMN "CourseId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Courses_CourseId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    224            �            1259    28420    Departments    TABLE     �  CREATE TABLE dbo."Departments" (
    "DepartmentId" bigint NOT NULL,
    "DepartmentCode" character varying,
    "SchoolId" bigint NOT NULL,
    "DepartmentName" character varying NOT NULL,
    "CreatedDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "CreatedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Active" boolean DEFAULT true NOT NULL
);
    DROP TABLE dbo."Departments";
       dbo         heap    postgres    false    6            �            1259    28419    Departments_DepartmentId_seq    SEQUENCE     �   ALTER TABLE dbo."Departments" ALTER COLUMN "DepartmentId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Departments_DepartmentId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    220    6            �            1259    28929    EmployeeTitles    TABLE     �  CREATE TABLE dbo."EmployeeTitles" (
    "EmployeeTitleId" bigint NOT NULL,
    "EmployeeTitleCode" character varying,
    "Name" character varying NOT NULL,
    "CreatedDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "CreatedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Active" boolean DEFAULT true NOT NULL,
    "SchoolId" bigint NOT NULL
);
 !   DROP TABLE dbo."EmployeeTitles";
       dbo         heap    postgres    false    6            �            1259    28928 "   EmployeeTitles_EmployeeTitleId_seq    SEQUENCE     �   ALTER TABLE dbo."EmployeeTitles" ALTER COLUMN "EmployeeTitleId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."EmployeeTitles_EmployeeTitleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    242    6                       1259    84594    EmployeeUser    TABLE       CREATE TABLE dbo."EmployeeUser" (
    "EmployeeId" bigint NOT NULL,
    "UserId" bigint NOT NULL,
    "DateRegistered" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "EmployeeUserAccessId" bigint,
    "Active" boolean DEFAULT true NOT NULL
);
    DROP TABLE dbo."EmployeeUser";
       dbo         heap    postgres    false    6                       1259    84679    EmployeeUserAccess    TABLE       CREATE TABLE dbo."EmployeeUserAccess" (
    "EmployeeUserAccessId" bigint NOT NULL,
    "EmployeeUserAccessCode" character varying,
    "Name" character varying NOT NULL,
    "AccessPages" json DEFAULT '[]'::json NOT NULL,
    "CreatedDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "CreatedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "SchoolId" bigint NOT NULL,
    "Active" boolean DEFAULT true NOT NULL
);
 %   DROP TABLE dbo."EmployeeUserAccess";
       dbo         heap    postgres    false    6                       1259    84678 +   EmployeeUserAccess_EmployeeUserAccessId_seq    SEQUENCE       ALTER TABLE dbo."EmployeeUserAccess" ALTER COLUMN "EmployeeUserAccessId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."EmployeeUserAccess_EmployeeUserAccessId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    262    6            �            1259    29001 	   Employees    TABLE     �  CREATE TABLE dbo."Employees" (
    "EmployeeId" bigint NOT NULL,
    "EmployeeCode" character varying,
    "EmployeePositionId" bigint,
    "FullName" character varying NOT NULL,
    "CreatedDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "CreatedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "SchoolId" bigint NOT NULL,
    "Active" boolean DEFAULT true NOT NULL,
    "AccessGranted" boolean DEFAULT false NOT NULL,
    "MobileNumber" character varying DEFAULT 0,
    "CardNumber" character varying,
    "DepartmentId" bigint,
    "OrgEmployeeId" character varying DEFAULT ''::character varying
);
    DROP TABLE dbo."Employees";
       dbo         heap    postgres    false    6            �            1259    29000    Employees_EmployeeId_seq    SEQUENCE     �   ALTER TABLE dbo."Employees" ALTER COLUMN "EmployeeId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Employees_EmployeeId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    244    6            �            1259    38810    Files    TABLE     i   CREATE TABLE dbo."Files" (
    "FileId" bigint NOT NULL,
    "FileName" text NOT NULL,
    "Url" text
);
    DROP TABLE dbo."Files";
       dbo         heap    postgres    false    6            �            1259    38809    Files_FileId_seq    SEQUENCE     �   ALTER TABLE dbo."Files" ALTER COLUMN "FileId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Files_FileId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    255    6            �            1259    29942    LinkStudentRequest    TABLE       CREATE TABLE dbo."LinkStudentRequest" (
    "LinkStudentRequestId" bigint NOT NULL,
    "SchoolId" bigint NOT NULL,
    "StudentId" bigint NOT NULL,
    "Status" character varying DEFAULT 'PENDING'::character varying NOT NULL,
    "DateRequested" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "RequestedByParentId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Notes" character varying,
    "LinkStudentRequestCode" character varying
);
 %   DROP TABLE dbo."LinkStudentRequest";
       dbo         heap    postgres    false    6            �            1259    29971 +   LinkStudentRequest_LinkStudentRequestId_seq    SEQUENCE       ALTER TABLE dbo."LinkStudentRequest" ALTER COLUMN "LinkStudentRequestId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."LinkStudentRequest_LinkStudentRequestId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    249            �            1259    28759    Machines    TABLE     �  CREATE TABLE dbo."Machines" (
    "MachineId" bigint NOT NULL,
    "MachineCode" character varying,
    "SchoolId" bigint NOT NULL,
    "Description" character varying NOT NULL,
    "Path" character varying,
    "Domain" character varying,
    "CreatedDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "CreatedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Active" boolean DEFAULT true NOT NULL
);
    DROP TABLE dbo."Machines";
       dbo         heap    postgres    false    6            �            1259    28758    Machines_MachineId_seq    SEQUENCE     �   ALTER TABLE dbo."Machines" ALTER COLUMN "MachineId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Machines_MachineId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    236    6            �            1259    28524    Notifications    TABLE     �  CREATE TABLE dbo."Notifications" (
    "NotificationId" bigint NOT NULL,
    "ForUserId" bigint NOT NULL,
    "Type" character varying NOT NULL,
    "Title" character varying NOT NULL,
    "Description" character varying NOT NULL,
    "DateTime" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "IsRead" boolean DEFAULT false NOT NULL,
    "Active" boolean DEFAULT true NOT NULL,
    "ReferenceId" character varying DEFAULT ''::character varying NOT NULL
);
     DROP TABLE dbo."Notifications";
       dbo         heap    postgres    false    6            �            1259    28523     Notifications_NotificationId_seq    SEQUENCE     �   ALTER TABLE dbo."Notifications" ALTER COLUMN "NotificationId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Notifications_NotificationId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    233    6            �            1259    28836 	   Operators    TABLE     �   CREATE TABLE dbo."Operators" (
    "OperatorId" bigint NOT NULL,
    "OperatorCode" character varying,
    "UserId" bigint NOT NULL,
    "Name" character varying NOT NULL,
    "Active" boolean DEFAULT true NOT NULL
);
    DROP TABLE dbo."Operators";
       dbo         heap    postgres    false    6            �            1259    28835    Operators_OperatorId_seq    SEQUENCE     �   ALTER TABLE dbo."Operators" ALTER COLUMN "OperatorId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Operators_OperatorId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    240    6            �            1259    28516    ParentStudent    TABLE     �   CREATE TABLE dbo."ParentStudent" (
    "ParentId" bigint NOT NULL,
    "StudentId" bigint NOT NULL,
    "DateAdded" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "Active" boolean DEFAULT true NOT NULL
);
     DROP TABLE dbo."ParentStudent";
       dbo         heap    postgres    false    6            �            1259    28507    Parents    TABLE     #  CREATE TABLE dbo."Parents" (
    "ParentId" bigint NOT NULL,
    "ParentCode" character varying,
    "UserId" bigint NOT NULL,
    "FullName" character varying DEFAULT ''::character varying NOT NULL,
    "MobileNumber" character varying NOT NULL,
    "Email" character varying,
    "RegistrationDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "RegisteredByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Active" boolean DEFAULT true NOT NULL
);
    DROP TABLE dbo."Parents";
       dbo         heap    postgres    false    6            �            1259    28506    Parents_ParentId_seq    SEQUENCE     �   ALTER TABLE dbo."Parents" ALTER COLUMN "ParentId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Parents_ParentId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    230    6            �            1259    29154    SchoolRequestAccess    TABLE     |  CREATE TABLE dbo."SchoolRequestAccess" (
    "SchoolRequestAccessId" bigint NOT NULL,
    "SchoolId" bigint NOT NULL,
    "Status" character varying NOT NULL,
    "DateRequested" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "RequestedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint
);
 &   DROP TABLE dbo."SchoolRequestAccess";
       dbo         heap    postgres    false    6            �            1259    29153 -   SchoolRequestAccess_SchoolRequestAccessId_seq    SEQUENCE       ALTER TABLE dbo."SchoolRequestAccess" ALTER COLUMN "SchoolRequestAccessId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."SchoolRequestAccess_SchoolRequestAccessId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    248    6            �            1259    28409    SchoolYearLevels    TABLE       CREATE TABLE dbo."SchoolYearLevels" (
    "SchoolYearLevelId" bigint NOT NULL,
    "SchoolYearLevelCode" character varying,
    "SchoolId" bigint NOT NULL,
    "Name" character varying,
    "CreatedDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "CreatedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Active" boolean DEFAULT true NOT NULL,
    "EducationalStage" character varying DEFAULT ''::character varying NOT NULL
);
 #   DROP TABLE dbo."SchoolYearLevels";
       dbo         heap    postgres    false    6            �            1259    28408 &   SchoolYearLevels_SchoolYearLevelId_seq    SEQUENCE     �   ALTER TABLE dbo."SchoolYearLevels" ALTER COLUMN "SchoolYearLevelId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."SchoolYearLevels_SchoolYearLevelId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    218    6            �            1259    28400    Schools    TABLE       CREATE TABLE dbo."Schools" (
    "SchoolId" bigint NOT NULL,
    "SchoolCode" character varying,
    "SchoolName" character varying NOT NULL,
    "StudentsAllowableTimeLate" character varying,
    "StudentsTimeLate" character varying,
    "RestrictGuardianTime" boolean,
    "EmployeesTimeBeforeSwipeIsAllowed" character varying,
    "EmployeesAllowableTimeLate" character varying,
    "EmployeesTimeLate" character varying,
    "TimeBeforeSwipeIsAllowed" character varying,
    "SMSNotificationForStaffEntry" character varying,
    "SMSNotificationForStudentBreakTime" character varying,
    "SchoolContactNumber" character varying,
    "SchoolAddress" character varying,
    "SchoolEmail" character varying,
    "DateRegistered" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "RegisteredByUserId" bigint NOT NULL,
    "DateUpdated" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Active" boolean DEFAULT true NOT NULL,
    "OrgSchoolCode" character varying DEFAULT ''::character varying NOT NULL
);
    DROP TABLE dbo."Schools";
       dbo         heap    postgres    false    6            �            1259    28399    Schools_SchoolId_seq    SEQUENCE     �   ALTER TABLE dbo."Schools" ALTER COLUMN "SchoolId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Schools_SchoolId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    216    6            �            1259    28430    Sections    TABLE       CREATE TABLE dbo."Sections" (
    "SectionId" bigint NOT NULL,
    "SectionCode" character varying,
    "DepartmentId" bigint,
    "SchoolYearLevelId" bigint,
    "SectionName" character varying NOT NULL,
    "AdviserEmployeeId" bigint,
    "CreatedDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "CreatedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Active" boolean DEFAULT true NOT NULL,
    "SchoolId" bigint NOT NULL
);
    DROP TABLE dbo."Sections";
       dbo         heap    postgres    false    6            �            1259    28429    Sections_SectionId_seq    SEQUENCE     �   ALTER TABLE dbo."Sections" ALTER COLUMN "SectionId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Sections_SectionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    222    6            �            1259    38760    Strands    TABLE     �  CREATE TABLE dbo."Strands" (
    "StrandId" bigint NOT NULL,
    "StrandCode" character varying,
    "SchoolId" bigint NOT NULL,
    "Name" character varying NOT NULL,
    "CreatedDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "CreatedByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Active" boolean DEFAULT true NOT NULL
);
    DROP TABLE dbo."Strands";
       dbo         heap    postgres    false    6            �            1259    38759    Strands_StrandId_seq    SEQUENCE     �   ALTER TABLE dbo."Strands" ALTER COLUMN "StrandId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Strands_StrandId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    253            �            1259    29066    StudentCourse    TABLE     �   CREATE TABLE dbo."StudentCourse" (
    "StudentId" bigint NOT NULL,
    "CourseId" bigint NOT NULL,
    "EnrolledDate" date DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL
);
     DROP TABLE dbo."StudentCourse";
       dbo         heap    postgres    false    6            �            1259    29051    StudentSection    TABLE     �   CREATE TABLE dbo."StudentSection" (
    "StudentId" bigint NOT NULL,
    "SectionId" bigint NOT NULL,
    "DateAdded" date DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL
);
 !   DROP TABLE dbo."StudentSection";
       dbo         heap    postgres    false    6            �            1259    38756    StudentStrand    TABLE     �   CREATE TABLE dbo."StudentStrand" (
    "StudentId" bigint NOT NULL,
    "StrandId" bigint NOT NULL,
    "EnrolledDate" date DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL
);
     DROP TABLE dbo."StudentStrand";
       dbo         heap    postgres    false    6            �            1259    28495    Students    TABLE     �  CREATE TABLE dbo."Students" (
    "StudentId" bigint NOT NULL,
    "StudentCode" character varying,
    "DepartmentId" bigint,
    "FirstName" character varying NOT NULL,
    "MiddleInitial" character varying,
    "LastName" character varying NOT NULL,
    "CardNumber" character varying,
    "MobileNumber" character varying,
    "Email" character varying,
    "Address" character varying,
    "AccessGranted" boolean DEFAULT false,
    "RegistrationDate" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "RegisteredByUserId" bigint NOT NULL,
    "UpdatedDate" timestamp with time zone,
    "UpdatedByUserId" bigint,
    "Active" boolean DEFAULT true NOT NULL,
    "SchoolId" bigint NOT NULL,
    "SchoolYearLevelId" bigint,
    "FullName" character varying DEFAULT ''::character varying NOT NULL,
    "OrgStudentId" character varying DEFAULT ''::character varying
);
    DROP TABLE dbo."Students";
       dbo         heap    postgres    false    6            �            1259    28494    Students_StudentId_seq    SEQUENCE     �   ALTER TABLE dbo."Students" ALTER COLUMN "StudentId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Students_StudentId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    228    6            �            1259    28769    TapLogs    TABLE     �  CREATE TABLE dbo."TapLogs" (
    "TapLogId" bigint NOT NULL,
    "Status" character varying NOT NULL,
    "MachineId" bigint NOT NULL,
    "Date" date DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "Time" character varying NOT NULL,
    "CardNumber" character varying DEFAULT ''::character varying NOT NULL,
    "Type" character varying DEFAULT ''::character varying NOT NULL
);
    DROP TABLE dbo."TapLogs";
       dbo         heap    postgres    false    6            �            1259    28768    TapLogs_TapLogId_seq    SEQUENCE     �   ALTER TABLE dbo."TapLogs" ALTER COLUMN "TapLogId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."TapLogs_TapLogId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    238            �            1259    28534    UserFirebaseToken    TABLE     �   CREATE TABLE dbo."UserFirebaseToken" (
    "UserId" bigint NOT NULL,
    "FirebaseToken" character varying NOT NULL,
    "Device" character varying NOT NULL
);
 $   DROP TABLE dbo."UserFirebaseToken";
       dbo         heap    postgres    false    6                       1259    39458    UserOneSignalSubscription    TABLE     �   CREATE TABLE dbo."UserOneSignalSubscription" (
    "UserId" bigint NOT NULL,
    "SubscriptionID" character varying NOT NULL
);
 ,   DROP TABLE dbo."UserOneSignalSubscription";
       dbo         heap    postgres    false    6                        1259    38817    UserProfilePic    TABLE     b   CREATE TABLE dbo."UserProfilePic" (
    "UserId" bigint NOT NULL,
    "FileId" bigint NOT NULL
);
 !   DROP TABLE dbo."UserProfilePic";
       dbo         heap    postgres    false    6            �            1259    28448    Users    TABLE     �  CREATE TABLE dbo."Users" (
    "UserId" bigint NOT NULL,
    "UserCode" character varying,
    "UserName" character varying NOT NULL,
    "Password" character varying NOT NULL,
    "UserType" character varying NOT NULL,
    "DateRegistered" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "DateUpdated" timestamp with time zone,
    "Active" boolean DEFAULT true NOT NULL
);
    DROP TABLE dbo."Users";
       dbo         heap    postgres    false    6            �            1259    28447    Users_UserId_seq    SEQUENCE     �   ALTER TABLE dbo."Users" ALTER COLUMN "UserId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Users_UserId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    226    6            l          0    72358    Announcements 
   TABLE DATA             COPY dbo."Announcements" ("AnnouncementId", "AnnouncementCode", "SchoolId", "Title", "Description", "TargetDate", "TargetType", "TargetIds", "Scheduled", "CreatedDate", "CreatedByUserId", "UpdatedDate", "UpdatedByUserId", "Draft", "Sent", "Active") FROM stdin;
    dbo          postgres    false    259   �N      I          0    28439    Courses 
   TABLE DATA           �   COPY dbo."Courses" ("CourseId", "CourseCode", "SchoolId", "Name", "CreatedDate", "CreatedByUserId", "UpdatedDate", "UpdatedByUserId", "Active") FROM stdin;
    dbo          postgres    false    224   	O      E          0    28420    Departments 
   TABLE DATA           �   COPY dbo."Departments" ("DepartmentId", "DepartmentCode", "SchoolId", "DepartmentName", "CreatedDate", "CreatedByUserId", "UpdatedDate", "UpdatedByUserId", "Active") FROM stdin;
    dbo          postgres    false    220   &O      [          0    28929    EmployeeTitles 
   TABLE DATA           �   COPY dbo."EmployeeTitles" ("EmployeeTitleId", "EmployeeTitleCode", "Name", "CreatedDate", "CreatedByUserId", "UpdatedDate", "UpdatedByUserId", "Active", "SchoolId") FROM stdin;
    dbo          postgres    false    242   CO      m          0    84594    EmployeeUser 
   TABLE DATA           q   COPY dbo."EmployeeUser" ("EmployeeId", "UserId", "DateRegistered", "EmployeeUserAccessId", "Active") FROM stdin;
    dbo          postgres    false    260   `O      o          0    84679    EmployeeUserAccess 
   TABLE DATA           �   COPY dbo."EmployeeUserAccess" ("EmployeeUserAccessId", "EmployeeUserAccessCode", "Name", "AccessPages", "CreatedDate", "CreatedByUserId", "UpdatedDate", "UpdatedByUserId", "SchoolId", "Active") FROM stdin;
    dbo          postgres    false    262   }O      ]          0    29001 	   Employees 
   TABLE DATA             COPY dbo."Employees" ("EmployeeId", "EmployeeCode", "EmployeePositionId", "FullName", "CreatedDate", "CreatedByUserId", "UpdatedDate", "UpdatedByUserId", "SchoolId", "Active", "AccessGranted", "MobileNumber", "CardNumber", "DepartmentId", "OrgEmployeeId") FROM stdin;
    dbo          postgres    false    244   �O      h          0    38810    Files 
   TABLE DATA           ;   COPY dbo."Files" ("FileId", "FileName", "Url") FROM stdin;
    dbo          postgres    false    255   �O      b          0    29942    LinkStudentRequest 
   TABLE DATA           �   COPY dbo."LinkStudentRequest" ("LinkStudentRequestId", "SchoolId", "StudentId", "Status", "DateRequested", "RequestedByParentId", "UpdatedDate", "UpdatedByUserId", "Notes", "LinkStudentRequestCode") FROM stdin;
    dbo          postgres    false    249   �O      U          0    28759    Machines 
   TABLE DATA           �   COPY dbo."Machines" ("MachineId", "MachineCode", "SchoolId", "Description", "Path", "Domain", "CreatedDate", "CreatedByUserId", "UpdatedDate", "UpdatedByUserId", "Active") FROM stdin;
    dbo          postgres    false    236   �O      R          0    28524    Notifications 
   TABLE DATA           �   COPY dbo."Notifications" ("NotificationId", "ForUserId", "Type", "Title", "Description", "DateTime", "IsRead", "Active", "ReferenceId") FROM stdin;
    dbo          postgres    false    233   P      Y          0    28836 	   Operators 
   TABLE DATA           \   COPY dbo."Operators" ("OperatorId", "OperatorCode", "UserId", "Name", "Active") FROM stdin;
    dbo          postgres    false    240   +P      P          0    28516    ParentStudent 
   TABLE DATA           V   COPY dbo."ParentStudent" ("ParentId", "StudentId", "DateAdded", "Active") FROM stdin;
    dbo          postgres    false    231   [P      O          0    28507    Parents 
   TABLE DATA           �   COPY dbo."Parents" ("ParentId", "ParentCode", "UserId", "FullName", "MobileNumber", "Email", "RegistrationDate", "RegisteredByUserId", "UpdatedDate", "UpdatedByUserId", "Active") FROM stdin;
    dbo          postgres    false    230   xP      a          0    29154    SchoolRequestAccess 
   TABLE DATA           �   COPY dbo."SchoolRequestAccess" ("SchoolRequestAccessId", "SchoolId", "Status", "DateRequested", "RequestedByUserId", "UpdatedDate", "UpdatedByUserId") FROM stdin;
    dbo          postgres    false    248   �P      C          0    28409    SchoolYearLevels 
   TABLE DATA           �   COPY dbo."SchoolYearLevels" ("SchoolYearLevelId", "SchoolYearLevelCode", "SchoolId", "Name", "CreatedDate", "CreatedByUserId", "UpdatedDate", "UpdatedByUserId", "Active", "EducationalStage") FROM stdin;
    dbo          postgres    false    218   �P      A          0    28400    Schools 
   TABLE DATA           �  COPY dbo."Schools" ("SchoolId", "SchoolCode", "SchoolName", "StudentsAllowableTimeLate", "StudentsTimeLate", "RestrictGuardianTime", "EmployeesTimeBeforeSwipeIsAllowed", "EmployeesAllowableTimeLate", "EmployeesTimeLate", "TimeBeforeSwipeIsAllowed", "SMSNotificationForStaffEntry", "SMSNotificationForStudentBreakTime", "SchoolContactNumber", "SchoolAddress", "SchoolEmail", "DateRegistered", "RegisteredByUserId", "DateUpdated", "UpdatedByUserId", "Active", "OrgSchoolCode") FROM stdin;
    dbo          postgres    false    216   �P      G          0    28430    Sections 
   TABLE DATA           �   COPY dbo."Sections" ("SectionId", "SectionCode", "DepartmentId", "SchoolYearLevelId", "SectionName", "AdviserEmployeeId", "CreatedDate", "CreatedByUserId", "UpdatedDate", "UpdatedByUserId", "Active", "SchoolId") FROM stdin;
    dbo          postgres    false    222   �P      f          0    38760    Strands 
   TABLE DATA           �   COPY dbo."Strands" ("StrandId", "StrandCode", "SchoolId", "Name", "CreatedDate", "CreatedByUserId", "UpdatedDate", "UpdatedByUserId", "Active") FROM stdin;
    dbo          postgres    false    253   	Q      _          0    29066    StudentCourse 
   TABLE DATA           O   COPY dbo."StudentCourse" ("StudentId", "CourseId", "EnrolledDate") FROM stdin;
    dbo          postgres    false    246   &Q      ^          0    29051    StudentSection 
   TABLE DATA           N   COPY dbo."StudentSection" ("StudentId", "SectionId", "DateAdded") FROM stdin;
    dbo          postgres    false    245   CQ      d          0    38756    StudentStrand 
   TABLE DATA           O   COPY dbo."StudentStrand" ("StudentId", "StrandId", "EnrolledDate") FROM stdin;
    dbo          postgres    false    251   `Q      M          0    28495    Students 
   TABLE DATA           M  COPY dbo."Students" ("StudentId", "StudentCode", "DepartmentId", "FirstName", "MiddleInitial", "LastName", "CardNumber", "MobileNumber", "Email", "Address", "AccessGranted", "RegistrationDate", "RegisteredByUserId", "UpdatedDate", "UpdatedByUserId", "Active", "SchoolId", "SchoolYearLevelId", "FullName", "OrgStudentId") FROM stdin;
    dbo          postgres    false    228   }Q      W          0    28769    TapLogs 
   TABLE DATA           i   COPY dbo."TapLogs" ("TapLogId", "Status", "MachineId", "Date", "Time", "CardNumber", "Type") FROM stdin;
    dbo          postgres    false    238   �Q      S          0    28534    UserFirebaseToken 
   TABLE DATA           O   COPY dbo."UserFirebaseToken" ("UserId", "FirebaseToken", "Device") FROM stdin;
    dbo          postgres    false    234   �Q      j          0    39458    UserOneSignalSubscription 
   TABLE DATA           N   COPY dbo."UserOneSignalSubscription" ("UserId", "SubscriptionID") FROM stdin;
    dbo          postgres    false    257   �Q      i          0    38817    UserProfilePic 
   TABLE DATA           ;   COPY dbo."UserProfilePic" ("UserId", "FileId") FROM stdin;
    dbo          postgres    false    256   �Q      K          0    28448    Users 
   TABLE DATA           �   COPY dbo."Users" ("UserId", "UserCode", "UserName", "Password", "UserType", "DateRegistered", "DateUpdated", "Active") FROM stdin;
    dbo          postgres    false    226   R      v           0    0     Announcements_AnnouncementId_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('dbo."Announcements_AnnouncementId_seq"', 1, false);
          dbo          postgres    false    258            w           0    0    Courses_CourseId_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('dbo."Courses_CourseId_seq"', 1, false);
          dbo          postgres    false    223            x           0    0    Departments_DepartmentId_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('dbo."Departments_DepartmentId_seq"', 1, false);
          dbo          postgres    false    219            y           0    0 "   EmployeeTitles_EmployeeTitleId_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('dbo."EmployeeTitles_EmployeeTitleId_seq"', 1, false);
          dbo          postgres    false    241            z           0    0 +   EmployeeUserAccess_EmployeeUserAccessId_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('dbo."EmployeeUserAccess_EmployeeUserAccessId_seq"', 1, false);
          dbo          postgres    false    261            {           0    0    Employees_EmployeeId_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('dbo."Employees_EmployeeId_seq"', 1, false);
          dbo          postgres    false    243            |           0    0    Files_FileId_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('dbo."Files_FileId_seq"', 1, false);
          dbo          postgres    false    254            }           0    0 +   LinkStudentRequest_LinkStudentRequestId_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('dbo."LinkStudentRequest_LinkStudentRequestId_seq"', 1, false);
          dbo          postgres    false    250            ~           0    0    Machines_MachineId_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('dbo."Machines_MachineId_seq"', 1, false);
          dbo          postgres    false    235                       0    0     Notifications_NotificationId_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('dbo."Notifications_NotificationId_seq"', 1, false);
          dbo          postgres    false    232            �           0    0    Operators_OperatorId_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('dbo."Operators_OperatorId_seq"', 1, true);
          dbo          postgres    false    239            �           0    0    Parents_ParentId_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('dbo."Parents_ParentId_seq"', 1, false);
          dbo          postgres    false    229            �           0    0 -   SchoolRequestAccess_SchoolRequestAccessId_seq    SEQUENCE SET     [   SELECT pg_catalog.setval('dbo."SchoolRequestAccess_SchoolRequestAccessId_seq"', 1, false);
          dbo          postgres    false    247            �           0    0 &   SchoolYearLevels_SchoolYearLevelId_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('dbo."SchoolYearLevels_SchoolYearLevelId_seq"', 1, false);
          dbo          postgres    false    217            �           0    0    Schools_SchoolId_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('dbo."Schools_SchoolId_seq"', 1, false);
          dbo          postgres    false    215            �           0    0    Sections_SectionId_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('dbo."Sections_SectionId_seq"', 1, false);
          dbo          postgres    false    221            �           0    0    Strands_StrandId_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('dbo."Strands_StrandId_seq"', 1, false);
          dbo          postgres    false    252            �           0    0    Students_StudentId_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('dbo."Students_StudentId_seq"', 1, false);
          dbo          postgres    false    227            �           0    0    TapLogs_TapLogId_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('dbo."TapLogs_TapLogId_seq"', 1, false);
          dbo          postgres    false    237            �           0    0    Users_UserId_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('dbo."Users_UserId_seq"', 1, true);
          dbo          postgres    false    225            e           2606    72370     Announcements Announcements_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY dbo."Announcements"
    ADD CONSTRAINT "Announcements_pkey" PRIMARY KEY ("AnnouncementId");
 K   ALTER TABLE ONLY dbo."Announcements" DROP CONSTRAINT "Announcements_pkey";
       dbo            postgres    false    259            -           2606    28446    Courses Courses_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY dbo."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY ("CourseId");
 ?   ALTER TABLE ONLY dbo."Courses" DROP CONSTRAINT "Courses_pkey";
       dbo            postgres    false    224            (           2606    28427    Departments Departments_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY dbo."Departments"
    ADD CONSTRAINT "Departments_pkey" PRIMARY KEY ("DepartmentId");
 G   ALTER TABLE ONLY dbo."Departments" DROP CONSTRAINT "Departments_pkey";
       dbo            postgres    false    220            F           2606    28937 "   EmployeeTitles EmployeeTitles_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY dbo."EmployeeTitles"
    ADD CONSTRAINT "EmployeeTitles_pkey" PRIMARY KEY ("EmployeeTitleId");
 M   ALTER TABLE ONLY dbo."EmployeeTitles" DROP CONSTRAINT "EmployeeTitles_pkey";
       dbo            postgres    false    242            k           2606    84688 *   EmployeeUserAccess EmployeeUserAccess_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY dbo."EmployeeUserAccess"
    ADD CONSTRAINT "EmployeeUserAccess_pkey" PRIMARY KEY ("EmployeeUserAccessId");
 U   ALTER TABLE ONLY dbo."EmployeeUserAccess" DROP CONSTRAINT "EmployeeUserAccess_pkey";
       dbo            postgres    false    262            g           2606    84599    EmployeeUser EmployeeUser_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY dbo."EmployeeUser"
    ADD CONSTRAINT "EmployeeUser_pkey" PRIMARY KEY ("EmployeeId", "UserId");
 I   ALTER TABLE ONLY dbo."EmployeeUser" DROP CONSTRAINT "EmployeeUser_pkey";
       dbo            postgres    false    260    260            H           2606    29010    Employees Employees_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY dbo."Employees"
    ADD CONSTRAINT "Employees_pkey" PRIMARY KEY ("EmployeeId");
 C   ALTER TABLE ONLY dbo."Employees" DROP CONSTRAINT "Employees_pkey";
       dbo            postgres    false    244            V           2606    29950 *   LinkStudentRequest LinkStudentRequest_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY dbo."LinkStudentRequest"
    ADD CONSTRAINT "LinkStudentRequest_pkey" PRIMARY KEY ("LinkStudentRequestId");
 U   ALTER TABLE ONLY dbo."LinkStudentRequest" DROP CONSTRAINT "LinkStudentRequest_pkey";
       dbo            postgres    false    249            ?           2606    28767    Machines Machines_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY dbo."Machines"
    ADD CONSTRAINT "Machines_pkey" PRIMARY KEY ("MachineId");
 A   ALTER TABLE ONLY dbo."Machines" DROP CONSTRAINT "Machines_pkey";
       dbo            postgres    false    236            ;           2606    28533     Notifications Notifications_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY dbo."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY ("NotificationId");
 K   ALTER TABLE ONLY dbo."Notifications" DROP CONSTRAINT "Notifications_pkey";
       dbo            postgres    false    233            D           2606    28843    Operators Operators_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY dbo."Operators"
    ADD CONSTRAINT "Operators_pkey" PRIMARY KEY ("OperatorId");
 C   ALTER TABLE ONLY dbo."Operators" DROP CONSTRAINT "Operators_pkey";
       dbo            postgres    false    240            9           2606    28522     ParentStudent ParentStudent_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY dbo."ParentStudent"
    ADD CONSTRAINT "ParentStudent_pkey" PRIMARY KEY ("ParentId", "StudentId");
 K   ALTER TABLE ONLY dbo."ParentStudent" DROP CONSTRAINT "ParentStudent_pkey";
       dbo            postgres    false    231    231            5           2606    28515    Parents Parents_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY dbo."Parents"
    ADD CONSTRAINT "Parents_pkey" PRIMARY KEY ("ParentId");
 ?   ALTER TABLE ONLY dbo."Parents" DROP CONSTRAINT "Parents_pkey";
       dbo            postgres    false    230            T           2606    29161 ,   SchoolRequestAccess SchoolRequestAccess_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY dbo."SchoolRequestAccess"
    ADD CONSTRAINT "SchoolRequestAccess_pkey" PRIMARY KEY ("SchoolRequestAccessId");
 W   ALTER TABLE ONLY dbo."SchoolRequestAccess" DROP CONSTRAINT "SchoolRequestAccess_pkey";
       dbo            postgres    false    248            %           2606    28417 &   SchoolYearLevels SchoolYearLevels_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY dbo."SchoolYearLevels"
    ADD CONSTRAINT "SchoolYearLevels_pkey" PRIMARY KEY ("SchoolYearLevelId");
 Q   ALTER TABLE ONLY dbo."SchoolYearLevels" DROP CONSTRAINT "SchoolYearLevels_pkey";
       dbo            postgres    false    218            #           2606    28407    Schools Schools_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY dbo."Schools"
    ADD CONSTRAINT "Schools_pkey" PRIMARY KEY ("SchoolId");
 ?   ALTER TABLE ONLY dbo."Schools" DROP CONSTRAINT "Schools_pkey";
       dbo            postgres    false    216            +           2606    28437    Sections Sections_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY dbo."Sections"
    ADD CONSTRAINT "Sections_pkey" PRIMARY KEY ("SectionId");
 A   ALTER TABLE ONLY dbo."Sections" DROP CONSTRAINT "Sections_pkey";
       dbo            postgres    false    222            \           2606    38768    Strands Strands_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY dbo."Strands"
    ADD CONSTRAINT "Strands_pkey" PRIMARY KEY ("StrandId");
 ?   ALTER TABLE ONLY dbo."Strands" DROP CONSTRAINT "Strands_pkey";
       dbo            postgres    false    253            P           2606    29071     StudentCourse StudentCourse_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY dbo."StudentCourse"
    ADD CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("StudentId", "CourseId");
 K   ALTER TABLE ONLY dbo."StudentCourse" DROP CONSTRAINT "StudentCourse_pkey";
       dbo            postgres    false    246    246            L           2606    29055 "   StudentSection StudentSection_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY dbo."StudentSection"
    ADD CONSTRAINT "StudentSection_pkey" PRIMARY KEY ("StudentId", "SectionId");
 M   ALTER TABLE ONLY dbo."StudentSection" DROP CONSTRAINT "StudentSection_pkey";
       dbo            postgres    false    245    245            X           2606    38799     StudentStrand StudentStrand_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY dbo."StudentStrand"
    ADD CONSTRAINT "StudentStrand_pkey" PRIMARY KEY ("StudentId", "StrandId");
 K   ALTER TABLE ONLY dbo."StudentStrand" DROP CONSTRAINT "StudentStrand_pkey";
       dbo            postgres    false    251    251            3           2606    28505    Students Students_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY dbo."Students"
    ADD CONSTRAINT "Students_pkey" PRIMARY KEY ("StudentId");
 A   ALTER TABLE ONLY dbo."Students" DROP CONSTRAINT "Students_pkey";
       dbo            postgres    false    228            B           2606    28776    TapLogs TapLogs_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY dbo."TapLogs"
    ADD CONSTRAINT "TapLogs_pkey" PRIMARY KEY ("TapLogId");
 ?   ALTER TABLE ONLY dbo."TapLogs" DROP CONSTRAINT "TapLogs_pkey";
       dbo            postgres    false    238            =           2606    28540 (   UserFirebaseToken UserFirebaseToken_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY dbo."UserFirebaseToken"
    ADD CONSTRAINT "UserFirebaseToken_pkey" PRIMARY KEY ("UserId", "FirebaseToken", "Device");
 S   ALTER TABLE ONLY dbo."UserFirebaseToken" DROP CONSTRAINT "UserFirebaseToken_pkey";
       dbo            postgres    false    234    234    234            c           2606    39464 8   UserOneSignalSubscription UserOneSignalSubscription_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY dbo."UserOneSignalSubscription"
    ADD CONSTRAINT "UserOneSignalSubscription_pkey" PRIMARY KEY ("UserId", "SubscriptionID");
 c   ALTER TABLE ONLY dbo."UserOneSignalSubscription" DROP CONSTRAINT "UserOneSignalSubscription_pkey";
       dbo            postgres    false    257    257            0           2606    28456    Users Users_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY dbo."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("UserId");
 ;   ALTER TABLE ONLY dbo."Users" DROP CONSTRAINT "Users_pkey";
       dbo            postgres    false    226            _           2606    38816    Files pk_files_901578250 
   CONSTRAINT     [   ALTER TABLE ONLY dbo."Files"
    ADD CONSTRAINT pk_files_901578250 PRIMARY KEY ("FileId");
 A   ALTER TABLE ONLY dbo."Files" DROP CONSTRAINT pk_files_901578250;
       dbo            postgres    false    255            a           2606    38821 -   UserProfilePic pk_userprofilepic_1_1525580473 
   CONSTRAINT     p   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT pk_userprofilepic_1_1525580473 PRIMARY KEY ("UserId");
 V   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT pk_userprofilepic_1_1525580473;
       dbo            postgres    false    256            i           2606    84601    EmployeeUser u_Employee 
   CONSTRAINT     [   ALTER TABLE ONLY dbo."EmployeeUser"
    ADD CONSTRAINT "u_Employee" UNIQUE ("EmployeeId");
 B   ALTER TABLE ONLY dbo."EmployeeUser" DROP CONSTRAINT "u_Employee";
       dbo            postgres    false    260            R           2606    29312    StudentCourse u_StudentCourse 
   CONSTRAINT     `   ALTER TABLE ONLY dbo."StudentCourse"
    ADD CONSTRAINT "u_StudentCourse" UNIQUE ("StudentId");
 H   ALTER TABLE ONLY dbo."StudentCourse" DROP CONSTRAINT "u_StudentCourse";
       dbo            postgres    false    246            N           2606    29310    StudentSection u_StudentSection 
   CONSTRAINT     b   ALTER TABLE ONLY dbo."StudentSection"
    ADD CONSTRAINT "u_StudentSection" UNIQUE ("StudentId");
 J   ALTER TABLE ONLY dbo."StudentSection" DROP CONSTRAINT "u_StudentSection";
       dbo            postgres    false    245            Z           2606    38796    StudentStrand u_StudentStrand 
   CONSTRAINT     `   ALTER TABLE ONLY dbo."StudentStrand"
    ADD CONSTRAINT "u_StudentStrand" UNIQUE ("StudentId");
 H   ALTER TABLE ONLY dbo."StudentStrand" DROP CONSTRAINT "u_StudentStrand";
       dbo            postgres    false    251            .           1259    38805    u_course    INDEX     �   CREATE UNIQUE INDEX u_course ON dbo."Courses" USING btree ("Name", "SchoolId", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
    DROP INDEX dbo.u_course;
       dbo            postgres    false    224    224    224    224            )           1259    38806    u_department    INDEX     �   CREATE UNIQUE INDEX u_department ON dbo."Departments" USING btree ("DepartmentName", "SchoolId", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
    DROP INDEX dbo.u_department;
       dbo            postgres    false    220    220    220    220            I           1259    84621    u_employees_number    INDEX     �   CREATE UNIQUE INDEX u_employees_number ON dbo."Employees" USING btree ("MobileNumber", "SchoolId", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
 #   DROP INDEX dbo.u_employees_number;
       dbo            postgres    false    244    244    244    244            J           1259    84623    u_employees_orgemployeeid    INDEX     �   CREATE UNIQUE INDEX u_employees_orgemployeeid ON dbo."Employees" USING btree ("OrgEmployeeId", "SchoolId", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
 *   DROP INDEX dbo.u_employees_orgemployeeid;
       dbo            postgres    false    244    244    244    244            @           1259    38807 	   u_machine    INDEX     �   CREATE UNIQUE INDEX u_machine ON dbo."Machines" USING btree ("Description", "SchoolId", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
    DROP INDEX dbo.u_machine;
       dbo            postgres    false    236    236    236    236            6           1259    29143    u_parents_email    INDEX     �   CREATE UNIQUE INDEX u_parents_email ON dbo."Parents" USING btree ("Email", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
     DROP INDEX dbo.u_parents_email;
       dbo            postgres    false    230    230    230            7           1259    29144    u_parents_number    INDEX     �   CREATE UNIQUE INDEX u_parents_number ON dbo."Parents" USING btree ("MobileNumber", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
 !   DROP INDEX dbo.u_parents_number;
       dbo            postgres    false    230    230    230            &           1259    38802    u_school_year_level    INDEX     �   CREATE UNIQUE INDEX u_school_year_level ON dbo."SchoolYearLevels" USING btree ("SchoolId", "Name", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
 $   DROP INDEX dbo.u_school_year_level;
       dbo            postgres    false    218    218    218    218            ]           1259    38808    u_strand    INDEX     �   CREATE UNIQUE INDEX u_strand ON dbo."Strands" USING btree ("Name", "SchoolId", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
    DROP INDEX dbo.u_strand;
       dbo            postgres    false    253    253    253    253            1           1259    29138    u_user    INDEX     �   CREATE UNIQUE INDEX u_user ON dbo."Users" USING btree ("UserName", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
    DROP INDEX dbo.u_user;
       dbo            postgres    false    226    226    226            �           2606    72371 .   Announcements fk_Announcements_CreatedByUserId    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Announcements"
    ADD CONSTRAINT "fk_Announcements_CreatedByUserId" FOREIGN KEY ("CreatedByUserId") REFERENCES dbo."Users"("UserId");
 Y   ALTER TABLE ONLY dbo."Announcements" DROP CONSTRAINT "fk_Announcements_CreatedByUserId";
       dbo          postgres    false    259    3376    226            �           2606    72376 %   Announcements fk_Announcements_School    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Announcements"
    ADD CONSTRAINT "fk_Announcements_School" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId");
 P   ALTER TABLE ONLY dbo."Announcements" DROP CONSTRAINT "fk_Announcements_School";
       dbo          postgres    false    259    3363    216            �           2606    72381 ,   Announcements fk_Announcements_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Announcements"
    ADD CONSTRAINT "fk_Announcements_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId");
 W   ALTER TABLE ONLY dbo."Announcements" DROP CONSTRAINT "fk_Announcements_UpdatedByUser";
       dbo          postgres    false    3376    226    259            z           2606    28561     Courses fk_Courses_CreatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Courses"
    ADD CONSTRAINT "fk_Courses_CreatedByUser" FOREIGN KEY ("CreatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 K   ALTER TABLE ONLY dbo."Courses" DROP CONSTRAINT "fk_Courses_CreatedByUser";
       dbo          postgres    false    3376    226    224            {           2606    28556    Courses fk_Courses_Schools    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Courses"
    ADD CONSTRAINT "fk_Courses_Schools" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId") NOT VALID;
 E   ALTER TABLE ONLY dbo."Courses" DROP CONSTRAINT "fk_Courses_Schools";
       dbo          postgres    false    3363    216    224            |           2606    28566     Courses fk_Courses_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Courses"
    ADD CONSTRAINT "fk_Courses_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 K   ALTER TABLE ONLY dbo."Courses" DROP CONSTRAINT "fk_Courses_UpdatedByUser";
       dbo          postgres    false    226    224    3376            q           2606    28576 *   Departments fk_Departments_CreatedByUserId    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Departments"
    ADD CONSTRAINT "fk_Departments_CreatedByUserId" FOREIGN KEY ("CreatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 U   ALTER TABLE ONLY dbo."Departments" DROP CONSTRAINT "fk_Departments_CreatedByUserId";
       dbo          postgres    false    226    3376    220            r           2606    28571 !   Departments fk_Departments_School    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Departments"
    ADD CONSTRAINT "fk_Departments_School" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId") NOT VALID;
 L   ALTER TABLE ONLY dbo."Departments" DROP CONSTRAINT "fk_Departments_School";
       dbo          postgres    false    216    3363    220            s           2606    28581 (   Departments fk_Departments_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Departments"
    ADD CONSTRAINT "fk_Departments_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 S   ALTER TABLE ONLY dbo."Departments" DROP CONSTRAINT "fk_Departments_UpdatedByUser";
       dbo          postgres    false    220    3376    226            �           2606    28938 .   EmployeeTitles fk_EmployeeTitles_CreatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."EmployeeTitles"
    ADD CONSTRAINT "fk_EmployeeTitles_CreatedByUser" FOREIGN KEY ("CreatedByUserId") REFERENCES dbo."Users"("UserId");
 Y   ALTER TABLE ONLY dbo."EmployeeTitles" DROP CONSTRAINT "fk_EmployeeTitles_CreatedByUser";
       dbo          postgres    false    242    226    3376            �           2606    29082 '   EmployeeTitles fk_EmployeeTitles_School    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."EmployeeTitles"
    ADD CONSTRAINT "fk_EmployeeTitles_School" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId") NOT VALID;
 R   ALTER TABLE ONLY dbo."EmployeeTitles" DROP CONSTRAINT "fk_EmployeeTitles_School";
       dbo          postgres    false    216    3363    242            �           2606    28943 .   EmployeeTitles fk_EmployeeTitles_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."EmployeeTitles"
    ADD CONSTRAINT "fk_EmployeeTitles_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId");
 Y   ALTER TABLE ONLY dbo."EmployeeTitles" DROP CONSTRAINT "fk_EmployeeTitles_UpdatedByUser";
       dbo          postgres    false    3376    242    226            �           2606    84689 6   EmployeeUserAccess fk_EmployeeUserAccess_CreatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."EmployeeUserAccess"
    ADD CONSTRAINT "fk_EmployeeUserAccess_CreatedByUser" FOREIGN KEY ("CreatedByUserId") REFERENCES dbo."Users"("UserId");
 a   ALTER TABLE ONLY dbo."EmployeeUserAccess" DROP CONSTRAINT "fk_EmployeeUserAccess_CreatedByUser";
       dbo          postgres    false    226    3376    262            �           2606    84694 /   EmployeeUserAccess fk_EmployeeUserAccess_School    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."EmployeeUserAccess"
    ADD CONSTRAINT "fk_EmployeeUserAccess_School" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId");
 Z   ALTER TABLE ONLY dbo."EmployeeUserAccess" DROP CONSTRAINT "fk_EmployeeUserAccess_School";
       dbo          postgres    false    216    262    3363            �           2606    84699 6   EmployeeUserAccess fk_EmployeeUserAccess_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."EmployeeUserAccess"
    ADD CONSTRAINT "fk_EmployeeUserAccess_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId");
 a   ALTER TABLE ONLY dbo."EmployeeUserAccess" DROP CONSTRAINT "fk_EmployeeUserAccess_UpdatedByUser";
       dbo          postgres    false    226    3376    262            �           2606    84602 %   EmployeeUser fk_EmployeeUser_Employee    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."EmployeeUser"
    ADD CONSTRAINT "fk_EmployeeUser_Employee" FOREIGN KEY ("EmployeeId") REFERENCES dbo."Employees"("EmployeeId");
 P   ALTER TABLE ONLY dbo."EmployeeUser" DROP CONSTRAINT "fk_EmployeeUser_Employee";
       dbo          postgres    false    260    3400    244            �           2606    84704 /   EmployeeUser fk_EmployeeUser_EmployeeUserAccess    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."EmployeeUser"
    ADD CONSTRAINT "fk_EmployeeUser_EmployeeUserAccess" FOREIGN KEY ("EmployeeUserAccessId") REFERENCES dbo."EmployeeUserAccess"("EmployeeUserAccessId") NOT VALID;
 Z   ALTER TABLE ONLY dbo."EmployeeUser" DROP CONSTRAINT "fk_EmployeeUser_EmployeeUserAccess";
       dbo          postgres    false    3435    262    260            �           2606    84612 !   EmployeeUser fk_EmployeeUser_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."EmployeeUser"
    ADD CONSTRAINT "fk_EmployeeUser_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 L   ALTER TABLE ONLY dbo."EmployeeUser" DROP CONSTRAINT "fk_EmployeeUser_User";
       dbo          postgres    false    226    3376    260            �           2606    29011 &   Employees fk_Employees_CreatedByUserId    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Employees"
    ADD CONSTRAINT "fk_Employees_CreatedByUserId" FOREIGN KEY ("CreatedByUserId") REFERENCES dbo."Users"("UserId");
 Q   ALTER TABLE ONLY dbo."Employees" DROP CONSTRAINT "fk_Employees_CreatedByUserId";
       dbo          postgres    false    244    226    3376            �           2606    29148 "   Employees fk_Employees_Departments    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Employees"
    ADD CONSTRAINT "fk_Employees_Departments" FOREIGN KEY ("DepartmentId") REFERENCES dbo."Departments"("DepartmentId") NOT VALID;
 M   ALTER TABLE ONLY dbo."Employees" DROP CONSTRAINT "fk_Employees_Departments";
       dbo          postgres    false    220    3368    244            �           2606    29021 '   Employees fk_Employees_EmployeePosition    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Employees"
    ADD CONSTRAINT "fk_Employees_EmployeePosition" FOREIGN KEY ("EmployeePositionId") REFERENCES dbo."EmployeeTitles"("EmployeeTitleId");
 R   ALTER TABLE ONLY dbo."Employees" DROP CONSTRAINT "fk_Employees_EmployeePosition";
       dbo          postgres    false    3398    242    244            �           2606    29993    Employees fk_Employees_SchoolId    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Employees"
    ADD CONSTRAINT "fk_Employees_SchoolId" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId");
 J   ALTER TABLE ONLY dbo."Employees" DROP CONSTRAINT "fk_Employees_SchoolId";
       dbo          postgres    false    216    3363    244            �           2606    29031 &   Employees fk_Employees_UpdatedByUserId    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Employees"
    ADD CONSTRAINT "fk_Employees_UpdatedByUserId" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId");
 Q   ALTER TABLE ONLY dbo."Employees" DROP CONSTRAINT "fk_Employees_UpdatedByUserId";
       dbo          postgres    false    244    3376    226            �           2606    29951 :   LinkStudentRequest fk_LinkStudentRequest_RequestedByParent    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."LinkStudentRequest"
    ADD CONSTRAINT "fk_LinkStudentRequest_RequestedByParent" FOREIGN KEY ("RequestedByParentId") REFERENCES dbo."Parents"("ParentId");
 e   ALTER TABLE ONLY dbo."LinkStudentRequest" DROP CONSTRAINT "fk_LinkStudentRequest_RequestedByParent";
       dbo          postgres    false    249    230    3381            �           2606    29956 /   LinkStudentRequest fk_LinkStudentRequest_School    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."LinkStudentRequest"
    ADD CONSTRAINT "fk_LinkStudentRequest_School" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId");
 Z   ALTER TABLE ONLY dbo."LinkStudentRequest" DROP CONSTRAINT "fk_LinkStudentRequest_School";
       dbo          postgres    false    216    249    3363            �           2606    29961 0   LinkStudentRequest fk_LinkStudentRequest_Student    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."LinkStudentRequest"
    ADD CONSTRAINT "fk_LinkStudentRequest_Student" FOREIGN KEY ("StudentId") REFERENCES dbo."Students"("StudentId");
 [   ALTER TABLE ONLY dbo."LinkStudentRequest" DROP CONSTRAINT "fk_LinkStudentRequest_Student";
       dbo          postgres    false    3379    228    249            �           2606    29966 6   LinkStudentRequest fk_LinkStudentRequest_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."LinkStudentRequest"
    ADD CONSTRAINT "fk_LinkStudentRequest_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId");
 a   ALTER TABLE ONLY dbo."LinkStudentRequest" DROP CONSTRAINT "fk_LinkStudentRequest_UpdatedByUser";
       dbo          postgres    false    226    3376    249            �           2606    28793 "   Machines fk_Machines_CreatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Machines"
    ADD CONSTRAINT "fk_Machines_CreatedByUser" FOREIGN KEY ("CreatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 M   ALTER TABLE ONLY dbo."Machines" DROP CONSTRAINT "fk_Machines_CreatedByUser";
       dbo          postgres    false    3376    226    236            �           2606    28788    Machines fk_Machines_School    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Machines"
    ADD CONSTRAINT "fk_Machines_School" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId") NOT VALID;
 F   ALTER TABLE ONLY dbo."Machines" DROP CONSTRAINT "fk_Machines_School";
       dbo          postgres    false    3363    216    236            �           2606    28798 "   Machines fk_Machines_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Machines"
    ADD CONSTRAINT "fk_Machines_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 M   ALTER TABLE ONLY dbo."Machines" DROP CONSTRAINT "fk_Machines_UpdatedByUser";
       dbo          postgres    false    226    236    3376            �           2606    28586 &   Notifications fk_Notifications_ForUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Notifications"
    ADD CONSTRAINT "fk_Notifications_ForUser" FOREIGN KEY ("ForUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 Q   ALTER TABLE ONLY dbo."Notifications" DROP CONSTRAINT "fk_Notifications_ForUser";
       dbo          postgres    false    3376    233    226            �           2606    28846    Operators fk_Operator_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Operators"
    ADD CONSTRAINT "fk_Operator_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 E   ALTER TABLE ONLY dbo."Operators" DROP CONSTRAINT "fk_Operator_User";
       dbo          postgres    false    3376    226    240            �           2606    28591 %   ParentStudent fk_ParentStudent_Parent    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."ParentStudent"
    ADD CONSTRAINT "fk_ParentStudent_Parent" FOREIGN KEY ("ParentId") REFERENCES dbo."Parents"("ParentId") NOT VALID;
 P   ALTER TABLE ONLY dbo."ParentStudent" DROP CONSTRAINT "fk_ParentStudent_Parent";
       dbo          postgres    false    230    231    3381            �           2606    28596 &   ParentStudent fk_ParentStudent_Student    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."ParentStudent"
    ADD CONSTRAINT "fk_ParentStudent_Student" FOREIGN KEY ("StudentId") REFERENCES dbo."Students"("StudentId") NOT VALID;
 Q   ALTER TABLE ONLY dbo."ParentStudent" DROP CONSTRAINT "fk_ParentStudent_Student";
       dbo          postgres    false    3379    231    228            �           2606    28606 #   Parents fk_Parents_RegisteredByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Parents"
    ADD CONSTRAINT "fk_Parents_RegisteredByUser" FOREIGN KEY ("RegisteredByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 N   ALTER TABLE ONLY dbo."Parents" DROP CONSTRAINT "fk_Parents_RegisteredByUser";
       dbo          postgres    false    3376    230    226            �           2606    28611     Parents fk_Parents_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Parents"
    ADD CONSTRAINT "fk_Parents_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 K   ALTER TABLE ONLY dbo."Parents" DROP CONSTRAINT "fk_Parents_UpdatedByUser";
       dbo          postgres    false    3376    230    226            �           2606    28601    Parents fk_Parents_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Parents"
    ADD CONSTRAINT "fk_Parents_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 B   ALTER TABLE ONLY dbo."Parents" DROP CONSTRAINT "fk_Parents_User";
       dbo          postgres    false    3376    230    226            �           2606    29167 :   SchoolRequestAccess fk_SchoolRequestAccess_RequestedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."SchoolRequestAccess"
    ADD CONSTRAINT "fk_SchoolRequestAccess_RequestedByUser" FOREIGN KEY ("RequestedByUserId") REFERENCES dbo."Users"("UserId");
 e   ALTER TABLE ONLY dbo."SchoolRequestAccess" DROP CONSTRAINT "fk_SchoolRequestAccess_RequestedByUser";
       dbo          postgres    false    226    3376    248            �           2606    29162 1   SchoolRequestAccess fk_SchoolRequestAccess_School    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."SchoolRequestAccess"
    ADD CONSTRAINT "fk_SchoolRequestAccess_School" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId");
 \   ALTER TABLE ONLY dbo."SchoolRequestAccess" DROP CONSTRAINT "fk_SchoolRequestAccess_School";
       dbo          postgres    false    216    3363    248            �           2606    29172 8   SchoolRequestAccess fk_SchoolRequestAccess_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."SchoolRequestAccess"
    ADD CONSTRAINT "fk_SchoolRequestAccess_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId");
 c   ALTER TABLE ONLY dbo."SchoolRequestAccess" DROP CONSTRAINT "fk_SchoolRequestAccess_UpdatedByUser";
       dbo          postgres    false    248    226    3376            n           2606    28621 0   SchoolYearLevels fk_SchoolYearLevel_CreatedByUse    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."SchoolYearLevels"
    ADD CONSTRAINT "fk_SchoolYearLevel_CreatedByUse" FOREIGN KEY ("CreatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 [   ALTER TABLE ONLY dbo."SchoolYearLevels" DROP CONSTRAINT "fk_SchoolYearLevel_CreatedByUse";
       dbo          postgres    false    218    3376    226            o           2606    28616 *   SchoolYearLevels fk_SchoolYearLevel_School    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."SchoolYearLevels"
    ADD CONSTRAINT "fk_SchoolYearLevel_School" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId") NOT VALID;
 U   ALTER TABLE ONLY dbo."SchoolYearLevels" DROP CONSTRAINT "fk_SchoolYearLevel_School";
       dbo          postgres    false    3363    218    216            p           2606    28626 1   SchoolYearLevels fk_SchoolYearLevel_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."SchoolYearLevels"
    ADD CONSTRAINT "fk_SchoolYearLevel_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 \   ALTER TABLE ONLY dbo."SchoolYearLevels" DROP CONSTRAINT "fk_SchoolYearLevel_UpdatedByUser";
       dbo          postgres    false    218    226    3376            l           2606    28546 #   Schools fk_Schools_RegisteredByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Schools"
    ADD CONSTRAINT "fk_Schools_RegisteredByUser" FOREIGN KEY ("RegisteredByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 N   ALTER TABLE ONLY dbo."Schools" DROP CONSTRAINT "fk_Schools_RegisteredByUser";
       dbo          postgres    false    216    3376    226            m           2606    28551     Schools fk_Schools_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Schools"
    ADD CONSTRAINT "fk_Schools_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 K   ALTER TABLE ONLY dbo."Schools" DROP CONSTRAINT "fk_Schools_UpdatedByUser";
       dbo          postgres    false    3376    216    226            t           2606    29041 $   Sections fk_Sections_AdviserEmployee    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Sections"
    ADD CONSTRAINT "fk_Sections_AdviserEmployee" FOREIGN KEY ("AdviserEmployeeId") REFERENCES dbo."Employees"("EmployeeId") NOT VALID;
 O   ALTER TABLE ONLY dbo."Sections" DROP CONSTRAINT "fk_Sections_AdviserEmployee";
       dbo          postgres    false    3400    244    222            u           2606    28646 "   Sections fk_Sections_CreatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Sections"
    ADD CONSTRAINT "fk_Sections_CreatedByUser" FOREIGN KEY ("CreatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 M   ALTER TABLE ONLY dbo."Sections" DROP CONSTRAINT "fk_Sections_CreatedByUser";
       dbo          postgres    false    3376    222    226            v           2606    28631    Sections fk_Sections_Department    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Sections"
    ADD CONSTRAINT "fk_Sections_Department" FOREIGN KEY ("DepartmentId") REFERENCES dbo."Departments"("DepartmentId") NOT VALID;
 J   ALTER TABLE ONLY dbo."Sections" DROP CONSTRAINT "fk_Sections_Department";
       dbo          postgres    false    220    3368    222            w           2606    29133    Sections fk_Sections_School    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Sections"
    ADD CONSTRAINT "fk_Sections_School" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId") NOT VALID;
 F   ALTER TABLE ONLY dbo."Sections" DROP CONSTRAINT "fk_Sections_School";
       dbo          postgres    false    216    222    3363            x           2606    28636 $   Sections fk_Sections_SchoolYearLevel    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Sections"
    ADD CONSTRAINT "fk_Sections_SchoolYearLevel" FOREIGN KEY ("SchoolYearLevelId") REFERENCES dbo."SchoolYearLevels"("SchoolYearLevelId") NOT VALID;
 O   ALTER TABLE ONLY dbo."Sections" DROP CONSTRAINT "fk_Sections_SchoolYearLevel";
       dbo          postgres    false    222    218    3365            y           2606    28651 "   Sections fk_Sections_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Sections"
    ADD CONSTRAINT "fk_Sections_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 M   ALTER TABLE ONLY dbo."Sections" DROP CONSTRAINT "fk_Sections_UpdatedByUser";
       dbo          postgres    false    222    3376    226            �           2606    38769     Strands fk_Strands_CreatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Strands"
    ADD CONSTRAINT "fk_Strands_CreatedByUser" FOREIGN KEY ("CreatedByUserId") REFERENCES dbo."Users"("UserId");
 K   ALTER TABLE ONLY dbo."Strands" DROP CONSTRAINT "fk_Strands_CreatedByUser";
       dbo          postgres    false    253    226    3376            �           2606    38774    Strands fk_Strands_Schools    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Strands"
    ADD CONSTRAINT "fk_Strands_Schools" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId");
 E   ALTER TABLE ONLY dbo."Strands" DROP CONSTRAINT "fk_Strands_Schools";
       dbo          postgres    false    253    3363    216            �           2606    38779     Strands fk_Strands_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Strands"
    ADD CONSTRAINT "fk_Strands_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId");
 K   ALTER TABLE ONLY dbo."Strands" DROP CONSTRAINT "fk_Strands_UpdatedByUser";
       dbo          postgres    false    253    3376    226            �           2606    29077 %   StudentCourse fk_StudentCourse_Course    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."StudentCourse"
    ADD CONSTRAINT "fk_StudentCourse_Course" FOREIGN KEY ("CourseId") REFERENCES dbo."Courses"("CourseId");
 P   ALTER TABLE ONLY dbo."StudentCourse" DROP CONSTRAINT "fk_StudentCourse_Course";
       dbo          postgres    false    224    3373    246            �           2606    29072 &   StudentCourse fk_StudentCourse_Student    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."StudentCourse"
    ADD CONSTRAINT "fk_StudentCourse_Student" FOREIGN KEY ("StudentId") REFERENCES dbo."Students"("StudentId");
 Q   ALTER TABLE ONLY dbo."StudentCourse" DROP CONSTRAINT "fk_StudentCourse_Student";
       dbo          postgres    false    246    3379    228            �           2606    29092 (   StudentSection fk_StudentSection_Section    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."StudentSection"
    ADD CONSTRAINT "fk_StudentSection_Section" FOREIGN KEY ("SectionId") REFERENCES dbo."Sections"("SectionId") NOT VALID;
 S   ALTER TABLE ONLY dbo."StudentSection" DROP CONSTRAINT "fk_StudentSection_Section";
       dbo          postgres    false    3371    245    222            �           2606    29097 (   StudentSection fk_StudentSection_Student    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."StudentSection"
    ADD CONSTRAINT "fk_StudentSection_Student" FOREIGN KEY ("StudentId") REFERENCES dbo."Students"("StudentId") NOT VALID;
 S   ALTER TABLE ONLY dbo."StudentSection" DROP CONSTRAINT "fk_StudentSection_Student";
       dbo          postgres    false    245    228    3379            �           2606    38785 %   StudentStrand fk_StudentStrand_Strand    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."StudentStrand"
    ADD CONSTRAINT "fk_StudentStrand_Strand" FOREIGN KEY ("StrandId") REFERENCES dbo."Strands"("StrandId") NOT VALID;
 P   ALTER TABLE ONLY dbo."StudentStrand" DROP CONSTRAINT "fk_StudentStrand_Strand";
       dbo          postgres    false    251    3420    253            �           2606    38790 &   StudentStrand fk_StudentStrand_Student    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."StudentStrand"
    ADD CONSTRAINT "fk_StudentStrand_Student" FOREIGN KEY ("StudentId") REFERENCES dbo."Students"("StudentId") NOT VALID;
 Q   ALTER TABLE ONLY dbo."StudentStrand" DROP CONSTRAINT "fk_StudentStrand_Student";
       dbo          postgres    false    3379    228    251            }           2606    29046    Students fk_Students_Department    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Students"
    ADD CONSTRAINT "fk_Students_Department" FOREIGN KEY ("DepartmentId") REFERENCES dbo."Departments"("DepartmentId") NOT VALID;
 J   ALTER TABLE ONLY dbo."Students" DROP CONSTRAINT "fk_Students_Department";
       dbo          postgres    false    220    228    3368            ~           2606    28738 %   Students fk_Students_RegisteredByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Students"
    ADD CONSTRAINT "fk_Students_RegisteredByUser" FOREIGN KEY ("RegisteredByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 P   ALTER TABLE ONLY dbo."Students" DROP CONSTRAINT "fk_Students_RegisteredByUser";
       dbo          postgres    false    3376    228    226                       2606    29988    Students fk_Students_School    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Students"
    ADD CONSTRAINT "fk_Students_School" FOREIGN KEY ("SchoolId") REFERENCES dbo."Schools"("SchoolId");
 F   ALTER TABLE ONLY dbo."Students" DROP CONSTRAINT "fk_Students_School";
       dbo          postgres    false    216    228    3363            �           2606    28753 $   Students fk_Students_SchoolYearLevel    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Students"
    ADD CONSTRAINT "fk_Students_SchoolYearLevel" FOREIGN KEY ("SchoolYearLevelId") REFERENCES dbo."SchoolYearLevels"("SchoolYearLevelId") NOT VALID;
 O   ALTER TABLE ONLY dbo."Students" DROP CONSTRAINT "fk_Students_SchoolYearLevel";
       dbo          postgres    false    3365    218    228            �           2606    28743 "   Students fk_Students_UpdatedByUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Students"
    ADD CONSTRAINT "fk_Students_UpdatedByUser" FOREIGN KEY ("UpdatedByUserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 M   ALTER TABLE ONLY dbo."Students" DROP CONSTRAINT "fk_Students_UpdatedByUser";
       dbo          postgres    false    228    226    3376            �           2606    28782    TapLogs fk_TapLogs_Machine    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."TapLogs"
    ADD CONSTRAINT "fk_TapLogs_Machine" FOREIGN KEY ("MachineId") REFERENCES dbo."Machines"("MachineId");
 E   ALTER TABLE ONLY dbo."TapLogs" DROP CONSTRAINT "fk_TapLogs_Machine";
       dbo          postgres    false    3391    238    236            �           2606    28541 +   UserFirebaseToken fk_UserFirebaseToken_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserFirebaseToken"
    ADD CONSTRAINT "fk_UserFirebaseToken_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 V   ALTER TABLE ONLY dbo."UserFirebaseToken" DROP CONSTRAINT "fk_UserFirebaseToken_User";
       dbo          postgres    false    3376    234    226            �           2606    39465 ;   UserOneSignalSubscription fk_UserOneSignalSubscription_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserOneSignalSubscription"
    ADD CONSTRAINT "fk_UserOneSignalSubscription_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 f   ALTER TABLE ONLY dbo."UserOneSignalSubscription" DROP CONSTRAINT "fk_UserOneSignalSubscription_User";
       dbo          postgres    false    226    3376    257            �           2606    38822 0   UserProfilePic fk_userprofilepic_files_354100302    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT fk_userprofilepic_files_354100302 FOREIGN KEY ("FileId") REFERENCES dbo."Files"("FileId");
 Y   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT fk_userprofilepic_files_354100302;
       dbo          postgres    false    255    3423    256            �           2606    38827 &   UserProfilePic fk_userprofilepic_users    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT fk_userprofilepic_users FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 O   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT fk_userprofilepic_users;
       dbo          postgres    false    256    226    3376            l      x������ � �      I      x������ � �      E      x������ � �      [      x������ � �      m      x������ � �      o      x������ � �      ]      x������ � �      h      x������ � �      b      x������ � �      U      x������ � �      R      x������ � �      Y       x�3�4 CNCNǔ��<0�Y����� f�      P      x������ � �      O      x������ � �      a      x������ � �      C      x������ � �      A      x������ � �      G      x������ � �      f      x������ � �      _      x������ � �      ^      x������ � �      d      x������ � �      M      x������ � �      W      x������ � �      S      x������ � �      j      x������ � �      i      x������ � �      K   �   x�3�4 C�Ĕ��<N�$C�B?�쪴��ȼ Ӏ4�(���ԔP��S�R��\ϊT��R}o��@��T��DN� � �� N##]c]3C++#c=SKm�?��=... j� �     