import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { TabledepComponent } from './tabledep/tabledep.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ArrayFiltroPipe } from './tabledep/tabledep.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogDataExample } from './dialoginfo/dialoginfo.component';
import { CardeventComponent } from './cardevent/cardevent.component';
import { MatCardModule } from '@angular/material/card';
import { TabledespComponent } from './tabledesp/tabledesp.component';
import { CarddespesaComponent } from './carddespesa/carddespesa.component';
import { MatSortModule } from '@angular/material/sort';
import { TableprojetosComponent } from './tableprojetos/tableprojetos.component';
import { DialogProjetoComponent } from './dialogprojeto/dialogprojeto.component';
import { MatRadioModule } from '@angular/material/radio';
import { CardultdespesaComponent } from './cardultdespesa/cardultdespesa.component';

@NgModule({
  declarations: [
    AppComponent,
    TabledepComponent,
    HeaderComponent,
    ArrayFiltroPipe,
    DialogDataExample,
    CardeventComponent,
    TabledespComponent,
    CarddespesaComponent,
    TableprojetosComponent,
    DialogProjetoComponent,
    CardultdespesaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatCardModule,
    MatSortModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
