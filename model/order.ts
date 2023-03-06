import {Product} from "./product";
import {StorageDB} from "./manager/storage-d-b";
import chalk = require("chalk");

export class Order {
    private readonly _orderID: string;
    private readonly _userID: number;
    private readonly _productList: Array<Product>;
    private readonly _cost: number;
    private readonly _timeOfBuy: number;
    private readonly _buyDate: string;


    constructor(orderID: string, userID: number, productList: Array<Product>, cost: number, timeOfBuy: number) {
        this._orderID = orderID;
        this._userID = userID;
        this._productList = productList;
        this._cost = cost;
        this._timeOfBuy = timeOfBuy;
        this._buyDate = new Date(timeOfBuy).toDateString();
    }

    get orderID(): string {
        return this._orderID;
    }


    get productList(): Array<Product> {
        return this._productList;
    }

    static generateOrderID(userID: number, timeOfBuy: number): string {
        let date = new Date(timeOfBuy);
        // console.log(date.toJSON()) '2023-12-20T04:21:19.102Z'
        // console.log('DATE'+ date);
        let month = ((date.getMonth() <= 8) ? "0" : "") + (date.getMonth() + 1).toString();
        return `${userID.toString()}#${date.getFullYear()}${month}${date.getDate()}${date.getHours()}${date.getMinutes()}`;
    }

    showDetails(): void {
        console.log(`+++ OrderID: ${this._orderID}`)
        console.log(` ++ Purchased date: ${chalk.bgRgb(0, 153, 51).whiteBright(this._buyDate)}`);
        // console.log(`  + Buyer: ${USERS.getUserInfo(USERS.findByUserID(this._userID)).username}`);
        console.log("  + PURCHASED PRODUCTS: ");
        StorageDB.showAsTable(this._productList);
        console.log(`  ${("+".repeat(18))}`)
        console.log(` ++ Money spent: ${chalk.bold.greenBright(this._cost)}`);
        console.log(chalk.white(`-`.repeat(60)));

    }

    showAsRow(): void {
        console.log(`${this._orderID} || ${this._productList.length} || ${this._cost} || ${this._buyDate}`)
    }


    get cost(): number {
        return this._cost;
    }

    get timeOfBuy(): number {
        return this._timeOfBuy;
    }

    get buyDate(): string {
        return this._buyDate;
    }

    addProduct(product: Product): void {
        this.productList.push(product);
    }


    get userID(): number {
        return this._userID;
    }
}