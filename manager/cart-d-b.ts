import {Cart} from "../model/cart";

export class CartDB{
    private DB: Array<Cart>;
    constructor() {
        this.DB = [];
    }

    addCart(cart: Cart): void {
        this.DB.push(cart);
    }

    findByUserID(userID: number): number {
        return this.DB.findIndex(item => item.userID === userID);
    }

    getCartInfo(userID: number): Cart {
        return this.DB[this.findByUserID(userID)];
    }
    // updateCart(userID: number, cart: Cart): void {
    //
    // }
}