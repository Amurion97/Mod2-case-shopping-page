import {Order} from "./order";
import {Action} from "../action/action";
import {USERS} from "../data/user-password";

export class OrderHistory {
    private readonly _userID:number;
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
        Action.showMenuName(`${USERS.getUserInfo(USERS.findByUserID(this._userID)).username}'S PURCHASE HISTORY`)
        // console.log("OrderID || Numbers of Products || Cost || Date");
        this.orderList.forEach( item => {
            // item.showAsRow();
            item.showDetails();
        })
    }
}