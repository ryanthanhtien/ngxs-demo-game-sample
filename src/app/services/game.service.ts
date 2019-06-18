export class GameService{

    radomCharacters(characters){
        let data:Array<any> = [];
        for(let i = 0; i<3; i ++){
            data.push(this.radomItem(characters));
        }
        return data;
    }

    radomItem(gameCharacters:Array<any> = []){
        return gameCharacters[Math.floor(Math.random()*gameCharacters.length)];
    }
}