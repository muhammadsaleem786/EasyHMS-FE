import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { URLSearchParams, } from '@angular/http';
import { AccountService } from '../account.service';
import { LoaderService } from '../../../CommonService/LoaderService';
import { CommonToastrService } from '../../../CommonService/CommonToastrService';
import { CommonService } from '../../../CommonService/CommonService';
@Component({
    selector: 'app-confirmed',
    templateUrl: './confirmed.component.html',
    styleUrls: ['../account.component.css'],
    providers: [AccountService,]
})
export class ConfirmedComponent implements OnInit {
    currentURL = '';
    public PayrollRegion: string;
    public Keywords: any[] = [];
    constructor(public router: ActivatedRoute, private accountService: AccountService, private _router: Router, public loader: LoaderService
        , private toastr: CommonToastrService, public commonservice: CommonService, ) {
        this.PayrollRegion = this.commonservice.getPayrollRegion();
        //this.Keywords = this.commonservice.GetKeywords("confirm");
    }

    ngOnInit() {
        this.loader.ShowLoader();
        this.currentURL = window.location.href;
        if (this.currentURL) {
            let params = this.currentURL.split('/confirmed?')[1];
            this.accountService.EmailCofirmed(params).then(
                data => {
                    if (data.IsSuccess) {
                        if (data.Message == "AlreadyConfirmed") {
                            this.toastr.Warning('Account already confirmed', 'your account ' + data.ResultSet.Email + ' is already confirmed. Please login with your given credential');
                            this._router.navigate(['/login']);
                        } else {
                            this._router.navigate(['/confirmed']);
                            localStorage.setItem('email', data.ResultSet.Email);
                            localStorage.setItem('UserName', data.ResultSet.Name);
                            localStorage.setItem('PhoneNO', data.ResultSet.PhoneNo);
                        }
                    }
                    else {
                        this.toastr.Error('Error', data.ErrorMessage);
                        this._router.navigate(['/home/login']);
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
