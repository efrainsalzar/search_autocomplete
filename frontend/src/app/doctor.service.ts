import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = 'http://localhost:3000/api/doctores/buscar';

  constructor(private http: HttpClient) {}

  buscarDoctores(filtros: {
    nombre?: string;
    apellido?: string;
    especialidad?: string;
  }): Observable<Doctor[]> {
    // Crear parámetros HTTP dinámicamente
    let params = new HttpParams();
    
    if (filtros.nombre) params = params.append('nombre', filtros.nombre);
    if (filtros.apellido) params = params.append('apellido', filtros.apellido);
    if (filtros.especialidad) params = params.append('especialidad', filtros.especialidad);

    return this.http.get<Doctor[]>(this.apiUrl, { params });
  }
}

// Interface para tipado fuerte
export interface Doctor {
  nombre: string;
  apellido: string;
  especialidad: string;

}