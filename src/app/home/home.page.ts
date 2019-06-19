import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { DecreaseScore, SelectCharacter, IncreaseScore, StartGame } from '../actions/game.actions';
import { GameState } from '../states/game.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  @Select(GameState) gameState$: Observable<any>;
  @Select(GameState.endGame) endGame$: Observable<any>;
  @Select(GameState.userSelectedCharacters) user_selected_characters$: Observable<any>;
  radomCharacter:Array<any> = [];
  constructor(private store: Store) {
    this.gameState$.subscribe(state => {
      this.radomCharacter = state.three_radom_character;
    });
  }

  userSelect(item){
    item['selected'] = !item['selected'];
    if(item['selected']){
      this.store.dispatch(new DecreaseScore());
    }else{
      this.store.dispatch(new IncreaseScore());
    }
    this.store.dispatch(new SelectCharacter());
  }

  startGame(){
    this.store.dispatch(new StartGame());
  }

  increaseScore(){
    this.store.dispatch(new IncreaseScore());
  }

  decreaseScore(){
    this.store.dispatch(new DecreaseScore());
  }



}
