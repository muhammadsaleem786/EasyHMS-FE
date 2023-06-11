//import { NgModule } from '@angular/core';
//import { ThemeComponent } from './theme.component';
//import { NgxEchartsModule } from 'ngx-echarts';
//import { CommonModule } from '@angular/common';

//const SecureRoutes: Routes = [
//    {
//        'path': '',
//        'component': ThemeComponent,
//        'canActivate': [AuthGuard],
//        children: [
//            { path: 'PortalEstimate', component: EstimateList, canActivate: [AuthGuard] },
//        ],
//    },
//    {
//        'path': '**',
//        'redirectTo': 'login',
//        'pathMatch': 'full',
//    },
//];
//export const SecureComponent: any[] = [
//    EstimateList,
//];
//@NgModule({
//    imports: [CommonModule, FormsModule, ReactiveFormsModule, LayoutModule, RouterModule.forChild(SecureRoutes), MatStepperModule, MatFormFieldModule, MatInputModule, MatCheckboxModule
//        , MatSelectModule, MatIconModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatSortModule, MyDatePickerModule, MultiselectDropdownModule, NgxEchartsModule],
//    exports: [RouterModule],
//    declarations: [SecureComponent, DatetimePickerComponent, DialogboxComponent],
//    bootstrap: [],
//    providers: [CookieService, AuthGuard, DashboardMenuService]
//})
//export class ThemeClientRoutingModule { }