import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService, Doctor } from './doctor.service';
import { debounceTime, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  doctorService = inject(DoctorService);
  busqueda = '';
  resultados: Doctor[] = [];
  mostrarLista = false;

  private busquedaSubject = new Subject<string>();

  ngOnInit(): void {
    this.busquedaSubject.pipe(
      debounceTime(300),
      switchMap(valor => {
        // Solo hacer la búsqueda si hay 2 o más letras
        if (valor.length >= 2) {
          return this.doctorService.buscarDoctores({ nombre: valor });
        } else {
          // Si no hay suficientes letras, limpiar resultados y no llamar a la API
          this.resultados = [];
          this.mostrarLista = false;
          return []; // Devuelve observable vacío
        }
      })
    ).subscribe(resultados => {
      this.resultados = resultados;
      this.mostrarLista = resultados.length > 0;
    });
  }

  onInput(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.trim();
    this.busquedaSubject.next(valor);
  }


  seleccionarDoctor(doctor: Doctor): void {
    this.busqueda = `${doctor.nombre} ${doctor.apellido}`;
    this.resultados = [];
    this.mostrarLista = false;
  }

}
