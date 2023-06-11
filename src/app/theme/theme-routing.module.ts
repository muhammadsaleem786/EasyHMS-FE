import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../CommonService/AuthGuard';
import { LayoutModule } from '../theme/layouts/layout.module';
import { AppComponent } from '../app.component';
import { CompanyComponent } from './Module/company/company.component';
import { CookieService } from 'ngx-cookie-service';
import { DashboardMenuService } from '../CommonService/DashboardMenuService';
import { ChangepasswordComponent } from './Module/changepassword/changepassword.component';

import { CreatepasswordComponent } from './Module/createpassword/createpassword.component';
import { SetupDashboardComponent } from './Module/setup/SetupDashboard/SetupDashboardComponent';
import { ReportComponentForm } from '../theme/Module/Reports/ReportComponentForm';
import { DashboardForm } from '../theme/Module/Dashboard/DashboardForm';
import { PasswordchangedComponent } from '../Module/account/passwordchanged/passwordchanged.component';
import { PageListComponent } from '../CommonComponent/PageList/PageListComponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatStepperModule } from '@angular/material';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyDatePickerModule } from 'mydatepicker';
import { PatientComponentForm } from '../theme/Module/setup/Patient/PatientComponentForm';
import { PatientComponentList } from '../theme/Module/setup/Patient/PatientComponentList';
import { ExpenseComponentForm } from '../theme/Module/setup/Expense/ExpenseComponentForm';
import { ExpenseComponentList } from '../theme/Module/setup/Expense/ExpenseComponentList';


import { PrescriptionComponentForm } from '../theme/Module/setup/Prescription/PrescriptionComponentForm';
import { PrescriptionComponentList } from '../theme/Module/setup/Prescription/PrescriptionComponentList';
import { BillingComponentForm } from '../theme/Module/setup/Billing/BillingComponentForm';
import { BillingComponentList } from '../theme/Module/setup/Billing/BillingComponentList';
import { IncomeComponentForm } from '../theme/Module/setup/Income/IncomeComponentForm';
import { IncomeComponentList } from '../theme/Module/setup/Income/IncomeComponentList';
import { SummeryComponentList } from '../theme/Module/setup/Patient/SummeryComponentList';
import { VitalComponentList } from '../theme/Module/setup/Patient/VitalComponentList';
import { BillSummeryComponentForm } from '../theme/Module/setup/Patient/BillSummeryComponentForm';
import { AppointSummeryComponentList } from '../theme/Module/setup/Patient/AppointSummeryComponentList';
import { DocumentSummeryComponentList } from '../theme/Module/setup/Patient/DocumentSummeryComponentList';
import { CommonModule } from '@angular/common';
import { CommonUtilsModule } from '../common/common-utils.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgxPrintModule } from 'ngx-print';
import { NgxEchartsModule } from 'ngx-echarts';

const SecureRoutes: Routes = [
   {
        'path': '',
        'component': ThemeComponent,
        'canActivate': [AuthGuard],
        children: [
            { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
            { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard] },
            { path: 'createpassword', component: CreatepasswordComponent, canActivate: [AuthGuard] },
            { path: 'passwordchange', component: PasswordchangedComponent, canActivate: [AuthGuard] },
            { path: 'setup', component: SetupDashboardComponent, canActivate: [AuthGuard] },
            { path: 'dashboard', component: DashboardForm, canActivate: [AuthGuard] },
            { path: 'dashboard', component: DashboardForm, canActivate: [AuthGuard] },
            { path: 'Patient', component: PatientComponentList, canActivate: [AuthGuard] },
            { path: 'Patient/savePatient:id', component: PatientComponentForm, canActivate: [AuthGuard] },
            { path: 'Patient/savePatient', component: PatientComponentForm, canActivate: [AuthGuard] },  
            {
                path: 'Summary', component: SummeryComponentList, canActivate: [AuthGuard],
                children: [
                    { path: 'Vital:id', component: VitalComponentList, canActivate: [AuthGuard] },
                    { path: 'Vital', component: VitalComponentList, canActivate: [AuthGuard] },
                    { path: 'BillSummary:id', component: BillSummeryComponentForm, canActivate: [AuthGuard] },
                    { path: 'BillSummary', component: BillSummeryComponentForm, canActivate: [AuthGuard] },
                    { path: 'AppointSummery:id', component: AppointSummeryComponentList, canActivate: [AuthGuard] },
                    { path: 'AppointSummery', component: AppointSummeryComponentList, canActivate: [AuthGuard] },
                    { path: 'DocSummery:id', component: DocumentSummeryComponentList, canActivate: [AuthGuard] },
                    { path: 'DocSummery', component: DocumentSummeryComponentList, canActivate: [AuthGuard] },
                ]
            },

           

            { path: 'Expense', component: ExpenseComponentList, canActivate: [AuthGuard] },
            { path: 'Expense/saveExpense:id', component: ExpenseComponentForm, canActivate: [AuthGuard] },
            { path: 'Expense/saveExpense', component: ExpenseComponentForm, canActivate: [AuthGuard] },
            { path: 'Prescription', component: PrescriptionComponentList, canActivate: [AuthGuard] },
            { path: 'Prescription/savePrescription:id', component: PrescriptionComponentForm, canActivate: [AuthGuard] },
            { path: 'Prescription/savePrescription', component: PrescriptionComponentForm, canActivate: [AuthGuard] },
            { path: 'Billing', component: BillingComponentList, canActivate: [AuthGuard] },
            { path: 'Billing/savebill:id', component: BillingComponentForm, canActivate: [AuthGuard] },
            { path: 'Billing/savebill', component: BillingComponentForm, canActivate: [AuthGuard] },
            { path: 'report', component: ReportComponentForm, canActivate: [AuthGuard] },           
            { path: 'Income', component: IncomeComponentList, canActivate: [AuthGuard] },
            { path: 'Income/saveIncome:id', component: IncomeComponentForm, canActivate: [AuthGuard]},
            { path: 'Income/saveIncome', component: IncomeComponentForm, canActivate: [AuthGuard] },           
        ],
    },
    {
        'path': '**',
        'redirectTo': 'login',
        'pathMatch': 'full',
    },
];
export const SecureComponent: any[] = [
    SummeryComponentList, AppointSummeryComponentList, 
    BillSummeryComponentForm, 
    IncomeComponentForm, IncomeComponentList, VitalComponentList, 
    PasswordchangedComponent,
    CompanyComponent, DocumentSummeryComponentList, 
    ChangepasswordComponent, 
    CreatepasswordComponent,
    SetupDashboardComponent,
    ReportComponentForm,
    DashboardForm,
    PageListComponent,
    PatientComponentList, PatientComponentForm, ExpenseComponentList, ExpenseComponentForm,
    PrescriptionComponentList, PrescriptionComponentForm, BillingComponentForm, BillingComponentList
];
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, LayoutModule, RouterModule.forChild(SecureRoutes), MatStepperModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatCheckboxModule
        , MatSelectModule, MatIconModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatSortModule, MyDatePickerModule, NgbModule, MultiselectDropdownModule, NgxEchartsModule, NgxPrintModule/*,MultiselectDropdownModule, NgxEchartsModule*/
        , CommonUtilsModule],
    exports: [RouterModule],
    declarations: [
        SecureComponent //DatetimePickerComponent, DialogboxComponent
    ],
    bootstrap: [],
    providers: [CookieService, AuthGuard, DashboardMenuService]
})
export class ThemeRoutingModule { }