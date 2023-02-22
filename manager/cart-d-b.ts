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

    toString(): string {
        let N = this.DB.length;
        let arr: Array<string> = [];
        for (let i = 0; i < N; i++) {
            let line: Array<string> = [];
            let currentCart = this.DB[i];
            line.push(currentCart.userID.toString());
            line.push(currentCart.getNumberOfProduct().toString());
            arr.push(line.join(","));
            if (currentCart.getNumberOfProduct()) {
                arr.push(currentCart.toString());
            }
        }
        return arr.join("\n");
    }

}