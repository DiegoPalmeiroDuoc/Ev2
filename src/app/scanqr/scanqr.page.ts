import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanqr',
  templateUrl: './scanqr.page.html',
  styleUrls: ['./scanqr.page.scss'],
})
export class ScanqrPage implements OnInit {
  scanResult: any='';

  constructor() { }

  ngOnInit() {
  }

  onCodeResult(result:string){
    this.scanResult=result;

  }

}
