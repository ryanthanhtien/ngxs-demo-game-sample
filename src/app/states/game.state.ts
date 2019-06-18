import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DecreaseScore, SelectCharacter, IncreaseScore, StartGame } from '../actions/game.actions';
import { gameData } from '../models/game.data';
import { GameService } from '../services/game.service';

export class GameStateModel {
    score: number;
    results: any[];
    characters: any[];
    three_radom_character: any[];
    user_selected_characters: any[];
}

@State<GameStateModel>({
    name: 'games',
    defaults: {
        score: 10,
        results: [],
        user_selected_characters: [],
        three_radom_character: gameData.three_radom_character,
        characters: gameData.characters
    }
}) export class GameState {

    constructor(private gameService: GameService) {}

    @Selector()
    static getScore(state: GameStateModel) {
        return state.score;
    }

    @Selector()
    static getCharacters(state: GameStateModel) {
        return state.characters;
    }

    @Action(IncreaseScore)
    IN({ getState, patchState }) {
        const state = getState();
        patchState({ score: state.score + 1 });
    }


    @Action(DecreaseScore)
    DE({ getState, patchState }) {
        const state = getState();
        patchState({ score: state.score - 1 });
    }

    @Action(StartGame)
    STARTGAME({ getState, patchState }) {

       let time = 0 ; 
       const interval =  setInterval(()=>{
            const state = getState();
            const radomCharacter  = this.gameService.radomCharacters(state.characters);
            patchState({ three_radom_character : radomCharacter });
            time  = time + 200;
            if(time > 5500){
                clearInterval(interval);
            }
        },100);
        

    }

}