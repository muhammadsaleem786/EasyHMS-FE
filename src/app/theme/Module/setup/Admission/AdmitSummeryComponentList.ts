import { Component, OnInit, ViewChild, ElementRef, TemplateRef, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../../../../CommonService/LoaderService';
import { AdmitService } from './AdmitService';
import { ValidationVariables } from '../../../../AngularConfig/global';
import { CommonToastrService } from '../../../../CommonService/CommonToastrService';
import { EncryptionService } from '../../../../CommonService/encryption.service';
import { emr_Appointment, emr_document, patientInfo, DoctorInfo } from './../Appointment/AppointmentModel';
import { emr_patient_bill } from '../Billing/BillingModel';
import { emr_patient, ipd_admission_vital, ipd_admission_notes, ipd_diagnosis } from './AdmitModel';
import { Observable } from 'rxjs';
import { AppointmentService } from './../Appointment/AppointmentService';
import { PaginationModel, PaginationConfig } from '../../../../CommonComponent/PaginationComponentConfig';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { IMyDateModel } from 'mydatepicker';
import { CommonService } from '../../../../CommonService/CommonService';
import { GlobalVariable } from '../../../../AngularConfig/global';
@Component({
    templateUrl: './AdmitSummeryComponentList.html',
    moduleId: module.id,
    providers: [AdmitService, AppointmentService],
})

export class AdmitSummeryComponentList implements OnInit {
    public Form7: FormGroup;
    public Form1: FormGroup;
    public submitted: boolean;
    @Input() ScreenName: string;
    @Input() id: number;
    public Id: string;
    public Modules = [];
    public PatientVitalList: any[] = [];
    public ID: number = 10;
    public model = new emr_patient();
    public diagnosisModel = new ipd_diagnosis();
    public PayrollRegion: string; public PModel = new PaginationModel(); public PConfig = new PaginationConfig();
    public Keywords: any[] = [];
    public sub: any;
    public IsEdit: boolean = false;
    public CompanyInfo: any[] = [];
    public GenderList: any[] = [];
    public BloodList: any[] = [];
    public IsNewPatientImage: boolean = true;
    public IsNewImage: boolean = true;
    public AdmitId: any;
    public PatientImage: string = '';
    public GenderIds: any;
    public IsCNICMandatory: any;
    public ClinicName: string = "";
    public emr_prescription_dynamicArray = [];
    public emr_prescription_complaint_dynamicArray = [];
    public emr_prescription_diagnos_dynamicArray = [];
    public emr_prescription_investigation_dynamicArray = [];
    public emr_prescription_observation_dynamicArray = [];
    public emr_prescription_MedicineArray = [];
    public emr_prescription_treatment_dynamicArray = [];
    public MedicineList: any[] = [];
    public BillTypeList: any[] = [];
    public TittleList: any[] = [];
    public PrimaryList: any[] = [];
    public SecondaryList: any[] = [];
    public AllergyList: any[] = [];
    public DoctorInfo = new DoctorInfo();
    public PatientRXmodel = new patientInfo();
    public IsPatient: boolean = false;
    public GenderName: string = ""; public CompanyObj: any;
    public PaidAmount: number = 0;
    public OutStdAmount: number = 0;
    public Rights: any;
    public VisitRights: any;
    public IsAllergy: boolean = false;
    public PatientId: any;
    @ViewChild("PrintRx") PrintRxContent: TemplateRef<any>;
    @ViewChild("PrimaryModal") PrimaryModal: TemplateRef<any>;

    constructor(public _fb: FormBuilder,
        public loader: LoaderService
        , public _AdmitService: AdmitService,
        public commonservice: CommonService
        , public toastr: CommonToastrService, private encrypt: EncryptionService, public _CommonService: CommonService, public route: ActivatedRoute, public _router: Router, public _AppointmentService: AppointmentService, private modalService: NgbModal) {
        this.PayrollRegion = this.commonservice.getPayrollRegion();
        this.Rights = JSON.parse(this.encrypt.decryptionAES(localStorage.getItem('Rights')));
        this.VisitRights = this._CommonService.ScreenRights("39");
  
        let Users = JSON.parse(this.encrypt.decryptionAES(localStorage.getItem('currentUser')));
        this.CompanyObj = JSON.parse(this.encrypt.decryptionAES(localStorage.getItem('company')));
        this.ClinicName = this.CompanyObj.CompanyName;
        this.IsCNICMandatory = this.CompanyObj.IsCNICMandatory;
        this.GenderIds = Users.IsGenderDropdown;
    }
    ngOnInit() {
        this.AdmitId = localStorage.getItem('AdmitId');
        this.PatientId = localStorage.getItem('PatientId');
        this.LoadPatient();
        this.Form7 = this._fb.group({
            PatientName: ['', [Validators.required]],
            Gender: ['', [Validators.required]],
            DOB: [''],
            Age: ['', [Validators.required]],
            Email: [''],
            Mobile: ['', [Validators.required]],
            CNIC: [''],
            Image: [''],
            Notes: [''],
            MRNO: [''],
            BloodGroupId: [''],
            ContactNo:[''],
            BloodGroupDropDownId: [''],
            EmergencyNo: [''],
            Address: [''],
            ReferredBy: [''],
            AnniversaryDate: [''],
            Illness_Diabetes: [''],
            Illness_Tuberculosis: [''],
            Illness_HeartPatient: [''],
            Illness_LungsRelated: [''],
            Illness_BloodPressure: [''],
            Illness_Migraine: [''],
            Illness_Other: [''],
            Allergies_Food: [''],
            Allergies_Drug: [''],
            Allergies_Other: [''],
            Habits_Smoking: [''],
            Habits_Drinking: [''],
            Habits_Tobacco: [''],
            Habits_Other: [''],
            MedicalHistory: [''],
            CurrentMedication: [''],
            HabitsHistory: [''],
            BillTypeId: [''],
            PrefixTittleId: [''],
        });
        this.Form1 = this._fb.group({
            AdmissionId: [''],
            Date: [''],
            Description: ['', [Validators.required]],
        });

    }
    HomePage() {
        this.IsPatient = true;
    }
    ShowAppointment() {
        if (this.Rights.indexOf(13) > -1) {
            this.IsPatient = false;
            this._router.navigate(['home/AdmitSummary/AdmitAppointSummery']);
        }
    }
    LoadBillList() {
        if (this.Rights.indexOf(12) > -1) {
            this.IsPatient = false;
            this._router.navigate(['home/AdmitSummary/AdmitBillSummary']);
        }
    }
    LoadLab() {
        if (this.Rights.indexOf(42) > -1) {
            this.IsPatient = false;
            this._router.navigate(['home/AdmitSummary/AdmitLabs']);
        }
    }
    LoadMedication() {
        if (this.Rights.indexOf(40) > -1) {
            this.IsPatient = false;
            this._router.navigate(['home/AdmitSummary/AdmitMedication']);
        }
    }
    LoadImaging() {
        if (this.Rights.indexOf(41) > -1) {
            this.IsPatient = false;
            this._router.navigate(['home/AdmitSummary/AdmitImaging']);
        }
    }
    LoadDocuments() {
        if (this.Rights.indexOf(25) > -1) {
            this.IsPatient = false;
            this._router.navigate(['home/AdmitSummary/AdmitDocSummery']);
        }
    }
    LoadDischargeReport() {
        //if (this.Rights.indexOf(45) > -1) {
            this.IsPatient = false;
            this._router.navigate(['home/AdmitSummary/DischargeReport']);
        //}
    }
    LoadVisit() {
        if (this.Rights.indexOf(39) > -1) {
            this.IsPatient = false;
            this._router.navigate(['home/AdmitSummary/AdmitDetail']);
        }
    }
    LoadPatient() {
        this.loader.ShowLoader();
        this._AppointmentService.AdmitPatientLoadById(this.PatientId, this.AdmitId).then(m => {
            this.IsPatient = true;
            if (m.ResultSet.PaidAndOutamount.length > 0)
                this.OutStdAmount = m.ResultSet.PaidAndOutamount[0].OutAmount;
            this.BloodList = m.ResultSet.BloodList;
            if (this.GenderIds != null) {
                this.GenderList = m.ResultSet.GenderList.filter(x => this.GenderIds.includes(x.ID));
                if (this.GenderList.length == 1)
                    this.model.Gender = this.GenderList[0].ID;
            }
            else
                this.GenderList = m.ResultSet.GenderList;

            this.MedicineList = m.ResultSet.MedicineList;
            this.BillTypeList = m.ResultSet.BillTypeList;
            this.TittleList = m.ResultSet.TittleList;
            this.model = m.ResultSet.patientInfo[0];
            this.PrimaryList = m.ResultSet.Diagnosislist.filter(a => a.IsType == "P");
            this.SecondaryList = m.ResultSet.Diagnosislist.filter(a => a.IsType == "S");
            this.AllergyList = m.ResultSet.Diagnosislist.filter(a => a.IsType == "A");
            this.model.AdmissionNo = m.ResultSet.AdmissionNo;
            if (this.model.Gender == 1)
                this.GenderName = 'Male';
            if (this.model.Gender == 2)
                this.GenderName = 'Female';
            if (this.model.Gender == 3)
                this.GenderName = 'Other';
            if (this.model.Image != null || this.model.Image != undefined) {
                this.getPatientImageUrlName(this.model.Image);
                this.IsNewPatientImage = false;
            } else this.IsNewPatientImage = true;
            this.emr_prescription_dynamicArray = [];
            this.emr_prescription_complaint_dynamicArray = [];
            this.emr_prescription_observation_dynamicArray = [];
            this.emr_prescription_investigation_dynamicArray = [];
            this.emr_prescription_diagnos_dynamicArray = [];
            this.emr_prescription_MedicineArray = [];

            this.emr_prescription_dynamicArray = m.ResultSet.prescriptionresult;

            this.loader.HideLoader();
        });
    }
    getPatientImageUrlName(FName) {
        this.model.Image = FName;
        if (this.IsEdit && !this.IsNewImage) {
            this.PatientImage = GlobalVariable.BASE_File_URL + '' + FName;
        } else {
            this.PatientImage = GlobalVariable.BASE_Temp_File_URL + '' + FName;
        }
    }
    
    
    AgeChange() {
        this.model.DOB = null;
    }
    PatientSaveOrUpdate(isValid: boolean): void {
        this.submitted = true; // set form submit to true
        if (isValid) {
            this.submitted = false;
            if (this.IsCNICMandatory && (this.model.CNIC == null || this.model.CNIC == "")) {
                this.toastr.Error("Error", "Please enter cnic.");
                return;
            }
            this.loader.ShowLoader();
            this._AdmitService.PatientSaveOrUpdate(this.model).then(m => {
                var result = JSON.parse(m._body);
                if (result.IsSuccess) {
                    this.toastr.Success(result.Message);
                    this._router.navigate(['home/AdmitSummary']);
                    this.loader.HideLoader();
                }
                else {
                    this.toastr.Error('Error', result.ErrorMessage);
                    this.loader.HideLoader();
                }
            });
        }
    }
    PrintRxform(id: any) {
        this.loader.ShowLoader();
        this._AppointmentService.PrintRXById(id).then(m => {
            if (m.IsSuccess) {
                this.emr_prescription_complaint_dynamicArray = [];
                this.emr_prescription_observation_dynamicArray = [];
                this.emr_prescription_investigation_dynamicArray = [];
                this.emr_prescription_diagnos_dynamicArray = [];
                this.emr_prescription_treatment_dynamicArray = [];
                this.PatientVitalList = [];

                if (m.ResultSet.doctor != null)
                    this.DoctorInfo = m.ResultSet.doctor;

                if (this.DoctorInfo == null || this.DoctorInfo == undefined) {
                    this.DoctorInfo.Name = "";
                    this.DoctorInfo.Designation = "";
                    this.DoctorInfo.Qualification = "";
                    this.DoctorInfo.PhoneNo = "";
                }
                this.PatientRXmodel.PatientName = m.ResultSet.result.PatientName;
                if (m.ResultSet.result.ClinicIogo != null)
                    this.PatientRXmodel.ClinicIogo = GlobalVariable.BASE_Temp_File_URL + '' + m.ResultSet.result.ClinicIogo;
                this.PatientRXmodel.Age = m.ResultSet.result.Age;
                this.PatientRXmodel.AppointmentDate = this._CommonService.GetFormatDate(m.ResultSet.result.AppointmentDate);
                this.PatientVitalList = m.ResultSet.vitallist;
                if (m.ResultSet.result.emr_prescription_complaint != null) {
                    m.ResultSet.result.emr_prescription_complaint.forEach((item, index) => {
                        this.emr_prescription_complaint_dynamicArray.push(item);
                    });
                }
                if (m.ResultSet.result.emr_prescription_diagnos != null) {
                    m.ResultSet.result.emr_prescription_diagnos.forEach((item, index) => {
                        this.emr_prescription_diagnos_dynamicArray.push(item);
                    });
                }
                if (m.ResultSet.result.emr_prescription_investigation != null) {
                    m.ResultSet.result.emr_prescription_investigation.forEach((item, index) => {
                        this.emr_prescription_investigation_dynamicArray.push(item);
                    });
                }
                if (m.ResultSet.result.emr_prescription_observation != null) {

                    m.ResultSet.result.emr_prescription_observation.forEach((item, index) => {
                        this.emr_prescription_observation_dynamicArray.push(item);
                    });
                }
                if (m.ResultSet.result.emr_prescription_treatment != null) {

                    m.ResultSet.result.emr_prescription_treatment.forEach((item, index) => {
                        var medicineName = this.MedicineList.filter(a => a.Id == item.MedicineId)[0];
                        if (medicineName != null && medicineName != undefined)
                            item.MedicineName = medicineName.Medicine;
                        else
                            item.MedicineName = item.MedicineName;
                        this.emr_prescription_treatment_dynamicArray.push(item);
                    });
                }
                this.modalService.open(this.PrintRxContent, { size: 'lg' });
            } else
                this.toastr.Error('Error', m.ErrorMessage);
            this.loader.HideLoader();
        });
    }
    //Diagnoses
    OpenPrimaryModal(PrimaryModal) {
        this.diagnosisModel = new ipd_diagnosis();
        this.diagnosisModel.Date = new Date();
        this.IsAllergy = false;
        this.diagnosisModel.IsType = "P";
        this.modalService.open(PrimaryModal, { size: 'md' });
    }
    OpenSecondaryModal(PrimaryModal) {
        this.diagnosisModel = new ipd_diagnosis();
        this.diagnosisModel.Date = new Date();
        this.diagnosisModel.IsType = "S";
        this.IsAllergy = false;
        this.modalService.open(PrimaryModal, { size: 'md' });
    }
    OpenAllergyModal(PrimaryModal) {
        this.diagnosisModel = new ipd_diagnosis();
        this.diagnosisModel.Date = new Date();
        this.diagnosisModel.IsType = "A";
        this.IsAllergy = true;
        this.modalService.open(PrimaryModal, { size: 'md' });
    }
    SaveOrUpdate(isValid: boolean): void {
        this.submitted = true; // set form submit to true
        if (isValid) {
            this.submitted = false;
            this.loader.ShowLoader();
            this.diagnosisModel.PatientId = this.PatientId;
            this.diagnosisModel.AdmissionId = this.AdmitId;
            this._AdmitService.DiagnosisSaveOrUpdate(this.diagnosisModel).then(m => {
                var result = JSON.parse(m._body);
                if (result.IsSuccess) {
                    this.PrimaryList = [];
                    this.SecondaryList = [];
                    this.AllergyList = [];
                    this.PrimaryList = result.ResultSet.Diagnosislist.filter(a => a.IsType == "P");
                    this.SecondaryList = result.ResultSet.Diagnosislist.filter(a => a.IsType == "S");
                    this.AllergyList = result.ResultSet.Diagnosislist.filter(a => a.IsType == "A");
                    this.toastr.Success(result.Message);
                    this.loader.HideLoader();
                }
                else {
                    this.toastr.Error('Error', result.ErrorMessage);
                    this.loader.HideLoader();
                }
                this.modalService.dismissAll(this.PrimaryModal);
            });
        }
    }



}


