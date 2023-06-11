/// <reference path="../../../theme/module/company/company.service.ts" />
/// <reference path="../../../theme/module/company/company.service.ts" />
/// <reference path="../../../theme/module/company/company.service.ts" />
/// <reference path="../../../theme/module/company/company.service.ts" />
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationVariables } from '../../../AngularConfig/global';
import { AuthenticationService } from '../../../CommonService/AuthenticationService';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Login } from '../../model/Login.model';
import { User } from '../../model/User.model';
import { Company } from '../../../../app/theme/Module/models/company.model';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../CommonService/LoaderService';
import { CommonToastrService } from '../../../CommonService/CommonToastrService';
import { CommonService } from '../../../CommonService/CommonService';
import { CompanyService } from '../../../../app/theme/Module/company/company.service';
import { DashboardMenuService } from '../../../CommonService/DashboardMenuService';
//import { RecaptchaModule, RecaptchaComponent, RecaptchaLoaderService } from 'ng-recaptcha';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../account.component.css'],
    providers: [CompanyService, DashboardMenuService/*, RecaptchaLoaderService*/],

})
export class RegisterComponent implements OnInit {
    model: any = {};
    public Companymodel = new Company();
    public usermodel = new User();
    public Form1: FormGroup;
    public Form2: FormGroup;
    public Form3: FormGroup;
    public submitted: boolean;
    public IsRegshow: boolean = false;
    public IsAlreadyUser: boolean = false;
    AccountType: string;
    public Loginmodel = new Login();
    public PayrollRegion: string;
    public Recaptcha: boolean = false;
    public Keywords: any[] = [];
    public captcha: any[];

    constructor(public _fb: FormBuilder, public companyService: CompanyService, public DashboardMenu: DashboardMenuService, public _router: Router, public accountService: AccountService, public commonservice: CommonService,

        public loader: LoaderService, public toastr: CommonToastrService,
    ) {
        this.accountService.IsPayrollRegion();
        this.accountService.IsUserLogin();

        this.PayrollRegion = this.commonservice.getPayrollRegion();
        this.usermodel.MultilingualId = 1;
        this.model.MultilingualId = 1;
    }

    ngOnInit() {
        this.Form1 = this._fb.group({
            Email: ['', [<any>Validators.required, Validators.pattern(ValidationVariables.EmailPattern)]],
        });
        this.Form2 = this._fb.group({
            Name: ['', [Validators.pattern(ValidationVariables.AlphabetPattern), Validators.required]],
            CompanyName: ['', [Validators.pattern(ValidationVariables.AlphabetPattern), Validators.required]],
            Pwd: ['', [Validators.required, <any>Validators.minLength(6)]],
            CPassword: [''],
            agree: ['', [Validators.required]],
            Email: ['', [<any>Validators.required, Validators.pattern(ValidationVariables.EmailPattern)]],
            PhoneNo: ['', [Validators.pattern(ValidationVariables.NumberPattern), <any>Validators.required, <any>Validators.minLength(6), <any>Validators.maxLength(20)]],
        });
        this.Form3 = this._fb.group({
            Email: ['', [<any>Validators.required, Validators.pattern(ValidationVariables.EmailPattern)]],
            Pwd: ['', [Validators.required, <any>Validators.minLength(6)]],
        });
    }
    resolved(captchaResponse: any[]) {
        this.captcha = captchaResponse;
        this.Recaptcha = true;
    }
    VerifyEmail(isValid: boolean): void {
        this.submitted = true;
        if (isValid) {
            this.submitted = false;
            this.loader.ShowLoader();
            let eml = this.model.Email;
            this.accountService.IsEmailExist(this.model.Email).then(
                data => {
                    if (data.IsSuccess) {

                        if (data.ResultSet == "Activate") {
                            this.IsRegshow = false;
                            this.toastr.Warning('Already Exist', 'Email ' + eml + ' already taken');
                            localStorage.setItem("email", eml);
                            this.IsAlreadyUser = true;
                            this.model.Email = eml;
                        }
                        else if (data.ResultSet == "Deactivate")
                            this._router.navigate(['/confirmemail']);
                    }
                    else {
                        this.IsRegshow = true;
                    }
                    this.loader.HideLoader();
                },
                error => {
                    this.IsRegshow = false;
                });
        }
    }

    SaveOrUpdate(isValid: boolean): void {
        if (this.model.agree == false) {
            isValid = false;
            this.loader.HideLoader();
            this.toastr.Error('Error', " If you want to sing up, please agree terms & conditions.");
        }
        //if (this.Recaptcha == false) {
        //    isValid = false;
        //    this.loader.HideLoader();
        //    this.toastr.Error('Error', "Please select captcha.");
        //}
        if (isValid)
            isValid = this.model.Pwd == this.model.CPassword;
        this.submitted = true; // set form submit to true
        if (isValid) {
            this.loader.ShowLoader();
            this.model.Source = window.location.hash.split("=")[1];
            if (this.model.Source == undefined)
                this.model.Source = 0;
            this.submitted = false;
            if (this.AccountType)
                this.model.AccountType = this.AccountType;
            else
                this.model.AccountType = "A";
            this.model.CompanyName = this.model.CompanyName;
            this.model.Email = this.model.Email;
            this.model.ContactPersonFirstName = this.model.Name;
            this.model.ContactPersonLastName = this.model.Name;
            this.model.GenderID = 1;
            this.model.Phone = this.model.PhoneNo;
            this.model.Fax = this.model.Fax;
            this.model.LanguageID = 1;
            this.model.CompanyTypeID = 15;
            this.model.IsApproved = false;
            this.accountService.SaveOrUpdate(this.model).then(m => {
                var result = JSON.parse(m._body);
                if (result.IsSuccess) {
                    this.toastr.Success(result.Message);
                    this._router.navigate(['/contact']);
                    this.loader.HideLoader();
                }
                else {
                    this.loader.HideLoader();
                    this.toastr.Error('Error', result.ErrorMessage);
                }
            });
        }
    }

    login(isValid: boolean): void {
        this.submitted = true;
        if (isValid) {
            this.submitted = false;
            this.loader.ShowLoader();
            this.accountService.Login(this.model).then(
                data => {
                    var result = JSON.parse(data._body);
                    if (result.Message) {

                        this._router.navigate(['/confirmemail']);
                    } else {
                        if (result.IsSuccess == true) {
                            this._router.navigate(['/company']);
                        }
                    }
                    this.loader.HideLoader();
                },
                error => {
                    this.loader.HideLoader();
                    //this.toastr.Error('Error',error);
                });
        }
    }
    changeLanguage(event: any) {
        this.loader.ShowLoader();
        this.usermodel.MultilingualId = event;
        this.model.MultilingualId = event;
        this.commonservice.OnlychangeLanguage(event).then(m => {
            if (m.IsSuccess) {
                this.loader.HideLoader();
                //this.Keywords = this.commonservice.GetKeywords("");
            }
        });
    }
    public socialSignUp(socialPlatform: string) {
        this.toastr.Info("Coming Soon", "This page is under construction...");
        //    let socialPlatformProvider;
        //    if (socialPlatform == "facebook") {
        //        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        //    } else if (socialPlatform == "google") {
        //        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        //    }
        //    // this.loading = true;
        //    this.socialAuthService.signIn(socialPlatformProvider).then(
        //        (userData) => {
        //            if (socialPlatform == "facebook") 
        //                this.AccountType = "F";
        //             else if (socialPlatform == "google") 
        //                this.AccountType = "G";
        //             else 
        //                this.AccountType = "A";

        //            this.model = {
        //                Name: userData.name,
        //                Email: userData.email,
        //                AccountType: this.AccountType,
        //            }

        //            this.accountService.IsEmailExist(this.model.Email).then(
        //                data => {
        //                    if (data.IsSuccess) {
        //                        this.IsRegshow = false;
        //                        this.toastr.Warning('Already Exist','Email Already Exist');
        //                        this.IsAlreadyUser = true;
        //                    }
        //                    else 
        //                        this.IsRegshow = true;

        //                    this.loader.HideLoader();
        //                },
        //                error => {
        //                    this.IsRegshow = false;
        //                    this.loader.HideLoader();
        //                });
        //        }
        //    );
    }
}
