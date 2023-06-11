import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { departmentService } from './departmentService';
import { departmentModel } from './departmentModel';
import { PaginationModel, PaginationConfig } from '../../../../../CommonComponent/PaginationComponentConfig';
import { CommonService } from '../../../../../CommonService/CommonService';
import { LoaderService } from '../../../../../CommonService/LoaderService';



@Component({
    moduleId: module.id,
    templateUrl: 'departmentComponentList.html',
    providers: [departmentService],
})

export class departmentComponentList {

    public Id: string;
    public PModel = new PaginationModel();
    public PConfig = new PaginationConfig();
    public departmentList: any[] = [];
    public IsList: boolean = true;
    public ID: number = 10;
    public Rights: any;


    constructor(public _CommonService: CommonService, public loader: LoaderService, public _departmentService: departmentService
        , public _router: Router) {
        this.loader.ShowLoader();
        // this.Rights = _CommonService.GetScreenRights("payscheduleListComponent");
    }



    ngOnInit() {


        this.PConfig.PrimaryColumn = "ID";
        this.PConfig.ColumnVisibilityCookieName = "Calendar" + this.ID;
        this.PConfig.Action.ScreenName = "Departments";
        // this.PConfig.Action.ScreenName = this.Rights['ScreenName'];
        // this.PConfig.Action.Add = this.Rights.Allow('Add');
        // this.PConfig.Action.Edit = this.Rights.Allow('Update');
        // this.PConfig.Action.View = this.Rights.Allow('View');
        // this.PConfig.Action.Delete = this.Rights.Allow('Delete');
        // this.PConfig.Action.Print = this.Rights.Allow('Print');
        this.PConfig.Action.Add = true;
        this.PConfig.Fields = [
            //{ Name: "ID", Title: "ID", OrderNo: 1, SortingAllow: true, Visible: true, isDate: false, DateFormat: "" },
            { Name: "DepartmentName", Title: "Name", OrderNo: 2, SortingAllow: true, Visible: true, isDate: false, DateFormat: "" },
            { Name: "Employees", Title: "Employees", OrderNo: 3, SortingAllow: true, Visible: true, isDate: false, DateFormat: "" }
        ];
    }

    Refresh() {
        if (this.PModel.SearchText == '')
            this.loader.ShowLoader();

        //;
        //var val = ((this.PModel.CurrentPage - 1) * this.PModel.RecordPerPage) + 1;
        //var val3 = (this.PModel.CurrentPage * this.PModel.RecordPerPage);
        //var val2 = ((this.PModel.CurrentPage * this.PModel.RecordPerPage) > this.PModel.TotalRecord ? this.PModel.TotalRecord : (this.PModel.CurrentPage * this.PModel.RecordPerPage));


        this.Id = "0";
        this._departmentService
            .GetList(this.PModel.CurrentPage, this.PModel.RecordPerPage, this.PModel.VisibleColumnInfo, this.PModel.SortName, this.PModel.SortOrder, this.PModel.SearchText).then(m => {
                this.PModel.TotalRecord = m.TotalRecord;
                this.departmentList = m.DataList;
                this.loader.HideLoader();
            });
    }

    GoBack(DefaultRoute) {
        this._router.navigate([DefaultRoute]);
    }


    ExportData(ExportType: number) {
        this.loader.ShowLoader();
        this._departmentService.ExportData(ExportType, this.PModel.CurrentPage, this.PModel.RecordPerPage, this.PModel.VisibleColumnInfo, this.PModel.SortName, this.PModel.SortOrder, this.PModel.SearchText).then(m => {
            this.loader.HideLoader();
        });
    }


    AddRecord(id: string) {
        ;
        if (id != "0")
            this.loader.ShowLoader();

        this.Id = id;
        this.IsList = false;
    }

    View(id: string) {
        this.loader.ShowLoader();
        this.Id = id;
        this.IsList = false;
    }

    Delete(id: string) {
        var result = confirm("Are you sure you want to delete selected record.");
        if (result == true) {
            this.loader.ShowLoader();
            this._departmentService.Delete(id).then(m => {

                if (m.ErrorMessage != null) {

                    alert(m.ErrorMessage);
                }
                this.Refresh();
            });
        }
    }


    GetList() {
        this.Refresh();
    }

    Close(idpar) {
        this.IsList = true;
        if (idpar == 0)
            this.Id = '0';
        else
            this.Refresh();
    }
}