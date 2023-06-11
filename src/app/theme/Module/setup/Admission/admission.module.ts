import { NgModule } from '@angular/core';
import { AdmissionRoutingModule } from './admission-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonUtilsModule } from '../../../../common/common-utils.module';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from '../../../../CommonService/AuthGuard';
import { DashboardMenuService } from '../../../../CommonService/DashboardMenuService';
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
import { NgxPrintModule } from 'ngx-print';

@NgModule({
    imports: [
        CommonUtilsModule, NgbModule, 
        AdmissionRoutingModule,
        NgxPrintModule
    ],
    declarations: [
        AdmitSummeryComponentList, AdmitDetailComponentList, DischargeReportComponent,
        AdmitComponentList, AdmitComponentForm, AdmitBillSummeryComponentForm, AdmitAppointSummeryComponentList,
        AdmitDocumentSummeryComponentList, AdmitVitalComponentList, AdmitLabsComponentList, AdmitMedicationList,
        AdmitImagingList, AdmitNoteComponentList, AdmitProcedureComponentList, AdmitOrderComponentList, AdmitChargeComponentList,
    ],
    providers: [
        CookieService,
        AuthGuard,
        DashboardMenuService
    ]
})
export class AdmissionModule { }
