﻿import { Injectable } from '@angular/core';
import { GlobalVariable } from '../../../../../AngularConfig/global';
import { HttpService } from '../../../../../CommonService/HttpService';
import { LeaveApplicationModel } from './LeaveApplicationModel';


@Injectable()
export class LeaveApplicationService {


    private urlToApi = GlobalVariable.BASE_Api_URL + "/api/Employee/pr_leave_application"

    constructor(private http: HttpService) { }

    GetList(CurrentPage: number, RecordPerPage: number, VisibleColumnInfo: string, SortName: string, SortOrder: string, SearchText: string): Promise<any> {
        var data = { 'CurrentPageNo': CurrentPage, 'RecordPerPage': RecordPerPage, 'VisibleColumnInfo': VisibleColumnInfo, 'SortName': SortName, 'SortOrder': SortOrder, 'SearchText': SearchText, 'IgnorePaging': false };
        return this.http.Get(this.urlToApi + '/Pagination', data).then(e => e);
    }


    ExportData(ExportType: number, CurrentPage: number, RecordPerPage: number, VisibleColumnInfo: string, SortName: string, SortOrder: string, SearchText: string): Promise<any> {
        var data = { 'ExportType': ExportType, 'CurrentPageNo': CurrentPage, 'RecordPerPage': RecordPerPage, 'VisibleColumnInfo': VisibleColumnInfo, 'SortName': SortName, 'SortOrder': SortOrder, 'SearchText': SearchText, 'IgnorePaging': true };
        return this.http.Get(this.urlToApi + '/ExportData', data).then(e => {
            if (e.FilePath != "")
                this.http.ExportDataDownload(GlobalVariable.BASE_Api_URL, e.FilePath);

            return e;
        });
    }

    GetById(Id: number): Promise<any> {
        var data = { 'Id': Id };
        return this.http.Get(this.urlToApi + '/GetById', data).then(e => e);
    }
    GetLeavesByEmpID(Id: number): Promise<any> {
        var data = { 'EmpID': Id};
        return this.http.Get(this.urlToApi + '/GetLeavesByEmpID', data).then(e => e);
    }

    SaveOrUpdate(entity: LeaveApplicationModel): Promise<any> {
        
        if (isNaN(entity.ID) || entity.ID == 0)
            return this.http.Post(this.urlToApi + '/Save', entity).then(e => e);
        else
            return this.http.Put(this.urlToApi + '/Update', entity).then(e => e);
    }

    Delete(Id: string): Promise<any> {
        var data = { 'Id': Id };
        return this.http.Delete(this.urlToApi + '/Delete', data).then(e => e);
    }

    FormLoad(): Promise<any> {
        return this.http.Get(this.urlToApi + '/Load', {}).then(e => e);
    }

    GetLeaveTypes(): Promise<any> {
        return this.http.Get(this.urlToApi + '/GetLeaveTypes', {}).then(e => e);
    }
    GetLeaveWorkingHour(): Promise<any> {
        return this.http.Get(this.urlToApi + '/GetLeaveWorkingHour', {}).then(e => e);
    }

    GetFilterEmployees(Keyword: string): Promise<any> {
        var data = { 'Keyword': Keyword };
        return this.http.Get(this.urlToApi + '/GetFilterEmployees', data);
    }

    GetLeavesByTypes(Keyword: string): Promise<any> {
        var data = { 'Keyword': Keyword };
        return this.http.Get(this.urlToApi + '/GetLeavesByTypes', data);
    }
}
