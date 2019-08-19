import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { StreamPage } from './stream.page';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StreamService } from './stream.service';

const routes: Routes = [
  {
    path: '',
    component: StreamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StreamPage],
  providers: [HttpClient]
})
export class StreamPageModule {}
