import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Module/account/register/register.component';
import { ContactComponent } from './Module/account/contact/contact.component';
import { LoginComponent } from './Module/account/login/login.component';
import { ForgotpasswordComponent } from './Module/account/forgotpassword/forgotpassword.component';
import { AccountComponent } from './Module/account/account.component';
import { ConfirmedComponent } from './Module/account/confirmed/confirmed.component';
import { ConfirmEmailComponent } from './Module/account/confirm-email/confirm-email.component';
import { ForgotpassconfirmationComponent } from './Module/account/forgotpassconfirmation/forgotpassconfirmation.component';
import { PasswordchangedComponent } from './Module/account/passwordchanged/passwordchanged.component';
import { ResetpasswordComponent } from './Module/account/resetpassword/resetpassword.component';
import { MatFormFieldModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { accpasswordchangeComponent } from './Module/account/accpasswordchange/accpasswordchange.component';

const routes: Routes = [

    { path: 'home', loadChildren: './theme/theme-routing.module#ThemeRoutingModule' },
    { path: 'home', loadChildren: './theme/Module/setup/Admission/admission.module#AdmissionModule' },
    { path: 'home', loadChildren: './theme/Module/HTMLReports/report.module#ReportModule' },
    { path: 'home', loadChildren: './theme/Module/setup/Setting/setting.module#SettingModule' },
    { path: 'home', loadChildren: './theme/Module/setup/Employee/employee.module#EmployeeModule' },
    { path: 'home', loadChildren: './theme/Module/setup/Appointment/appointment.module#AppointmentModule' },
    { path: 'home', loadChildren: './theme/Module/setup/Admin/admin.module#AdminModule' },
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'register', component: RegisterComponent,
    },
    {
        path: 'contact', component: ContactComponent,
    },
    {
        path: 'confirmed', component: ConfirmedComponent,
    },
    {
        path: 'confirmed/:userId', component: ConfirmedComponent,
    },
    {
        path: 'forgotpassword', component: ForgotpasswordComponent,
    },
    {
        path: 'forgotpassconfirmation', component: ForgotpassconfirmationComponent,
    },
    {
        path: 'confirmemail', component: ConfirmEmailComponent,
    },
    {
        path: 'Resetpasswordchanged', component: accpasswordchangeComponent,
    },
    {
        path: 'passwordchanged', component: AccountComponent,
    },
    {
        path: 'resetpassword', component: ResetpasswordComponent,
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload'
    }),
     MatFormFieldModule, NgbModule
    ],
   
    exports: [RouterModule]
})
export class AppRoutingModule { }