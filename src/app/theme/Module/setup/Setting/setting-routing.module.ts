import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../CommonService/AuthGuard';
import { ThemeComponent } from '../../../../theme/theme.component';
import { ObservationComponentList } from '../../../../theme/Module/setup/Setting/Observation/ObservationComponentList';
import { ComplaintComponentList } from '../../../../theme/Module/setup/Setting/Complaint/ComplaintComponentList';
import { InvestigationComponentList } from '../../../../theme/Module/setup/Setting/Investigation/InvestigationComponentList';
import { DiagnosComponentList } from '../../../../theme/Module/setup/Setting/Diagnos/DiagnosComponentList';
import { MedicineInstructionComponentList } from '../../../../theme/Module/setup/Setting/MedicineInstruction/MedicineInstructionComponentList';

import { CompanyComponentForm } from '../../../../theme/Module/setup/Setting/Company/CompanyComponentForm';
import { ApplicationUserComponentForm } from '../../../../theme/Module/setup/Setting/ApplicationUser/ApplicationUserComponentForm';
import { ApplicationUserComponentList } from '../../../../theme/Module/setup/Setting/ApplicationUser/ApplicationUserComponentList';
import { UserRoleComponentList } from '../../../../theme/Module/setup/Setting/userrole/UserRoleComponentList';
import { UserRoleComponentForm } from '../../../../theme/Module/setup/Setting/userrole/UserRoleComponentForm';
import { ProfileUserComponentForm } from '../../../../theme/Module/setup/Setting/ApplicationUser/ProfileUserComponentForm';
import { MedicineComponentForm } from '../../../../theme/Module/setup/Setting/Medicine/MedicineComponentForm';
import { MedicineComponentList } from '../../../../theme/Module/setup/Setting/Medicine/MedicineComponentList';
import { DropDownComponentList } from '../../../../theme/Module/setup/Setting/DropDown/DropDownComponentList';


const routes: Routes = [
    {
        'path': '',
        'component': ThemeComponent,
        'canActivate': [AuthGuard],
        children: [
            { path: 'DropDown', component: DropDownComponentList, canActivate: [AuthGuard]  },
            { path: 'Observation', component: ObservationComponentList, canActivate: [AuthGuard] },
            { path: 'Complaint', component: ComplaintComponentList, canActivate: [AuthGuard] },
            { path: 'Invest', component: InvestigationComponentList, canActivate: [AuthGuard] },
            { path: 'Diagnos', component: DiagnosComponentList, canActivate: [AuthGuard] },
            { path: 'MedicineInst', component: MedicineInstructionComponentList, canActivate: [AuthGuard] },
            { path: 'aplicationUser', component: ApplicationUserComponentList, canActivate: [AuthGuard] },
            { path: 'aplicationUser/saveuser:id', component: ApplicationUserComponentForm, canActivate: [AuthGuard] },
            { path: 'aplicationUser/saveuser', component: ApplicationUserComponentForm, canActivate: [AuthGuard] },
            { path: 'userrole', component: UserRoleComponentList, canActivate: [AuthGuard] },
            { path: 'userrole/saverole:id', component: UserRoleComponentForm, canActivate: [AuthGuard] },
            { path: 'userrole/saverole', component: UserRoleComponentForm, canActivate: [AuthGuard] },
            { path: 'Profile/saveuser', component: ProfileUserComponentForm, canActivate: [AuthGuard] },
            { path: 'Profile/saveuser:id', component: ProfileUserComponentForm, canActivate: [AuthGuard] },
            { path: 'Medicine', component: MedicineComponentList, canActivate: [AuthGuard] },
            { path: 'Medicine/saveMedicine:id', component: MedicineComponentForm, canActivate: [AuthGuard] },
            { path: 'Medicine/saveMedicine', component: MedicineComponentForm, canActivate: [AuthGuard] },
            { path: 'Appoint/company', component: CompanyComponentForm, canActivate: [AuthGuard] },
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
