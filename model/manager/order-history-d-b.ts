import {OrderHistory} from "../order-history";
import {HISTORY} from "../../data/history";
import {Order} from "../order";

export class OrderHistoryDB {
    private DB: Array<OrderHistory>;
    constructor() {
        this.DB = [];
    }

    addHistory(history: OrderHistory): void {
        this.DB.push(history);
    }

    findByUserID(userID: number): number {
        return this.DB.findIndex(item => item.userID === userID);
    }

    getByIndex(index: number): OrderHistory {
        return this.DB[index];
    }
    updateHistory(userID: number, newOrder: Order): void {
        let index = HISTORY.findByUserID(userID);
        if (index < 0) {
            let newHistory: OrderHistory = new OrderHistory(userID);
            newHistory.addOrder(newOrder);
            HISTORY.addHistory(newHistory)
        } else {
            HISTORY.getByIndex(index).addOrder(newOrder);
        }
    }

    toString(): string {
        let N = this.DB.length;
        let arr: Array<string> = [];
        for (let i = 0; i < N; i++) {
            arr.push(this.DB[i].toString());
        }
        return arr.join("\n");
    }
}