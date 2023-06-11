import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../Module/account/account.service';
import { Router } from '@angular/router';
import { SetupPass } from '../models/setup-pass.model';
import { LoaderService } from '../../../CommonService/LoaderService';
import { CommonToastrService } from '../../../CommonService/CommonToastrService';
import { EncryptionService } from '../../../CommonService/encryption.service';
@Component({
    selector: 'app-createpassword',
    templateUrl: './createpassword.component.html',
    // styleUrls: ['./createpassword.component.css'],
})
export class CreatepasswordComponent implements OnInit {
    public Form1: FormGroup;
    public submitted: boolean;
    public model = new SetupPass();
    public socialLogin: string;
    constructor(public _fb: FormBuilder, public _router: Router, public accountService: AccountService,
        public loader: LoaderService, private encrypt: EncryptionService, public toastr: CommonToastrService) { }

    ngOnInit() {
        this.Form1 = this._fb.group({
            Pwd: ['', [<any>Validators.required, <any>Validators.minLength(6)]],
            CPassword: [''],
        });

        this.loader.ShowLoader();
        let valueForUser: any = JSON.parse(this.encrypt.decryptionAES(localStorage.getItem('currentUser')));
        if (valueForUser !== null && valueForUser !== 'undefined') {
            this.socialLogin = valueForUser.AccountType;
            if (!(this.socialLogin === 'F' || this.socialLogin === 'G'))
                this._router.navigate(['changepassword']);
        }
        this.loader.HideLoader();

    }

    Save(isValid: boolean): void {
        if (isValid)
            isValid = this.model.Pwd == this.model.CPassword;
        this.submitted = true; // set form submit to true
        if (isValid) {
            this.loader.ShowLoader();
            this.submitted = false;
            this.accountService.createPassword(this.model).then(m => {
                var result = JSON.parse(m._body);
                if (result.IsSuccess) {
                    this.loader.HideLoader();
                    //alert(result.Message);
                }
                else
                    this.toastr.Error('Error', result.ErrorMessage);

                this.loader.HideLoader();
            });
        }
    }
}
