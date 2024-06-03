export class CreateUserDao {
    name: string;

    pw: string;

    constructor(name: string, pw: string) {
        this.name = name;
        this.pw = pw;
    }
}
