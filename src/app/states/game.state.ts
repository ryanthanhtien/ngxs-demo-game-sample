import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DecreaseScore, RestartGame, SelectCharacter, IncreaseScore, StartGame } from '../actions/game.actions';
import { gameData } from '../models/game.data';
import { GameService } from '../services/game.service';

export class GameStateModel {
    score: number;
    results: any[];
    characters: any[];
    three_radom_character: any[];
    user_selected_characters: any[];
    end_game:any;
}

@State<GameStateModel>({
    name: 'games',
    defaults: {
        score: 10,
        results: [],
        user_selected_characters: [],
        three_radom_character: gameData.three_radom_character,
        characters: gameData.characters,
        end_game: false
    }
}) export class GameState {

    constructor(private gameService: GameService) { }

    @Selector()
    static getScore(state: GameStateModel) {
        return state.score;
    }

    @Selector()
    static getCharacters(state: GameStateModel) {
        return state.characters;
    }

    @Selector()
    static endGame(state: GameStateModel) {
        return state.end_game;
    }
    @Selector()
    static userSelectedCharacters(state: GameStateModel) {
        return state.user_selected_characters;
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

    @Action(SelectCharacter)
    SELECTCHARACTER({ getState, patchState }) {
        const state = getState();
        const playerSelected = state.characters.filter((e) => { return e.selected });
        patchState({ user_selected_characters: playerSelected });
    }

    @Action(RestartGame)
    RESTARTGAME({ getState, patchState }) {
        const state = getState();
        this.gameService.resetPlayerSelected(state.characters);
        patchState({ user_selected_characters: [] , end_game : false});
    }

    @Action(StartGame)
    STARTGAME({ getState, patchState }) {
        
        // reset before start game
        const state = getState();
       

        let time = 0;
        const interval = setInterval(() => {
            const radomCharacter = this.gameService.radomCharacters(state.characters);
            patchState({ three_radom_character: radomCharacter });
            time = time + 200;
            if (time > 5500) {
                clearInterval(interval);
                // computer player score
                const playerSelected = state.characters.filter((e) => { return e.selected });
                console.log('playerSelected:', playerSelected);
                const resultgame = this.gameService.computerPlayerScore(radomCharacter, playerSelected);
                patchState({ score: state.score +  resultgame.score, end_game : true });
            }
        }, 100);


    }

}