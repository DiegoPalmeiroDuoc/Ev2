import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanqrPageRoutingModule } from './scanqr-routing.module';

import { ScanqrPage } from './scanqr.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanqrPageRoutingModule,
    ZXingScannerModule
    
  ],
  declarations: [ScanqrPage]
})
export class ScanqrPageModule {}
