import { NgModule } from '@angular/core';
import { SettingRoutingModule } from './setting-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonUtilsModule } from '../../../../common/common-utils.module';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from '../../../../CommonService/AuthGuard';
import { DashboardMenuService } from '../../../../CommonService/DashboardMenuService';

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

@NgModule({
    imports: [
        CommonUtilsModule, NgbModule, 
        SettingRoutingModule,
    ],
    declarations: [
        MedicineInstructionComponentList, ObservationComponentList, ComplaintComponentList, InvestigationComponentList, DiagnosComponentList, DropDownComponentList,
        ApplicationUserComponentList, ApplicationUserComponentForm, MedicineComponentList, MedicineComponentForm, CompanyComponentForm, UserRoleComponentList
        , ProfileUserComponentForm,
        UserRoleComponentForm
    ],
    providers: [
        CookieService,
        AuthGuard,
        DashboardMenuService
    ]

})
export class SettingModule { }
