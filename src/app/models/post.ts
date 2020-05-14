export class Post{
    constructor(
        public user_id : String,
        public title : String,
        public content : Array<any>,
        public url_image : String,
        public url_yt : String,
        public date : String,
        public theme : String,
        public category : String,
        public author : String,
        public favorites : Object
    ){}
}