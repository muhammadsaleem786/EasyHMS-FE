﻿export class emr_prescription_mf {
    constructor() {
        let objemr_prescription_complaint = new emr_prescription_complaint();
        this.emr_prescription_complaint.push(objemr_prescription_complaint);

        let objemr_prescription_diagnos = new emr_prescription_diagnos();
        this.emr_prescription_diagnos.push(objemr_prescription_diagnos);

        let objemr_prescription_investigation = new emr_prescription_investigation();
        this.emr_prescription_investigation.push(objemr_prescription_investigation);

        let objemr_prescription_observation = new emr_prescription_observation();
        this.emr_prescription_observation.push(objemr_prescription_observation);

        let objemr_prescription_treatment = new emr_prescription_treatment();
        this.emr_prescription_treatment.push(objemr_prescription_treatment);
    }
    Id: number;
    CompanyID: number;
    IsTemplate: boolean = false;
    AppointmentDate: string;
    AppointDate: string;
    PatientId: number;
    DoctorId: number;
    ClinicId: number;
    PatientName: string;
    FollowUpDate: Date;
    FollowUpTime: string;
    IsCreateAppointment: boolean = false;
    AppointmentId: number;
    Notes: string;
    TemplateName: string;
    Email: string;
    Day: string;
    emr_prescription_complaint: Array<emr_prescription_complaint> = [];
    emr_prescription_diagnos: Array<emr_prescription_diagnos> = [];
    emr_prescription_investigation: Array<emr_prescription_investigation> = [];
    emr_prescription_observation: Array<emr_prescription_observation> = [];
    emr_prescription_treatment: Array<emr_prescription_treatment> = [];
}

export class emr_prescription_complaint {
    Id: number;
    Complaint: string;
    ComplaintId: number;
    IsSelected: boolean;
    Isfavorite: number;
    favoriteId: number;
    PatientId: number;
}
export class emr_prescription_diagnos {
    Id: number;
    Diagnos: string;
    DiagnosId: number;
    IsSelected: boolean;
    Isfavorite: number;
    favoriteId: number;
    PatientId: number;
}
export class emr_prescription_investigation {
    Id: number;
    Investigation: string;
    InvestigationId: number;
    IsSelected: boolean;
    Isfavorite: number;
    favoriteId: number;
    PatientId: number;
}
export class emr_prescription_observation {
    Id: number;
    Observation: string;
    ObservationId: number;
    IsSelected: boolean;
    Isfavorite: number;
    favoriteId: number;
    PatientId: number;
}

export class emr_prescription_treatment_template {
    Id: number;
    TemplateName: string;
}
export class emr_instruction {
    Id: number;
    Instructions: string;
}

export class emr_prescription_treatment {
    Id: number;
    MedicineId: number;
    MedicineName: string;
    Duration: number;
    Instructions: string;
    InstructionId: string;
    Measure: string;
    IsMorning: boolean = false;
    IsEvening: boolean = false;
    IsNoon: boolean = false;
    IsSOS: boolean = false;
    Futureusage: boolean;
    PatientId: number;
}
export class emr_medicine {
    Id: number;
    Medicine: string;
    UnitId: number;
    TypeId: number;
    Price: number;
}




