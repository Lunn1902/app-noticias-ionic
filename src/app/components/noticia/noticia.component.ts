import { Component, Input } from '@angular/core';
import { NgIf, DatePipe } from '@angular/common';
import {
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg,
  IonCardContent, IonText, IonRow, IonCol, IonIcon, ActionSheetController
} from '@ionic/angular/standalone';
import { Article } from '../../interfaces/noticias';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { DataStorageService } from '../../services/data-storage.service';
import { addIcons } from 'ionicons';
import { ellipsisHorizontal, share, close, trash, star } from 'ionicons/icons';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
  imports: [NgIf, DatePipe, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
            IonImg, IonCardContent, IonText, IonRow, IonCol, IonIcon],
})
export class NoticiaComponent {
  @Input() noticia!: Article;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    public dataStorage: DataStorageService
  ) {
    addIcons({ ellipsisHorizontal, share, close, trash, star });
  }

  async openNews() {
    await Browser.open({ url: this.noticia.url });
  }

  async openMenu() {
    const isFav = this.dataStorage.isFavorite(this.noticia);
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        { text: 'Compartir', icon: 'share', handler: () => this.shareNews() },
        isFav
          ? { text: 'Borrar Favorito', icon: 'trash', handler: () => this.dataStorage.deleteNews(this.noticia) }
          : { text: 'Favorito', icon: 'star', handler: () => this.dataStorage.saveNews(this.noticia) },
        { text: 'Cancelar', icon: 'close', role: 'cancel' },
      ],
    });
    await actionSheet.present();
  }

  async shareNews() {
    await Share.share({
      title: this.noticia.title,
      text: this.noticia.description,
      url: this.noticia.url,
      dialogTitle: 'Compartir noticia',
    });
  }
}
