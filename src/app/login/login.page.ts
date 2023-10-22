import { Component, NgModule } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nombre: string = '';
  contrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  iniciarSesion() {
    const cuentaGuardada = localStorage.getItem('cuenta');

    if (cuentaGuardada) {
      const cuenta = JSON.parse(cuentaGuardada);
      if (this.nombre === cuenta.nombre && this.contrasena === cuenta.contrasena) {
        console.log('Inicio de sesión exitoso');
        this.navCtrl.navigateRoot('/inicio');
      } else {
        this.mostrarMensaje('Credenciales incorrectas');
        this.nombre = ''; 
        this.contrasena = ''; 
      }
    } else {
      this.mostrarMensaje('Credenciales incorrectas');
      this.nombre = ''; 
      this.contrasena = ''; 
    }
    
  }
  

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000, 
      position: 'top', 
    });
    toast.present();
  }
}

