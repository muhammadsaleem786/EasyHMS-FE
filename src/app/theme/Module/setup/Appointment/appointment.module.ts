import { NgModule } from '@angular/core';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonUtilsModule } from '../../../../common/common-utils.module';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from '../../../../CommonService/AuthGuard';
import { DashboardMenuService } from '../../../../CommonService/DashboardMenuService';


import { AppointmentComponentList } from '../../../../theme/Module/setup/Appointment/AppointmentComponentList';
import { VitalPresComponentList } from '../../../../theme/Module/setup/Appointment/VitalPresComponentList';
import { BillComponentForm } from '../../../../theme/Module/setup/Appointment/BillComponentForm';
import { AppointComponentList } from '../../../../theme/Module/setup/Appointment/AppointComponentList';
import { DocumentComponentList } from '../../../../theme/Module/setup/Appointment/DocumentComponentList';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
    imports: [
        CommonUtilsModule, NgbModule, 
        AppointmentRoutingModule, NgxPrintModule,
    ],
    declarations: [
        AppointmentComponentList, VitalPresComponentList, BillComponentForm, AppointComponentList, DocumentComponentList,
    ],
    providers: [
        CookieService,
        AuthGuard,
        DashboardMenuService
    ]
})
export class AppointmentModule { }
