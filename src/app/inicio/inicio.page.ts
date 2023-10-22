import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocationService } from '../services/location.service';
import { LoadingController } from '@ionic/angular'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  nombreUsuario: string = '';
  rutDni: string = '';
  horaRegistro: string = '';
  regionSeleccionada: string = '';

  constructor(
    private navCtrl: NavController,
    private locationService: LocationService,
    private loadingController: LoadingController 
  ) {}

  ionViewWillEnter() {
    const cuenta = localStorage.getItem('cuenta');

    if (cuenta) {
      const datosCuenta = JSON.parse(cuenta);
      this.nombreUsuario = datosCuenta.nombre;
      this.rutDni = datosCuenta.rutDni;
    } else {
      this.navCtrl.navigateRoot('/login');
    }

    const horaRegistro = localStorage.getItem('horaRegistro');
    const regionSeleccionada = localStorage.getItem('regionSeleccionada');

    if (horaRegistro) {
      this.horaRegistro = horaRegistro;
    }

    if (regionSeleccionada) {
      this.regionSeleccionada = regionSeleccionada;
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2000,
    });

    await loading.present();

    loading.onDidDismiss().then(() => {
    });
  }

  navigateToScanPage() {
    this.presentLoading(); 
    this.navCtrl.navigateForward('/scanqr');
  }
}
