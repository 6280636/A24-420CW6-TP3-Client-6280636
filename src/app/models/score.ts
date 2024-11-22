
export class Score{

    constructor(
        public id : number,
        public pseudo : string | null,
        public date : Date | null,       
        public timeInSeconds : string,
        public scoreValue : number,
        public isPublic : boolean,
        //public userId : string | null,
    ){}

}