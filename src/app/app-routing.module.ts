import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminRegestrationComponent } from './components/admin-regestration/admin-regestration.component';
import { DataUploadComponent } from './components/data-upload/data-upload.component';
import { LoginComponent } from './components/login/login.component';
import { PurchaseAnalysisComponent } from './components/purchase-analysis/purchase-analysis.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo:"login",pathMatch:"full"},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'adminRegestration', component:AdminRegestrationComponent},
  {path: 'userDataUpload', component:DataUploadComponent},
  {path: 'purchaseDataUpload', component:DataUploadComponent},
  {path: 'purchaseAnalysis', component:PurchaseAnalysisComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
