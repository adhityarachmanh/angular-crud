import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Books } from './models/books';
import { Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  API: string = 'http://localhost:4000/api/';

  constructor(private http: HttpClient) { }

  deleteData(collection: string, ID: String): Promise<AxiosResponse<any>> {
    return axios.delete(this.API + collection + "/" + ID)
  }

  postData(collection: string, data: Object): Promise<AxiosResponse<any>> {
    return axios.post(this.API + collection, data)
  }
  putData(collection: string, data): Promise<AxiosResponse<any>> {
    let ID = data._id
    return axios.put(this.API + collection + '/' + ID, data)
  }


  getData(collection): Observable<any[]> {
    return this.http.get<any[]>(this.API + collection)
  }
  getOneData(collection, ID): Observable<any> {
    return this.http.get<any>(this.API + collection + '/' + ID)
  }
}
