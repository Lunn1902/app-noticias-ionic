import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Article } from '../../interfaces/noticias';
import { NoticiaComponent } from '../noticia/noticia.component';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  imports: [NgFor, IonGrid, IonRow, IonCol, NoticiaComponent],
})
export class NoticiasComponent {
  @Input() noticias: Article[] = [];
}
