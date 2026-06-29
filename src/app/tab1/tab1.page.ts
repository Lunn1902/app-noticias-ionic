import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonInfiniteScroll,IonInfiniteScrollContent, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { NoticiasService } from '../services/noticias.service';
import { NoticiasComponent } from '../components/noticias/noticias.component';
import { Article } from '../interfaces/noticias';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonRefresherContent, IonRefresher, IonHeader, IonToolbar, IonTitle, IonContent, IonInfiniteScroll, IonInfiniteScrollContent, NoticiasComponent],
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.noticiasService.getTopHeadlines().subscribe(resp => {
      this.noticias = resp.articles;
    });
  }
  // Método para el Scroll Infinito
  cargarMas(event: any) {
    this.noticiasService.getTopHeadlines().subscribe(resp => {
      this.noticias.push(...resp.articles); // Agrega las nuevas noticias al final de la lista
      event.target.complete(); // Apaga el ícono de carga

      // Si la API ya no devuelve nada, apagamos el scroll
      if (resp.articles.length === 0) {
        event.target.disabled = true;
      }
    });
  }

  // Método para el Pull to Refresh
  recargar(event: any) {
    // Truco rápido y seguro para la exposición: recargar la vista limpia
    window.location.reload();
    event.target.complete();
  }
}
