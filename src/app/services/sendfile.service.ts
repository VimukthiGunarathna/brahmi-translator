import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SendfileService {

  // Headers
  headers = new HttpHeaders({
    // 'Content-Type': 'application/json; charset=utf-8',
    'enctype': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
  });

  // Backend url
  apiURL: string = 'http://127.0.0.1:5000/'

  constructor(private http: HttpClient) { }


  public transcribe(image) {
    console.log(image);
    return this.http.post(`${this.apiURL}character_recognition`, image, { headers: this.headers });
  }

  public translate_english(transcribeData) {
    transcribeData = 'BataTisahaLene'
    return this.http.post(`${this.apiURL}translate_language/english`, transcribeData, { headers: this.headers });
  }
  public translate_sinhala(transcribeData) {
    transcribeData = 'BataTisahaLene'
    return this.http.post(`${this.apiURL}translate_language/sinhala`, transcribeData, { headers: this.headers });
  }
  public wordToDefinition(words) {
    return this.http.post(`${this.apiURL}word_to_definition_mapping`, words, { headers: this.headers });
   }

}
