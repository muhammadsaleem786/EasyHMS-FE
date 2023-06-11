import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../CommonService/AuthGuard';
import { ThemeComponent } from '../../../../theme/theme.component';
import { PaymentComponentForm } from '../Admin/Payment/PaymentComponentForm';
import { PaymentComponentList } from '../Admin/Payment/PaymentComponentList';
import { SubscriberComponentList } from '../Admin/Subscriber/SubscriberComponentList';
import { RegisterComponentForm } from '../Admin/Payment/RegisterComponentForm';
const routes: Routes = [
    {
        'path': '',
        'component': ThemeComponent,
        'canActivate': [AuthGuard],
        children: [
            { path: 'Admin', component: PaymentComponentList, canActivate: [AuthGuard] },
            { path: 'Admin/setting:id', component: PaymentComponentForm, canActivate: [AuthGuard] },
            { path: 'Admin/setting', component: PaymentComponentForm, canActivate: [AuthGuard] },
            { path: 'Admin/Subscriber', component: SubscriberComponentList, canActivate: [AuthGuard] },
            { path: 'Admin/register', component: RegisterComponentForm, canActivate: [AuthGuard] },
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
