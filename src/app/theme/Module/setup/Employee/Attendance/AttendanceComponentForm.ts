import { Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AttendanceModel } from './AttendanceModel';
import { LoaderService } from '../../../../../CommonService/LoaderService';
import { AttendanceService } from './AttendanceService';
import { ValidationVariables } from '../../../../../AngularConfig/global';
import { CommonService } from '../../../../../CommonService/CommonService';
import { CommonToastrService } from '../../../../../CommonService/CommonToastrService';
import { IMyDpOptions, IMyDateModel, MyDatePicker } from 'mydatepicker';


@Component({
    selector: 'setup-AttendanceComponentForm',
    templateUrl: './AttendanceComponentForm.html',
    moduleId: module.id,
    providers: [AttendanceService, FormBuilder],
})

export class AttendanceComponentForm implements OnInit, OnChanges {

    public LeaveTypesList = [];
    public EmpfilteredList = [];
    public AttendanceStatusList = [];
    //public TakenLeavesByEmp = [];
    //public TotalLeavesOfEmp = [];
    public keyword: string;
    public DisplayMember: string;
    public LeaveType: string;
    //public DefaulCategoryID: number;
    //public DefaulAllowanceType: string;
    public Form1: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    @Output() pageClose: EventEmitter<number> = new EventEmitter<number>();
    @Input() ScreenName: string;
    @Input() id: number;
    public IsReadOnly = false;
    public IsEmpFound: boolean = false;
    public DefaultStatusID: number = 0;
    public model = new AttendanceModel();
    public AttendDate: Date = new Date();;
    public TimeIn: string;
    public TimeOut: string;
    public WasInside: boolean = false;

    @HostListener('click', ['$event'], )
    Clickoutdocument(event) {
        if (!this.WasInside)
            this.Close();

        this.WasInside = false;
    }

    IsModalClick() {
        this.WasInside = true;
    }
    @ViewChild('closeModal') closeModal: ElementRef;
    constructor(public _fb: FormBuilder, public loader: LoaderService
        , public _AttendanceService: AttendanceService, public toastr: CommonToastrService
        , public _commonService: CommonService) { }

    ngOnInit() {

        this.Form1 = this._fb.group({
            EmployeeID: ['', <any>[Validators.required]],
            TimeIn: ['', [Validators.required]],
            TimeOut: ['', [Validators.required]],
            StatusID: ['', [Validators.required]],
            AttendDate: ['', [Validators.required]],
        });


        this._commonService.LoadDropdown("27").then(m => {
            if (m.IsSuccess) {
                this.AttendanceStatusList = m.ResultSet;
                this.DefaultStatusID = this.AttendanceStatusList.length > 0 ? this.AttendanceStatusList[0].ID : 0;
                this.model.StatusID = this.DefaultStatusID;
            }
        });


    }
    ngOnChanges() {
        if (typeof (this.id) == "undefined") return;

        if (isNaN(this.id)) {
            this.IsReadOnly = true;
            this.id = +this.id.toString().substring(1); // (+) converts string 'id' to a number
        }
        else {
            this.id = +this.id; // (+) converts string 'id' to a number
            this.IsReadOnly = false;
        }

        if (this.id != 0) {
            this.loader.ShowLoader();
            this._AttendanceService.GetById(this.id).then(m => {
                this.model = m.ResultSet.model;
                this.DisplayMember = m.ResultSet.EmpName;
                this.IsEmpFound = true;
                var TimeIndate = new Date(this.model.TimeIn);
                //var TimeOutdate = new Date(this.model.TimeIn);
                this.AttendDate = TimeIndate;
                this.TimeIn = this.GetTimeformat(this.model.TimeIn)
                this.TimeOut = this.GetTimeformat(this.model.TimeOut)
                this.loader.HideLoader();
            });
        }
    }




    onDateFromChanged(event: IMyDateModel) {
    }
    onDateToChanged(event: IMyDateModel) {
    }

    GetLeavesByLeaveType(IsEdit) {
    }

    MatchesFound() {
        if (this.model.EmployeeID == undefined) {
            this.DisplayMember = ''; this.model.EmployeeID = undefined;
        }
    }

    FilterEmployees() {
        var self = this;
        this.model.EmployeeID = undefined;
        this.keyword = self.DisplayMember.toString();
        if (this.keyword.length >= 2) {
            self._AttendanceService.GetFilterEmployees(this.keyword).then((matches: any) => {
                self.EmpfilteredList = [];
                matches = matches.ResultSet;
                if (typeof matches !== 'undefined' && matches.length > 0) {
                    for (let i = 0; i < matches.length; i++) {
                        self.EmpfilteredList.push(matches[i]);
                        this.IsEmpFound = true;
                        if (self.EmpfilteredList.length > 20 - 1) {
                            break;
                        }
                    }
                } else { this.IsEmpFound = false; }
            });
        } else {
            self.EmpfilteredList = [];
        }
    }

    SelectItem(item: any) {
        if (item) {
            this.model.EmployeeID = item.ID;
            this.DisplayMember = item.FirstName + ' ' + item.LastName;
            this.EmpfilteredList = [];
            this.IsEmpFound = true;
        }
    }

    IsTimeInOutValid(): boolean {
        var tih = parseInt(this.TimeIn.split(':')[0]);
        var tim = parseInt(this.TimeIn.split(':')[1]);
        var toh = parseInt(this.TimeOut.split(':')[0]);
        var tom = parseInt(this.TimeOut.split(':')[1]);
        if ((tih == toh && tim > tom) || (tih > toh)) {
            this.toastr.Error('Incorrect Time', "Time-In can't be greater than Time-Out");
            return false;
        }
        return true;
    }

    SaveOrUpdate(isValid: boolean): void {
        this.submitted = true; // set form submit to true

        if (isValid) {
            isValid = this.IsTimeInOutValid();
        }


        if (isValid) {
            this.submitted = false;

            var attenD = new Date(this.GetFormatDate(this.AttendDate));
            this.model.TimIntxt = this.TimeIn;
            this.model.TimOuttxt = this.TimeOut;
            this.model.TimeIn = attenD;
            this.model.TimeOut = attenD;


            this.loader.ShowLoader();

            this._AttendanceService.SaveOrUpdate(this.model).then(m => {

                var result = JSON.parse(m._body);
                if (result.IsSuccess) {
                    this.WasInside = true;
                    this.closeModal.nativeElement.click();
                }
                else {
                    this.toastr.Error('Error', result.ErrorMessage);
                    this.loader.HideLoader();
                }
            });
        }
    }

    GetFormatDate(dat) {
        var date = new Date(dat);
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return yyyy + '-' + mm + '-' + dd;
    };

    GetTimeformat(dat: Date): string {
        var date = new Date(dat);
        var h = (date.getHours() < 10 ? '0' : '') + date.getHours();
        var m = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        return (h + ':' + m);
    }

    Delete() {
        var result = confirm("Are you sure you want to delete selected record.");
        if (result == true) {
            this.loader.ShowLoader();
            this._AttendanceService.Delete(this.model.ID.toString()).then(m => {
                if (m.ErrorMessage != null)
                    this.toastr.Error('Error', m.ErrorMessage);

                this.WasInside = true;
                this.closeModal.nativeElement.click();
            });
        }
    }

    Close() {
        if (!this.WasInside)
            this.pageClose.emit(0);
        else
            this.pageClose.emit(1);

        this.EmpfilteredList = [];
        this.model = new AttendanceModel();
        this.model.StatusID = this.DefaultStatusID;
        this.DisplayMember = '';
        this.model.EmployeeID = undefined;
        this.submitted = false;
        this.TimeIn = '';
        this.TimeOut = '';
        this.AttendDate = new Date();
    }

}
