import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../CommonService/AuthGuard';
import { ThemeComponent } from '../../../../theme/theme.component';
import { AdmitComponentList } from '../../../../theme/Module/setup/Admission/AdmitComponentList';
import { AdmitComponentForm } from '../../../../theme/Module/setup/Admission/AdmitComponentForm';
import { AdmitSummeryComponentList } from '../../../../theme/Module/setup/Admission/AdmitSummeryComponentList';
import { AdmitBillSummeryComponentForm } from '../../../../theme/Module/setup/Admission/AdmitBillSummeryComponentForm';
import { AdmitAppointSummeryComponentList } from '../../../../theme/Module/setup/Admission/AdmitAppointSummeryComponentList';
import { AdmitDocumentSummeryComponentList } from '../../../../theme/Module/setup/Admission/AdmitDocumentSummeryComponentList';
import { AdmitVitalComponentList } from '../../../../theme/Module/setup/Admission/AdmitVitalComponentList';
import { AdmitLabsComponentList } from '../../../../theme/Module/setup/Admission/AdmitLabsComponentList';
import { AdmitMedicationList } from '../../../../theme/Module/setup/Admission/AdmitMedicationList';
import { AdmitImagingList } from '../../../../theme/Module/setup/Admission/AdmitImagingList';
import { AdmitNoteComponentList } from '../../../../theme/Module/setup/Admission/AdmitNoteComponentList';
import { AdmitProcedureComponentList } from '../../../../theme/Module/setup/Admission/AdmitProcedureComponentList';
import { AdmitOrderComponentList } from '../../../../theme/Module/setup/Admission/AdmitOrderComponentList';
import { AdmitChargeComponentList } from '../../../../theme/Module/setup/Admission/AdmitChargeComponentList';
import { AdmitDetailComponentList } from '../../../../theme/Module/setup/Admission/AdmitDetailComponentList';

import { DischargeReportComponent } from '../../../../theme/Module/setup/Admission/DischargeReportComponent';
const routes: Routes = [
    {
        'path': '',
        'component': ThemeComponent,
        'canActivate': [AuthGuard],
        children: [
            { path: 'Admit', component: AdmitComponentList, canActivate: [AuthGuard] } ,
            { path: 'Admit/saveAdmit:id', component: AdmitComponentForm, canActivate: [AuthGuard] },
            { path: 'Admit/saveAdmit', component: AdmitComponentForm, canActivate: [AuthGuard] },
            {
                path: 'AdmitSummary', component: AdmitSummeryComponentList, canActivate: [AuthGuard],
                children: [
                    { path: 'AdmitBillSummary', component: AdmitBillSummeryComponentForm, canActivate: [AuthGuard] },
                    { path: 'AdmitAppointSummery', component: AdmitAppointSummeryComponentList, canActivate: [AuthGuard] },
                    { path: 'AdmitDocSummery', component: AdmitDocumentSummeryComponentList, canActivate: [AuthGuard] },
                    { path: 'DischargeReport', component: DischargeReportComponent, canActivate: [AuthGuard] },
                    
                    { path: 'AdmitLabs', component: AdmitLabsComponentList, canActivate: [AuthGuard] },
                    { path: 'AdmitMedication', component: AdmitMedicationList, canActivate: [AuthGuard] },
                    { path: 'AdmitImaging', component: AdmitImagingList, canActivate: [AuthGuard] },
                    {
                        path: 'AdmitDetail', component: AdmitDetailComponentList, canActivate: [AuthGuard],
                        children: [
                            { path: 'AdmitVital', component: AdmitVitalComponentList, canActivate: [AuthGuard] },
                            { path: 'AdmitNote', component: AdmitNoteComponentList, canActivate: [AuthGuard] },
                            { path: 'AdmitProcedure', component: AdmitProcedureComponentList, canActivate: [AuthGuard] },
                            { path: 'AdmitOrder', component: AdmitOrderComponentList, canActivate: [AuthGuard] },
                            { path: 'AdmitCharge', component: AdmitChargeComponentList, canActivate: [AuthGuard] },
                        ]
                    }
                ]
            },               
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
