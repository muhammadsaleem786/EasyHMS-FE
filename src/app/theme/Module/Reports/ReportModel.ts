export class ReportModel {
    ID: number;
    FromDate: Date;
    ToDate: Date;
    PatientId: number;
    DoctorId: number;
    DoctorName: string;
    PatientName: string;
    Type: number;
    Email: string;
    base64: string;
    FileName: string;
}