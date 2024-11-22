import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

constructor(public httpService: HttpClient ) { }

async sendScore (score: any): Promise<Score>{
  
  let x = await lastValueFrom(this.httpService.post<Score>("https://localhost:7000/api/Scores/PostScore", score));
  console.log(x); 
  return x; 
}

}
