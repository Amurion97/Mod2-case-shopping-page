export class User {
    private _id: number;
    private _username: string;
    private _password: string;
    private _isLocked: boolean = false;

    constructor(id: number, name: string, password: string) {
        this._id = id;
        this._username = name;
        this._password = password;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get isLocked(): boolean {
        return this._isLocked;
    }

    setLocked(): void {
        this._isLocked = true;
    }

    unlock(): void {
        this._isLocked = false;
    }

    verifyLogin(password: string): boolean {
        return password === this.password;
    }

}

