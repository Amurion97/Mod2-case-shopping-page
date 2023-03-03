import {Order} from "./order";
import {Action} from "../action/action";
import {CUSTOMERS} from "../data/user-password";

export class OrderHistory {
    private readonly _userID: number;
    private orderList: Array<Order>;

    constructor(userID: number) {
        this._userID = userID;
        this.orderList = [];
    }

    get userID(): number {
        return this._userID;
    }

    addOrder(order: Order): void {
        this.orderList.push(order);
    }

    getByOrderID(id: string): Order | undefined {
        return this.orderList.find(item => item.orderID === id);
    }

    showAsTable(): void {
        Action.showMenuName(`${CUSTOMERS.getCustomerByIndex(CUSTOMERS.findIndexByUserID(this._userID)).username}'S PURCHASE HISTORY`)
        // console.log("OrderID || Numbers of Products || Cost || Date");
        this.orderList.forEach(item => {
            // item.showAsRow();
            item.showDetails();
        })
    }

    toString(): string {
        let N = this.orderList.length;
        let arr: Array<string> = [];
        let userID = this.userID;
        // let line: string = .toString() + "," + N;
        // arr.push(line);
        for (let i = 0; i < N; i++) {
            let currentOrder: Order = this.orderList[i];
            let N = currentOrder.productList.length;
            for (let j = 0; j < N; j++) {
                let currentProduct = currentOrder.productList[j];
                let line = `${userID},${currentOrder.orderID},${currentOrder.cost},${currentOrder.timeOfBuy},`;
                line += `${currentProduct.id},${currentProduct.name},${currentProduct.price},${currentProduct.quantity}`;
                arr.push(line);
            }
        }
        return arr.join("\n");
    }
}