import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/noticias';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private _storage: Storage | null = null;
  favoriteNews: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    await this.loadFavoriteNews();
  }

  async loadFavoriteNews() {
    const favorites = await this._storage?.get('favorite');
    if (favorites) {
      this.favoriteNews = favorites;
    }
  }

  isFavorite(news: Article): boolean {
    return this.favoriteNews.some(n => n.title === news.title);
  }

  async saveNews(news: Article) {
    if (!this.isFavorite(news)) {
      this.favoriteNews.unshift(news);
      await this._storage?.set('favorite', this.favoriteNews);
    }
  }

  async deleteNews(news: Article) {
    this.favoriteNews = this.favoriteNews.filter(n => n.title !== news.title);
    await this._storage?.set('favorite', this.favoriteNews);
  }
}
