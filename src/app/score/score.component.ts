import { Component, OnInit } from '@angular/core';
import { Score } from '../models/score';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  myScores : Score[] = [];
  publicScores : Score[] = [];
  userIsConnected : boolean = false;

  constructor(public httpService:HttpClient, public score: ScoreService) { }

  async ngOnInit() {

    this.userIsConnected = sessionStorage.getItem("token") != null;
    await this.getMyScores();

  }

  async changeScoreVisibility(score : Score){

    score.isPublic = !score.isPublic
    await this.score.sendScore(score);
    if (score.isPublic)
    {
      /* await this.score.sendScore(score); */
    this.publicScores = await lastValueFrom(this.httpService.get<any>("https://localhost:7000/api/Scores/GetScore"));
    }
    else
    {
      this.publicScores = this.publicScores.filter(s => s.id !== score.id);
    }
    //console.log(this.publicScores);

  }

  async getMyScores(): Promise<void>{
    if(this.userIsConnected){
   
    this.myScores = await lastValueFrom(this.httpService.get<Score[]>("https://localhost:7000/api/Scores/GetMyScores"));
   
    console.log(this.myScores);

    /* return this.publicScores */
  }
}

}