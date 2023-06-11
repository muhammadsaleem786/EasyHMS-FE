import { Component, OnInit, ViewEncapsulation, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Helpers } from '../../../helpers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../Module/company/company.service';
import { LoaderService } from '../../../CommonService/LoaderService';
import { Router } from '@angular/router';
import { ValidationVariables } from '../../../AngularConfig/global';
import { Company } from '../../Module/models/company.model';
import { Jsonp } from '@angular/http';
import { CommonService } from '../../../CommonService/CommonService';
import { User } from '../../../Module/model/User.model';
import { EncryptionService } from '../../../CommonService/encryption.service';
declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [FormBuilder, CompanyService],
})
export class AsideNavComponent implements OnInit, AfterViewInit {
    Form1: FormGroup;
    public submitted: boolean;
    public isCompanyExist: boolean;
    public model = new Company();
    public Usermodel = new User();
    public LoadModules = [];
    public Keywords: any[] = [];
    public val: string = "";
    @Output() profilePopup: EventEmitter<void> = new EventEmitter<void>();

    constructor(public _fb: FormBuilder, private encrypt: EncryptionService, public _router: Router, public companyService: CompanyService, public commonservice: CommonService,
        public loader: LoaderService, ) {

        this.loader.ShowLoader();
        let value: any = localStorage.getItem('Company');
        //this.Keywords = this.commonservice.GetKeywords("AsideNav");

        if (value !== null && value !== 'undefined' && value !== '{}') {
            this.model = JSON.parse(localStorage.getItem('Company'));
            this.isCompanyExist = true;
            this._router.navigate(['/changepassword']);
            this.LoadDropDown();
        } else {
            this.isCompanyExist = false;
            this._router.navigate(['/company']);
        }

        this.Usermodel = JSON.parse(this.encrypt.decryptionAES(localStorage.getItem('currentUser')));
        if (this.Usermodel !== null) {           
            this.val = this.Usermodel.Pwd;
        }
        this.loader.HideLoader();
    }

    LoadDropDown(): any {

        this.loader.ShowLoader();
        this.commonservice.LoadDropdown("14").then(m => {
            if (m.IsSuccess)
                this.LoadModules = m.ResultSet.dropdownValues;
        });
        this.loader.HideLoader();
    }


    ngOnInit() {
        this.Form1 = this._fb.group({
            ContactPersonFirstName: ['', [Validators.pattern(ValidationVariables.AlphaNumeric), Validators.required]],
            ContactPersonLastName: ['', [Validators.pattern(ValidationVariables.AlphaNumeric), Validators.required]],
            GenderID: [''],
            Phone: [''],
            Fax: [''],
            Email: ['', [Validators.pattern(ValidationVariables.EmailPattern)]],
        });


    }
    ngAfterViewInit() {
        mLayout.initAside();
    }
    GetContactDetail() {

        this.profilePopup.emit();
    }

    EditContactInfo(isValid: boolean): void {
        this.submitted = true; // set form submit to true
        if (isValid) {

            this.loader.ShowLoader();
            this.submitted = false;
            this.companyService.EditContact(this.model).then(m => {
                var result = JSON.parse(m._body);
                if (result.IsSuccess) {
                    this.loader.HideLoader();
                    alert(result.Message);
                    localStorage.setItem('Company', JSON.stringify(result.ResultSet.Company));
                }
                else {
                    alert(result.ErrorMessage);
                }
                this.loader.HideLoader();
            });
        }
    }
}