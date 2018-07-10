import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class Item {
  public name: string;
  public stock: number;
  public price: number;
  public description: string;

  initValues(item: any) {
    this.name = item.name;
    this.stock = item.stock;
    this.price = item.price;
    this.description = item.description;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private url = 'http://localhost:8080/items/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.url + 'all');
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.url + 'get/' + id);
  }

  create(data: Item): Observable<any> {
    return this.http.post(this.url + 'create', data);
  }

  update(id: string, data: Item): Observable<any> {
    return this.http.put(this.url + 'update/' + id, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + 'delete/' + id);
  }
}
