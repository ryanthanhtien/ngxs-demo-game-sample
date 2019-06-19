import { User } from '../models/user.model';

export class  IncreaseScore{
    static readonly type = '[User] Increase Score';
}

export class  DecreaseScore{
    static readonly type = '[User] Decrease Score';
}

export class StartGame{
    static readonly type = '[StartGame] Start Game';
}

export class SelectCharacter{
    static readonly type = '[SelectCharacter] Select Character';
}

export class RestartGame{
    static readonly type = '[RestartGame] Restart Game';
}
