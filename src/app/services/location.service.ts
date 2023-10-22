import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'https://dev.matiivilla.cl/duoc/location'

  constructor(private http: HttpClient) { }
  async getRegion() {
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${environment.apiUrl}region`))
  }

  getComunasPorRegion(regionId: number){
    return this.http.get(`${this.baseUrl}/comuna/${regionId}`).pipe(
      catchError((error:any)=>{
        console.log('Error en la solicitud en la API de comunas', error);
        return throwError(error);
      })
    )
  }


}

