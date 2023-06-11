import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../CommonService/AuthGuard';
import { ThemeComponent } from '../../../../theme/theme.component';
import { AppointmentComponentList } from '../../../../theme/Module/setup/Appointment/AppointmentComponentList';
import { VitalPresComponentList } from '../../../../theme/Module/setup/Appointment/VitalPresComponentList';
import { BillComponentForm } from '../../../../theme/Module/setup/Appointment/BillComponentForm';
import { AppointComponentList } from '../../../../theme/Module/setup/Appointment/AppointComponentList';
import { DocumentComponentList } from '../../../../theme/Module/setup/Appointment/DocumentComponentList';
const routes: Routes = [
    {
        'path': '',
        'component': ThemeComponent,
        'canActivate': [AuthGuard],
        children: [
            {
                path: 'Appoint', component: AppointmentComponentList, canActivate: [AuthGuard],
                children: [
                    { path: 'VitalPres:id', component: VitalPresComponentList, canActivate: [AuthGuard] },
                    { path: 'VitalPres', component: VitalPresComponentList, canActivate: [AuthGuard] },
                    { path: 'BillPres:id', component: BillComponentForm, canActivate: [AuthGuard] },
                    { path: 'BillPres', component: BillComponentForm, canActivate: [AuthGuard] },
                    { path: 'AppointPres:id', component: AppointComponentList, canActivate: [AuthGuard] },
                    { path: 'AppointPres', component: AppointComponentList, canActivate: [AuthGuard] },
                    { path: 'DocPres:id', component: DocumentComponentList, canActivate: [AuthGuard] },
                    { path: 'DocPres', component: DocumentComponentList, canActivate: [AuthGuard] },
                ]
            },
               
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
