import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonUtilsModule } from '../../../../common/common-utils.module';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from '../../../../CommonService/AuthGuard';
import { DashboardMenuService } from '../../../../CommonService/DashboardMenuService';
import { PaymentComponentForm } from '../Admin/Payment/PaymentComponentForm';
import { PaymentComponentList } from '../Admin/Payment/PaymentComponentList';
import { SubscriberComponentList } from '../Admin/Subscriber/SubscriberComponentList';
import { RegisterComponentForm } from '../Admin/Payment/RegisterComponentForm';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
    imports: [
        CommonUtilsModule, NgbModule, 
        AdminRoutingModule,
        NgxPrintModule
    ],
    declarations: [
        PaymentComponentForm, PaymentComponentList, SubscriberComponentList, RegisterComponentForm
    ],
    providers: [
        CookieService,
        AuthGuard,
        DashboardMenuService
    ]
})
export class AdminModule { }
