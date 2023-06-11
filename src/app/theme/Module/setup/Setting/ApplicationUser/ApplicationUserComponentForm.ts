import { Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApplicationUserModel } from './ApplicationUserModel';
import { LoaderService } from '../../../../../CommonService/LoaderService';
import { ApplicationUserService } from './ApplicationUserService';
import { ValidationVariables } from '../../../../../AngularConfig/global';
import { CommonService } from '../../../../../CommonService/CommonService';
import { CommonToastrService } from '../../../../../CommonService/CommonToastrService';
import { IMyDpOptions, IMyDateModel, MyDatePicker } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, filter } from 'rxjs/operators';
import { GlobalVariable } from '../../../../../AngularConfig/global';
import { EncryptionService } from '../../../../../CommonService/encryption.service';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
declare var $: any;
@Component({
    selector: 'setup-ApplicationUserComponentForm',
    templateUrl: './ApplicationUserComponentForm.html',
    moduleId: module.id,
    providers: [ApplicationUserService, FormBuilder],
})
export class ApplicationUserComponentForm implements OnInit {
    public RoleList = [];
    public WorkingdayList = [];
    public GenderList = [];
    public SpecialtyList = [];
    public keyword: string;
    public Form1: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    @Output() pageClose: EventEmitter<number> = new EventEmitter<number>();
    @Input() ScreenName: string;
    @Input() id: number;
    public IsReadOnly = false;
    public IsDoctor = false;
    public IsAdmin: boolean = false;
    public hide = true;
    public sub: any;
    public IsEdit: boolean = false;

    public model = new ApplicationUserModel();
    @ViewChild('closeModal') closeModal: ElementRef;
    public WasInside: boolean = false;
    public Keywords: any[] = []; public ControlRights: any;
    public UserProfileImage: string = '';
    public IsNewImage: boolean = true;
    @HostListener('click', ['$event'],)
    Clickoutdocument(event) {
        if (!this.WasInside)
            this.Close();
        this.WasInside = false;
    }
    IsModalClick() {
        this.WasInside = true;
    }
    public ColumnSettings: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        closeOnSelect: false,
        showCheckAll: true,
        showUncheckAll: true,
        dynamicTitleMaxItems: 1,
        maxHeight: '1000px',
    };
    public ColumnTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'UnSelect all',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Search...',
        defaultTitle: 'All',
    };
    constructor(public _CommonService: CommonService, public _fb: FormBuilder, public route: ActivatedRoute, public _router: Router
        , public loader: LoaderService, public _ApplicationUserService: ApplicationUserService
        , public toastr: CommonToastrService, public commonservice: CommonService, private encrypt: EncryptionService, private renderer: Renderer2) {
        //this.Keywords = this.commonservice.GetKeywords("ApplicationUser");
        this.ControlRights = this._CommonService.ScreenRights("3");
    }
    ngOnInit() {

        this.loadRole();
        this.Form1 = this._fb.group({
            Name: [''],
            UserID: [''],
            CompanyID: [''],
            RoleID: ['', [Validators.required]],
            Email: ['', [<any>Validators.required, Validators.pattern(ValidationVariables.EmailPattern)]],
            PhoneNo: ['', [Validators.required]],
            AdminID: [''],
            IsDefault: [''],
            SlotTime: [''],
            AppStartTime: [''],
            IsOverLap: [''],
            AppEndTime: [''],
            DocWorkingDay: [''],
            Designation: [''],
            Qualification: [''],
            Type: [''],
            SpecialtyId: [''],
            SpecialtyDropdownId: [''],
            GenderDropdown: [''],
            IsActivated: [''],
            UserImage: [''],
            RepotFooter: [''],
            Pwd: ['', [Validators.required, <any>Validators.minLength(6)]],
        });
        $(".toggle-password").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            var input = $($(this).attr("toggle"));
            if (input.attr("type") == "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });
        this.sub = this.route.queryParams
            .pipe(filter(params => params.id))
            .subscribe(params => {
                this.id = params.id;
                if (this.id > 0) {
                    this.loader.ShowLoader();
                    this.IsEdit = true;
                    this.loader.ShowLoader();
                    this._ApplicationUserService.GetById(this.id).then(m => {
                        this.model = m.ResultSet.UserObj;

                        if (this.model.UserImage != null && this.model.UserImage != undefined && this.model.UserImage != "") {
                            this.getImageUrlName(this.model.UserImage);
                            this.IsNewImage = false;
                        } else this.IsNewImage = true;

                        if (m.ResultSet.UserObj.StartTime != null)
                            this.model.AppStartTime = m.ResultSet.UserObj.StartTime;
                        if (m.ResultSet.UserObj.EndTime != null)
                            this.model.AppEndTime = m.ResultSet.UserObj.EndTime;
                        var days = m.ResultSet.UserObj.OffDay;
                        if (days != null) {
                            var list = days.split(',').map(function (item) {
                                return parseInt(item, 10);
                            });
                            this.model.DocWorkingDay = list;
                        }
                        var GenderList = m.ResultSet.UserObj.IsGenderDropdown;
                        if (GenderList != null) {
                            var list = GenderList.split(',').map(function (item) {
                                return parseInt(item, 10);
                            });
                            this.model.GenderDropdown = list;
                        }
                        if (this.model.SlotTime != null) {
                            //var slottime = {
                            //    "hour": parseInt(this.model.SlotTime.split(':')[0]),
                            //    "minute": parseInt(this.model.SlotTime.split(':')[1]),
                            //    "second": parseInt(this.model.SlotTime.split(':')[2])
                            //};
                            this.model.SlotTime = parseInt(this.model.SlotTime.split(':')[1]);
                        }
                        this.RoleList = m.ResultSet.role;
                        var findrole = this.RoleList.filter(a => a.ID == this.model.adm_user_company[0].RoleID && a.RoleName == "Doctor");
                        if (findrole.length > 0)
                            this.IsDoctor = true;
                        else
                            this.IsDoctor = false;

                        var result = m.ResultSet.UserObj.adm_user_company[0];
                        this.IsAdmin = result.UserID == result.AdminID ? true : false;
                        this.loader.HideLoader();
                    });

                } else {
                    this.loader.HideLoader();
                }
            });
        //this.phoneValidate();
    }
    onRoleChange(event) {
        var findrole = this.RoleList.filter(a => a.ID == parseInt(event) && a.RoleName == "Doctor");
        if (findrole.length > 0)
            this.IsDoctor = true;
        else
            this.IsDoctor = false;
    }
    loadRole() {
        this._ApplicationUserService.GetRoles().then(m => {
            if (m.IsSuccess) {
                this.RoleList = m.ResultSet.role;
                this.WorkingdayList = m.ResultSet.dropdown.filter(a => a.DropDownID == 12);
                this.GenderList = m.ResultSet.dropdown.filter(a => a.DropDownID == 2);
                this.SpecialtyList = m.ResultSet.dropdown.filter(a => a.DropDownID == 24);
            }
        });
    }
    SaveOrUpdate(isValid: boolean): void {
        let roleid = this.model.adm_user_company[0].RoleID;
        var findrole = this.RoleList.filter(a => a.ID == roleid && a.RoleName == "Doctor");
        if (findrole.length > 0) {
            if (this.model.SlotTime == null || this.model.SlotTime == undefined)
                return this.toastr.Error('Error', 'please select slot time.')

            if (this.model.AppStartTime == null || this.model.AppStartTime == undefined)
                return this.toastr.Error('Error', 'please select start time.')

            if (this.model.AppEndTime == null || this.model.AppEndTime == undefined)
                return this.toastr.Error('Error', 'please select end time.')

        }
        this.submitted = true; // set form submit to true
        if (isValid) {
            var multiid = parseInt(localStorage.getItem('lingualId'));
            this.submitted = false;
            this.loader.ShowLoader();
            this.model.MultilingualId = multiid;
            if (this.model.SlotTime != null) {
                var time = '0' + ':' + this.model.SlotTime + ':0';
                this.model.SlotTime = time;
            }
            this._ApplicationUserService.SaveOrUpdate(this.model).then(m => {
                var result = JSON.parse(m._body);
                if (result.IsSuccess) {
                    localStorage.removeItem('currentUser');
                    var user = JSON.stringify(result.ResultSet.Model);
                    localStorage.setItem('currentUser', this.encrypt.encryptionAES(user));

                    this.toastr.Success('Success', result.Message);
                    this._router.navigate(['home/aplicationUser']);
                }
                else
                    this.toastr.Error('Error', result.ErrorMessage);

                this.loader.HideLoader();
            });
        }
    }
    Delete() {
        var result = confirm("Are you sure you want to delete selected record.");
        if (result == true) {
            this.loader.ShowLoader();
            this._ApplicationUserService.Delete(this.model.ID.toString()).then(m => {
                if (m.ErrorMessage != null) {
                    this.toastr.Error('Error', m.ErrorMessage);
                } else {
                    this._router.navigate(['home/aplicationUser']);
                }
                this.loader.HideLoader();
            });
        }
    }
    Close() {
        if (!this.WasInside)
            this.pageClose.emit(0);
        else
            this.pageClose.emit(1);
    }
    phoneValidate() {
        const phoneControl: AbstractControl = this.Form1.controls['PhoneNo'];
        phoneControl.valueChanges.subscribe(data => {
            debugger
            let preInputValue: string = this.Form1.value.phone;
                let lastChar = preInputValue.length - 1;
                var newVal = data.replace(/\D/g, '');

                let start = this.renderer.selectRootElement('#tel').selectionStart;
                let end = this.renderer.selectRootElement('#tel').selectionEnd;
                if (data.length < preInputValue.length) {
                    //if (preInputValue.length < start) {
                    //    if (lastChar == '') {
                    //        newVal = newVal.substr(0, newVal.length - 1);
                    //    }
                    //}
                    if (newVal.length == 0) {
                        newVal = '';
                    }
                    else if (newVal.length <= 3) {
                        newVal = newVal.replace(/^(\d{0,3})/, '($1');
                    } else if (newVal.length <= 6) {
                        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
                    } else {
                        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
                    }

                    this.Form1['PhoneNo'].setValue(newVal, { emitEvent: false });
                    this.renderer.selectRootElement('#tel').setSelectionRange(start, end);
                } else {
                    var removedD = data.charAt(start);
                    if (newVal.length == 0) {
                        newVal = '';
                    }
                    else if (newVal.length <= 3) {
                        newVal = newVal.replace(/^(\d{0,3})/, '($1)');
                    } else if (newVal.length <= 6) {
                        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
                    } else {
                        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
                    }
                    if (preInputValue.length >= start) {
                        console.log(start + removedD);
                        if (removedD == '(') {
                            start = start + 1;
                            end = end + 1;
                        }
                        if (removedD == ')') {
                            start = start + 2;
                            end = end + 2;
                        }
                        if (removedD == '-') {
                            start = start + 1;
                            end = end + 1;
                        }
                        if (removedD == " ") {
                            start = start + 1;
                            end = end + 1;
                        }
                        this.Form1['PhoneNo'].setValue(newVal, { emitEvent: false });
                        this.renderer.selectRootElement('#tel').setSelectionRange(start, end);
                    } else {
                        this.Form1['PhoneNo'].setValue(newVal, { emitEvent: false });
                        this.renderer.selectRootElement('#tel').setSelectionRange(start + 2, end + 2);
                    }
                }
        });
    }
    IsNewImageEvent(FName) {
        this.IsNewImage = true;
    }
    getFileName(FName) {
        this.model.UserImage = FName;
    }
    ClearImageUrl() {
        this.IsNewImage = true;
        this.model.UserImage = '';
        this.UserProfileImage = '';
    }
    getImageUrlName(FName) {

        this.model.UserImage = FName;
        if (this.IsEdit && !this.IsNewImage) {
            this.UserProfileImage = GlobalVariable.BASE_File_URL + '' + FName;
        } else {
            this.UserProfileImage = GlobalVariable.BASE_Temp_File_URL + '' + FName;
        }
    }
}
