import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../CommonService/CommonService';
@Component({
    selector: 'app-forgotpassconfirmation',
    templateUrl: './forgotpassconfirmation.component.html',
    styleUrls: ['../account.component.css'],
})
export class ForgotpassconfirmationComponent implements OnInit {
    public PayrollRegion: string;
    public Keywords: any[] = [];
    constructor(public commonservice: CommonService) {
        this.PayrollRegion = this.commonservice.getPayrollRegion();
        //this.Keywords = this.commonservice.GetKeywords("forgotpassword");
    }

    ngOnInit() {
    }

}
