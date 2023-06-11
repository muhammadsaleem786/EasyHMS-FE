export class AttendanceModel {
    ID: number;
    CompanyID: number;
    EmployeeID: number;
    TimeIn: Date;
    TimeOut: Date;
    TimIntxt: string;
    TimOuttxt: string;
    StatusDropDownID: number;
    StatusID: number;
    Remarks: string;
    CreatedDate: Date;
    CreatedBy: number;
    ModifiedDate: Date;
    ModifiedBy: number;
}