import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
    selector: 'app-passwordchanged',
    templateUrl: './accpasswordchange.component.html',
    styleUrls: ['../account.component.css'],
})
export class accpasswordchangeComponent implements OnInit {
    constructor() { }
    ngOnInit() {
    }
    // currentURL='';
    // constructor(public router: ActivatedRoute, private accountService : AccountService, private _router: Router ) { 
    //   
    //   this.currentURL=window.location.href;
    //    if(this.currentURL) {
    //       
    //       let params = this.currentURL.split('=')[1];
    //           // this.loading = true;
    //           this.accountService.EmailCofirmed(params).then(
    //             data => {
    //               
    //               if (data.IsSuccess) {
    //                 this._router.navigate(['/passwordchanged']);
    //               }else{
    //                 alert('Invalid Link');      
    //                         }
    //               // this.loading = false;
    //             },
    //             error => {
    //               alert(error);
    //               // thi}('alertSignin');
    //               // this._alertService.error(error);
    //               // this.loading = false;
    //             });
    //        }
    //  }


}
