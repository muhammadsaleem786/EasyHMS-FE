import { Component, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../../../../CommonService/LoaderService';
import { ReportService } from '../../../Module/Reports/ReportService';
import { ValidationVariables } from '../../../../AngularConfig/global';
import { CommonService } from '../../../../CommonService/CommonService';
import { CommonToastrService } from '../../../../CommonService/CommonToastrService';
import { EncryptionService } from '../../../../CommonService/encryption.service';
import { IMyDateModel } from 'mydatepicker';
import { GlobalVariable } from '../../../../AngularConfig/global';
import { ReportModel } from '../../Reports/ReportModel';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
declare var $: any;
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
    selector: 'OutstandingComponentRptForm',
    templateUrl: 'OutstandingComponentRptForm.html',
    moduleId: module.id,
    providers: [ReportService],
})
export class OutstandingComponentRptForm implements OnInit {
    @ViewChild('TABLE') TABLE: ElementRef;
    public model = new ReportModel();
    public Rights: any;
    public Keywords: any[] = [];
    public PayrollRegion: string;
    public DataList: any[];
    public CompanyName: string;
    public Form1: FormGroup; public total = 0; public CompanyObj: any;
    constructor(public _fb: FormBuilder,public _CommonService: CommonService, public loader: LoaderService
        , public _router: Router, public reportservice: ReportService, private encrypt: EncryptionService) {
        this.loader.ShowLoader();
      this.CompanyObj = JSON.parse(this.encrypt.decryptionAES(localStorage.getItem('company')));
        this.CompanyName = this.CompanyObj.CompanyName;
        this.PayrollRegion = "PK";//this._CommonService.getPayrollRegion();
    }
    ngOnInit() {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), 0, 1);
        var formdate = this._CommonService.GetFormatDate(firstDay);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var todate = this._CommonService.GetFormatDate(lastDay);
        this.model.FromDate = new Date(firstDay);
        this.model.ToDate = new Date(lastDay);
        this.Form1 = this._fb.group({
            ID: [''],
            FromDate: [''],
            ToDate: [''],
            PatientId: [''],
            DoctorId: [''],
        });
    }
    
    LoadDoctor() {
        $("#DoctorSearch").autocomplete({
            source: (request, response) => {
                this.loader.ShowLoader();
                this.reportservice.DoctorSearch(request.term).then(m => {
                    response(m.ResultSet.result);
                    this.loader.HideLoader();
                });
            },
            minLength: 1,
            select: (event, ui) => {
                this.model.DoctorId = ui.item.value;
                this.model.DoctorName = ui.item.label;
                return ui.item.label;
            }
        });
    }
    LoadPatient() {
        $('#PatientSearchByName').autocomplete({
            source: (request, response) => {
                this.loader.ShowLoader();
                this.reportservice.searchByName(request.term).then(m => {
                    response(m.ResultSet.PatientInfo);
                    this.loader.HideLoader();
                });
            },
            minLength: 1,
            select: (event, ui) => {
                this.model.PatientName = ui.item.label;
                this.model.PatientId = ui.item.value;
            }
        });
    }
    RunReport() {
        this.loader.ShowLoader();
        this.reportservice.PatientOutstandingRpt(this.model).then(m => {
            var result = JSON.parse(m._body);
            if (result.IsSuccess) {
                this.total = 0;
                this.DataList = result.ResultSet.billlist;
                this.DataList.forEach(x => {
                    this.total += x.OutstandingBalance
                });
                this.loader.HideLoader();
            } else
                this.loader.HideLoader();
        });
    }
    public DownloadPDF(): void {
        this.loader.ShowLoader();
        var data = document.getElementById('RptPDF');
        html2canvas(data).then(canvas => {
            var imgWidth = 208;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf('p', 'mm', 'a4');
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('Outstanding.pdf');
            this.loader.HideLoader();
        });
    }
    public DownloadExcel() {
        var data_type = 'data:application/vnd.ms-excel';
        var table_div = document.getElementById('RptPDF');
        var table_html = table_div.outerHTML.replace(/ /g, '%20');

        var a = document.createElement('a');
        a.href = data_type + ', ' + table_html;
        a.download = 'Outstanding.xls';
        a.click();
    }
}
