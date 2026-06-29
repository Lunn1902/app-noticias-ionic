import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { NoticiasComponent } from '../components/noticias/noticias.component';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NoticiasComponent],
})
export class Tab3Page {
  constructor(public dataStorage: DataStorageService) {}
}
