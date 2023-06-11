import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company/company.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../CommonService/LoaderService';
import { ValidationVariables } from '../../../AngularConfig/global';
import { Company } from '../../Module/models/company.model';
import { CommonService } from '../../../CommonService/CommonService';
import { DashboardMenuService } from '../../../CommonService/DashboardMenuService';
import { CommonToastrService } from '../../../CommonService/CommonToastrService';
import { EncryptionService } from '../../../CommonService/encryption.service';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css'],
    providers: [CompanyService],
})
export class CompanyComponent implements OnInit {
    @ViewChild('stepper') stepper;
    public model = new Company();
    public CompanyTypes = [];
    public TotalEmployees = [];
    public Countries = [];
    public Cities = [];
    public FilterCities = [];
    public IsCheck: boolean = false;
    public Islaststep: boolean;
    // public Form3: FormGroup;
    public submitted: boolean;
    public IsRegshow: boolean = false;
    public IsAlreadyUser: boolean = false;
    AccountType: string;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    furthFormGroup: FormGroup;
    isOptional = false;
    public Keywords: any[] = [];
    // public Loginmodel = new Login();
    public PayrollRegion: string;
    constructor(public _fb: FormBuilder, public _router: Router, public companyService: CompanyService, public commonservice: CommonService
        , public loader: LoaderService, public DashboardMenu: DashboardMenuService, public toastr: CommonToastrService, private encrypt: EncryptionService) {
        //this.Keywords = this.commonservice.GetKeywords("company");
        this.PayrollRegion = "PK";//this.commonservice.getPayrollRegion();
    }

    ngOnInit() {
        this.firstFormGroup = this._fb.group({
            CompanyName: ['', [Validators.pattern(ValidationVariables.AlphabetPattern), Validators.required]],
            CompanyTypeID: [''],
            TotalEmployeeID: [''],
            Website: [''],
            //Website: ['', [Validators.pattern(ValidationVariables.UrlPattern)]],
            Email: ['', [Validators.pattern(ValidationVariables.EmailPattern)]],
           });

        this.secondFormGroup = this._fb.group({
            ContactPersonFirstName: ['', [Validators.pattern(ValidationVariables.AlphabetPattern), <any>Validators.required]],
            ContactPersonLastName: ['', [Validators.pattern(ValidationVariables.AlphabetPattern), <any>Validators.required]],
            GenderID: [''],
            Phone: [''],
            Fax: [''],
        });

        this.thirdFormGroup = this._fb.group({
            LocationName: ['', [Validators.required]],
            Address: ['', [Validators.required]],
            CountryID: [''],
            CityID: [''],
            ZipCode: [''],
        });
        
        //loading all dropdowns
        this.loader.ShowLoader();
        this.commonservice.LoadDropdown("1,2,3,4").then(m => {
            if (m.IsSuccess) {
                let list = m.ResultSet.dropdownValues;
                this.CompanyTypes = list.filter(f => f.DropDownID == 1);
                this.TotalEmployees = list.filter(f => f.DropDownID == 2);
                this.Countries = list.filter(f => f.DropDownID == 3);
                this.Cities = list.filter(f => f.DropDownID == 4);

                var item = this.TotalEmployees.filter(x => x.ID == 1);
              

                item = this.CompanyTypes.filter(x => x.ID == 3);
                if (item.length > 0)
                    this.model.CompanyTypeID = item[0].ID;
                if (this.PayrollRegion == 'SA')
                    item = this.Countries.filter(x => x.ID == 1);
                else
                    item = this.Countries.filter(x => x.ID == 2);
                if (item.length > 0) {
                    this.model.adm_company_location[0].CountryID = item[0].ID;
                    this.CountrySelChange();
                }
            }
        });
        this.model.GenderID = 1;
        this.loader.HideLoader();
        //this.model.Email = localStorage.getItem('email');
        //this.model.ContactPersonFirstName = localStorage.getItem('UserName');
        //this.model.ContactPersonLastName = localStorage.getItem('UserName');
        //this.model.Phone = localStorage.getItem('PhoneNO');
        //this.model.Fax = localStorage.getItem('Fax');
    }

    CountrySelChange() {
        this.FilterCities = this.Cities.filter(x => x.DependedDropDownValueID == this.model.adm_company_location[0].CountryID);
        if (this.FilterCities.length > 0)
            this.model.adm_company_location[0].CityID = this.FilterCities[0].ID;
    }
    changestep(index: number) {
        if (index == 3) {
            //this.model.pr_employee_shift[0].WDMonday = true;
            //this.model.pr_employee_shift[0].WDTuesday = true;
            //this.model.pr_employee_shift[0].WDWednesday = true;
            //this.model.pr_employee_shift[0].WDThursday = true;
            //this.model.pr_employee_shift[0].WDFriday = true;
        }
    }

    isWrkingDaySelected(isValid: boolean) {
        //if (this.model.pr_employee_shift[0].WDMonday == true || this.model.pr_employee_shift[0].WDTuesday == true || this.model.pr_employee_shift[0].WDWednesday == true || this.model.pr_employee_shift[0].WDThursday == true || this.model.pr_employee_shift[0].WDFriday == true || this.model.pr_employee_shift[0].WDSatuday == true || this.model.pr_employee_shift[0].WDSunday == true) {
        //    this.Islaststep = true;
        //    return true;
        //}
        //else {
        //    this.Islaststep = false;
        //    return false;
        //}
    }


    //IsValidWebUrl() {

    //    var regex = new RegExp(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm);
    //    if (this.model.Website != '' && !regex.test(this.model.Website)) {
    //        this.toastr.Error('Incorrect Url', 'Please enter valid website url. e.g www.google.com (OR) https://www.google.com')
    //        //event.preventDefault();
    //        return false;
    //    }
    //    return true;
    //}

    SaveCompany(isValid: boolean): void {
        this.submitted = true; // set form submit to true

        //if (isValid)
        //    isValid = this.IsValidWebUrl();

        if (isValid) {
            this.loader.ShowLoader();
            this.submitted = false;
            this.companyService.SaveOrUpdate(this.model).then(m => {
                var result = JSON.parse(m._body);
                if (result.IsSuccess) {
                    this.loader.HideLoader();
                    localStorage.removeItem('company');
                    var company = JSON.stringify(result.ResultSet.Company);
                    localStorage.setItem('company', this.encrypt.encryptionAES(company));
                    this.DashboardMenu.ShowMenues();
                    this._router.navigate(['/login']);
                }
                else
                    this.toastr.Error('Error', result.ErrorMessage);
                this.loader.HideLoader();
            });
        }
    }

    OnKeyPress(event): boolean {
        var inputValue = event.which;
        //allow letters and whitespaces only.
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0 && inputValue != 122 && inputValue != 121)) {
            event.preventDefault();
            return false;
        }
        return true;
    }


    IsvalidPhone(TxtBoxName: string) {
        var re = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$');
        if (TxtBoxName == 'CPM' && !re.test(this.model.Phone))
            this.model.Phone = '';
        else if (TxtBoxName == 'WP' && !re.test(this.model.Fax))
            this.model.Fax = '';
    }

}