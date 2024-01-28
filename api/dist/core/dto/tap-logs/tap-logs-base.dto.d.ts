export declare class DefaultTapLogDto {
    orgSchoolCode: string;
    sender: string;
    status: "LOG IN" | "LOG OUT";
    cardNumber: string;
    userType: "STUDENT" | "EMPLOYEE";
    date: Date;
    time: string;
}
