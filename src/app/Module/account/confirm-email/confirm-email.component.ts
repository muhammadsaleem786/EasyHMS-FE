import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/User.model';
import { ValidationVariables } from '../../../AngularConfig/global';
import { LoaderService } from '../../../CommonService/LoaderService';
import { CommonToastrService } from '../../../CommonService/CommonToastrService';
import { CommonService } from '../../../CommonService/CommonService';
@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
    public model = new User();
    public Form1: FormGroup;
    public submitted: boolean;
    public IsSiginSocialShow: boolean = false;
    @ViewChild('closeModal') closeModal: ElementRef;
    AccountType: string;
    public Keywords: any[] = [];
    public PayrollRegion: string;
    constructor(
        public _fb: FormBuilder, public _router: Router,
        public accountService: AccountService, public loader: LoaderService, public toastr: CommonToastrService,
        public commonservice: CommonService
    ) {
        this.PayrollRegion = this.commonservice.getPayrollRegion();
        //this.Keywords = this.commonservice.GetKeywords("");
    }
    ngOnInit() {
        this.Form1 = this._fb.group({
            Email: ['', [<any>Validators.required, Validators.pattern(ValidationVariables.EmailPattern)]],
        });
    }

    ResendEmail(isValid: boolean): void {
        this.submitted = true; // set form submit to true
        if (isValid) {
            this.loader.ShowLoader();
            this.submitted = false;
            this.accountService.ResendConfirmationEmail(this.model.Email).then(data => {
                let userModel: any = {};
                if (data.IsSuccess == true) {
                    userModel = data.ResultSet;
                    if (userModel.isActivated)
                        confirm('your account ' + userModel.Email + ' is already confirmed. Please login with your given credential');
                    else
                        this.toastr.Error(data.Message);

                    this.closeModal.nativeElement.click();
                    this.model.Email = '';
                }
                else
                    this.toastr.Warning('Invalid Email', 'Sorry invalid email address');

                this.loader.HideLoader();
            });
        }
    }

}
