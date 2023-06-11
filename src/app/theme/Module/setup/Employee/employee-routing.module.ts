import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../CommonService/AuthGuard';
import { ThemeComponent } from '../../../../theme/theme.component';

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
import { PayrollComponentList } from '../../../../theme/Module/setup/Employee/EmployeePayroll/EmployeePayrollComponentList';
import { PayrollComponentForm } from '../../../../theme/Module/setup/Employee/EmployeePayroll/EmployeePayrollComponentForm';
import { EmployeeComponentList } from '../../../../theme/Module/setup/Employee/AddEmp/EmployeeComponentList';
import { EmployeeComponent } from '../../../../theme/Module/setup/Employee/AddEmp/EmployeeComponent';

const routes: Routes = [
    {
        'path': '',
        'component': ThemeComponent,
        'canActivate': [AuthGuard],
        children: [
            { path: 'Schedule', component: PayScheduleComponentList, canActivate: [AuthGuard] },
            { path: 'Deduction', component: DeductionContributionComponentList, canActivate: [AuthGuard]  },
            { path: 'Allowance', component: AllowanceComponentList, canActivate: [AuthGuard] },
            { path: 'Leaveentry', component: LeaveApplicationComponentList, canActivate: [AuthGuard] },
            { path: 'Leaveentry/saveleave', component: LeaveApplicationComponentForm, canActivate: [AuthGuard] },
            { path: 'Leaveentry/saveleave:id', component: LeaveApplicationComponentForm, canActivate: [AuthGuard] },
            { path: 'Employee/saveemployee:id', component: EmployeeComponent },
            { path: 'Employee/saveemployee', component: EmployeeComponent },
            { path: 'Employee', component: EmployeeComponentList },
            { path: 'Payroll', component: PayrollComponentList, canActivate: [AuthGuard]  },
            { path: 'Loan/employeesLoan', component: LoanComponentList, canActivate: [AuthGuard] },
            { path: 'Attendance', component: AttendanceComponentList, canActivate: [AuthGuard] },
            { path: 'Timeattendance', component: TimeAttendanceComponentForm, canActivate: [AuthGuard] },
            { path: 'Timeattendancelist', component: TimeAttendanceComponentList, canActivate: [AuthGuard] },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
