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

    computerPlayerScore(results:any = [], playerselect:any = []){
        let score = 0;
        results.forEach(res => {
             const found = playerselect.find((item) => {
                return item.id == res.id;
             });
             if(found){
                score++;
             }
             console.log('res.id[' + res.id + ']', found);
        });
        console.log('Total score: ', score);
        return {
            score : score,
            status : score >= playerselect ? 'UP' : 'DOWN'
        }
    }

    resetPlayerSelected(characters:Array<any>){
        characters.forEach((char)=> char.selected = false);
    }
}