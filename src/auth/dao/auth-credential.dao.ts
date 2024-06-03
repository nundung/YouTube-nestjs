export class AuthCredentialDao {
    id: string;

    name: string;

    pw: string;

    constructor(id: string, name: string, pw: string) {
        this.id = id;
        this.name = name;
        this.pw = pw;
    }
}
