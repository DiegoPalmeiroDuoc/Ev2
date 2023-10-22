import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  rutDni: string = '';
  regiones: any[] = [];
  regionSeleccionada: number = 0;
  email: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private apiLocation: LocationService
  ) {}

  ngOnInit() {
    this.obtenerRegion();
  }

  resultadoRegion() {
    console.log('valorSeleccionado', this.regionSeleccionada);
  }

  async obtenerRegion() {
    const request = await this.apiLocation.getRegion();
    this.regiones = request.data;
  }

  async registrar() {
    if (!this.nombre || !this.contrasena || !this.confirmarContrasena || !this.rutDni || !this.regionSeleccionada || !this.email) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    if (!this.validarEmail(this.email)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El correo electrónico no es válido.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    const horaRegistro = new Date().toLocaleString();
    const regionSeleccionada = this.regionSeleccionada.toString();

    localStorage.setItem('horaRegistro', horaRegistro);
    localStorage.setItem('regionSeleccionada', regionSeleccionada);
    localStorage.setItem('email', this.email);

    const cuenta = {
      nombre: this.nombre,
      contrasena: this.contrasena,
      rutDni: this.rutDni,
    };

    localStorage.setItem('cuenta', JSON.stringify(cuenta));

    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Perfil creado con éxito.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot('/login');
          },
        },
      ],
    });

    await alert.present();
  }

  // valida las cosas necesarias del email
  validarEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }
}
