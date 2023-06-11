import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonUtilsModule } from '../../../../common/common-utils.module';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from '../../../../CommonService/AuthGuard';
import { DashboardMenuService } from '../../../../CommonService/DashboardMenuService';

import { AllowanceComponentList } from '../../../../theme/Module/setup/Employee/Allowance/AllowanceComponentList';
import { AllowanceComponentForm } from '../../../../theme/Module/setup/Employee/Allowance/AllowanceComponentForm';
import { AttendanceComponentList } from '../../../../theme/Module/setup/Employee/Attendance/AttendanceComponentList';
import { AttendanceComponentForm } from '../../../../theme/Module/setup/Employee/Attendance/AttendanceComponentForm';
import { DeductionContributionComponentList } from '../../../../theme/Module/setup/Employee/DeductionContribution/DeductionContributionComponentList';
import { DeductionContributionComponentForm } from '../../../../theme/Module/setup/Employee/DeductionContribution/DeductionContributionComponentForm';
import { departmentComponentList } from '../../../../theme/Module/setup/Employee/department/departmentComponentList';
import { departmentComponentForm } from '../../../../theme/Module/setup/Employee/department/departmentComponentForm';
import { designationComponentList } from '../../../../theme/Module/setup/Employee/Designation/designationComponentList';
import { designationComponentForm } from '../../../../theme/Module/setup/Employee/Designation/designationComponentForm';
import { LeaveApplicationComponentList } from '../../../../theme/Module/setup/Employee/LeaveApplication/LeaveApplicationComponentList';
import { LeaveApplicationComponentForm } from '../../../../theme/Module/setup/Employee/LeaveApplication/LeaveApplicationComponentForm';
import { LoanComponentList } from '../../../../theme/Module/setup/Employee/Loans/LoanComponentList';
import { LoanComponentForm } from '../../../../theme/Module/setup/Employee/Loans/LoanComponentForm';
import { PayScheduleComponentList } from '../../../../theme/Module/setup/Employee/Payschedule/PayScheduleComponentList';
import { PayScheduleComponentForm } from '../../../../theme/Module/setup/Employee/Payschedule/PayScheduleComponentForm';
import { TimeAttendanceComponentList } from '../../../../theme/Module/setup/Employee/TimeAttendance/TimeAttendanceComponentList';
import { TimeAttendanceComponentForm } from '../../../../theme/Module/setup/Employee/TimeAttendance/TimeAttendanceComponentForm';
import { EmployeeComponentList } from '../../../../theme/Module/setup/Employee/AddEmp/EmployeeComponentList';
import { EmployeeComponent } from '../../../../theme/Module/setup/Employee/AddEmp/EmployeeComponent';
import { PayrollComponentList } from '../../../../theme/Module/setup/Employee/EmployeePayroll/EmployeePayrollComponentList';
import { PayrollComponentForm } from '../../../../theme/Module/setup/Employee/EmployeePayroll/EmployeePayrollComponentForm';

@NgModule({
    imports: [
        CommonUtilsModule, NgbModule, 
        EmployeeRoutingModule,
    ],
    declarations: [
        AllowanceComponentList, AllowanceComponentForm, AttendanceComponentList, AttendanceComponentForm
        , DeductionContributionComponentList, DeductionContributionComponentForm, departmentComponentList
        , departmentComponentForm, designationComponentList, designationComponentForm, LeaveApplicationComponentList
        , LeaveApplicationComponentForm, LoanComponentList, LoanComponentForm, PayScheduleComponentList
        , PayScheduleComponentForm, TimeAttendanceComponentList, TimeAttendanceComponentForm, EmployeeComponentList
        , EmployeeComponent, PayrollComponentList, PayrollComponentForm
    ],
    providers: [
        CookieService,
        AuthGuard,
        DashboardMenuService    ]

})
export class EmployeeModule { }
