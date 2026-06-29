import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadlines } from '../interfaces/noticias';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKeyNews;
const apiUrl = environment.apiUrlNews;

const headers = new HttpHeaders({
  'x-api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinePage = 0;
  searchPage = 0;
  categorySelected = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private executeQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinePage++;
    return this.executeQuery<TopHeadlines>(`/top-headlines?country=us&page=${this.headlinePage}`);
  }

  getTopHeadlinesCategory(category: string) {
    if (this.categorySelected === category) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categorySelected = category;
    }
    return this.executeQuery<TopHeadlines>(`/top-headlines?country=us&category=${category}&page=${this.categoriaPage}`);
  }

  getBySearch(search: string) {
    this.searchPage++;
    return this.executeQuery<TopHeadlines>(`/everything?q=${search}&language=es&page=${this.searchPage}`);
  }
}
