import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { AuthenticationService } from '../../../CommonService/AuthenticationService';
import { Router } from '@angular/router';
import { ValidationVariables } from '../../../AngularConfig/global';
import { LoaderService } from '../../../CommonService/LoaderService';
import { CommonToastrService } from '../../../CommonService/CommonToastrService';
import { CommonService } from '../../../CommonService/CommonService';
@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['../account.component.css'],
    providers: [FormBuilder, AccountService, AuthenticationService]
})
export class ForgotpasswordComponent implements OnInit {
    model: any = {};
    public Form: FormGroup;
    public submitted: boolean;
    public PayrollRegion: string;
    public Keywords: any[] = [];
    constructor(private _fb: FormBuilder, private _router: Router,
        private _authService: AuthenticationService, private accountService: AccountService
        , public loader: LoaderService, private toastr: CommonToastrService, public commonservice: CommonService
    ) {
        this.PayrollRegion = this.commonservice.getPayrollRegion();
        //this.Keywords = this.commonservice.GetKeywords("forgotpassword");
    }

    ngOnInit() {
        this.Form = this._fb.group({
            Email: ['', [<any>Validators.required, Validators.pattern(ValidationVariables.EmailPattern)]],
        });
    }

    forgotpass(isValid: boolean): void {
        this.submitted = true;
        if (isValid) {
            this.submitted = false;
            this.loader.ShowLoader();
            this.accountService.forgotpasswd(this.model.Email).then(
                data => {
                    if (data.IsSuccess) {
                        debugger
                        if (data.ResultSet == "Deactivate")
                            this._router.navigate(['/confirmemail']);
                        else
                            this._router.navigate(['/forgotpassconfirmation']);
                    } else {
                        this.toastr.Error('Error', data.ErrorMessage);
                    }
                    this.loader.HideLoader();
                },
                error => {
                    this.loader.HideLoader();
                    this.toastr.Error('Error', error);
                });

        }
    }

}
