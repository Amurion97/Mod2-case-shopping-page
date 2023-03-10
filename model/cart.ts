import {ProductDB} from "./manager/product-d-b";
import {Action} from "../action/action";
import {Product} from "./product";
import {STORE} from "../data/product-sample";

export class Cart extends ProductDB {
    readonly _userID: number;
    private _totalCost: number = 0;

    constructor(userID: number) {
        super();
        this._userID = userID;
    }


    get userID(): number {
        return this._userID;
    }

    set totalCost(value: number) {
        this._totalCost = value;
    }

    calculateTotalCost(): void {
        let total = 0;
        this.productList.forEach(item => {
            total += item.quantity * item.price;
        })
        this.totalCost = total;
    }

    get totalCost(): number {
        return this._totalCost;
    }

    showCart(): void {
        Action.showMenuName("YOUR CART");
        console.log("Product ID || Product name || Price || Quantity");
        this.productList.forEach(item => item.showInfo());
        this.calculateTotalCost();
        console.log(`Total cost = ${this.totalCost}`);
    }

    getProductList(): Array<Product> {
        return this.productList;
    }

    makeBlank(): void {
        this.productList = [];
        this.totalCost = 0;
    }

    updateCurrentSTORE() {
        this.productList.forEach(item => {
            let quantityInStore = STORE.getProductInfoByID(item.id).quantity;
            if (item.quantity > quantityInStore) {
                item.quantity = quantityInStore;
            }
        })
    }

}