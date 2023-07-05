
export class UserModel {
    email: string;
    username: string;
    homeStateURL: string;

    constructor(email:string,username:string,homeStateURL:string){
        this.email = email,
        this.username = username,
        this.homeStateURL = homeStateURL
    }
}