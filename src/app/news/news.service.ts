import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';


@Injectable()
export class NewsService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getNews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/news`);
  }
}
