export class Product {
    private _id: number;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: number, name: string, price: number, quantity: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }

    showInfo(): void {
        let blankID = 10 - this.id.toString().length;
        let blankName = 12 - this.name.length;
        let blankPrice = 9 - this.price.toString().length;
        let blankQuantity = 8 - this.quantity.toString().length;
        console.log(`${(" ").repeat(blankID)}${this.id} || ${this.name}${(" ").repeat(blankName)} || ${(" ").repeat(blankPrice)}${this.price} || ${(" ").repeat(blankQuantity)}${this.quantity}`)
    }
}
