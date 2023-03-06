import {Cart} from "../cart";
import {Order} from "../order";

export class CartDB{
    private CartDB: Array<Cart>;
    constructor() {
        this.CartDB = [];
    }

    addCart(cart: Cart): void {
        this.CartDB.push(cart);
    }

    findByUserID(userID: number): number {
        return this.CartDB.findIndex(item => item.userID === userID);
    }

    getCartInfo(userID: number): Cart {
        return this.CartDB[this.findByUserID(userID)];
    }

    toString(): string {
        let N = this.CartDB.length;
        let arr: Array<string> = [];
        for (let i = 0; i < N; i++) {
            // let line: Array<string> = [];
            let currentCart = this.CartDB[i];
            let N = currentCart.getProductList().length;
            for (let j = 0; j < N; j++) {
                let currentProduct = currentCart.getProductList()[j];
                let line = `${currentCart.userID},${currentCart.getNumberOfProduct()},`;
                line += `${currentProduct.id},${currentProduct.name},${currentProduct.price},${currentProduct.quantity}`;
                arr.push(line);
            }
            // line.push(currentCart.userID.toString());
            // line.push(currentCart.getNumberOfProduct().toString());
            // arr.push(line.join(","));
            // if (currentCart.getNumberOfProduct()) {
            //     arr.push(currentCart.toString());
            // }
        }
        return arr.join("\n");

        // let userID = this.userID;
        // for (let i = 0; i < N; i++) {
        //     let currentOrder: Order = this.orderList[i];
        //     let N = currentOrder.productList.length;
        //     for (let j = 0; j < N; j++) {
        //         let currentProduct = currentOrder.productList[j];
        //         let line = `${userID},${currentOrder.orderID},${currentOrder.cost},${currentOrder.timeOfBuy},`;
        //         line += `${currentProduct.id},${currentProduct.name},${currentProduct.price},${currentProduct.quantity}`;
        //         arr.push(line);
        //     }
        // }
        // return arr.join("\n");
    }

}