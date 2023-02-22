export class URL {
    private _DBName: string;
    private _url: string;

    constructor(DBName: string, url: string) {
        this._DBName = DBName;
        this._url = url;
    }


    get DBName(): string {
        return this._DBName;
    }

    set DBName(value: string) {
        this._DBName = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }
}