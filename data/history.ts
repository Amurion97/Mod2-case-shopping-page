import {OrderHistory} from "../model/order-history";
import {OrderHistoryDB} from "../manager/order-history-d-b";

export let aHistory: OrderHistory = new OrderHistory(2);

export let HISTORY: OrderHistoryDB = new OrderHistoryDB();
HISTORY.addHistory(aHistory);
