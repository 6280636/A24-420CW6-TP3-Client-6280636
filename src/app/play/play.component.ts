import { Component, OnInit } from '@angular/core';
import { Game } from './gameLogic/game';
import { HttpClient } from '@angular/common/http';
import { Score } from '../models/score';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  scoreValue = sessionStorage.getItem("score")!;   
  timeInSeconds = sessionStorage.getItem("time")!; 
  userId = sessionStorage.getItem("userId")!;
  game : Game | null = null;
  scoreSent : boolean = false;
  pseudo : string | null = null;

  constructor(public httpService: HttpClient, public score: ScoreService){}

  ngOnDestroy(): void {
    // Ceci est crotté mais ne le retirez pas sinon le jeu bug.
    location.reload();
  }

  ngOnInit() {
    this.game = new Game();
    this.pseudo = sessionStorage.getItem('loginUsername');
  }

  replay(){
    if(this.game == null) return;
    this.game.prepareGame();
    this.scoreSent = false;
  }

  async sendScore (): Promise<void>{

    if(this.scoreSent) /* return; */
    this.scoreSent = true;    
    let date:Date = new Date();
    let score = new Score(
      
      0,
      this.pseudo,
      date,         
      this.timeInSeconds,  
      Number(this.scoreValue),      
      false,
      

    );    
    await this.score.sendScore(score);
   
    //console.log(x); 
    //return x;
  

  }

}