import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then((m) => m.RegistroPageModule),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then((m) => m.InicioPageModule),
  },
  {
    path: 'scanqr',
    loadChildren: () => import('./scanqr/scanqr.module').then((m) => m.ScanqrPageModule),
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
