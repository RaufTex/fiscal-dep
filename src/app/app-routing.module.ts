import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TabledepComponent } from './tabledep/tabledep.component';
import { TabledespComponent } from './tabledesp/tabledesp.component';
import { TableprojetosComponent } from './tableprojetos/tableprojetos.component';

const routes: Routes = [
  { path: '', component: TabledepComponent },
  {
    path: 'alldespesas',
    component: TabledespComponent,
  },
  { path: 'allprojetos', component: TableprojetosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
