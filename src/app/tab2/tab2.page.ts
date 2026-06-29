import { Component, OnInit } from '@angular/core';
import { NgFor, TitleCasePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSegment, IonSegmentButton, IonLabel
} from '@ionic/angular/standalone';
import { NoticiasService } from '../services/noticias.service';
import { Article } from '../interfaces/noticias';
import { NoticiasComponent } from '../components/noticias/noticias.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, NoticiasComponent,
    IonSegment, IonSegmentButton, IonLabel, NgFor, TitleCasePipe
  ]
})
export class Tab2Page implements OnInit {
  // Las categorías oficiales que acepta News API
  public categorias: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  public categoriaSeleccionada: string = this.categorias[0];
  public noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    // Al abrir la pestaña, cargamos la primera categoría por defecto (business)
    this.cargarNoticias(this.categoriaSeleccionada);
  }

  // Se ejecuta cada vez que tocas un botón diferente en la barra superior
  segmentChanged(event: any) {
    this.categoriaSeleccionada = event.detail.value;
    this.cargarNoticias(this.categoriaSeleccionada);
  }

  // Nuestra motocicleta pidiendo los datos al servicio
  cargarNoticias(categoria: string) {
    this.noticiasService.getTopHeadlinesCategory(categoria).subscribe(resp => {
      this.noticias = resp.articles;
    });
  }
}
