import {Action} from "../../action/action";
import {UserMenu} from "./user-menu";
import {CART_DB} from "../../data/user-cart";
import {Order} from "../../model/order";
import {GetInput} from "../../action/get-input";
import {STORE} from "../../data/product-sample";
import {ProductDB} from "../../model/manager/product-d-b";
import {HISTORY} from "../../data/history";

const readlineSync = require('readline-sync');
export class CartMenu {
    static menu: Array<string> = ["Buy All", "Back to previous menu"];
    static menuNavigation(userID: number):void {
        CART_DB.getCartInfo(userID).showCart();
        Action.showMenuName("CART MENU");
        let index = readlineSync.keyInSelect(CartMenu.menu, `What would you like to do? `);
        // console.log(index);
        switch (index) {
            case 0:
                CartMenu.buyAll(userID);
                Action.pause();
                CartMenu.menuNavigation(userID)
                break;
            case 1:
                UserMenu.menuNavigation(userID);
                break;
            case -1:
                Action.sayBye();
                break;
        }
    }
    static buyAll(userID: number):void {
        GetInput.getConfirmation(CartMenu.menuNavigation, userID);
        let currentCart = CART_DB.getCartInfo(userID);
        let timeOfBuy = new Date().getTime();
        let orderID = Order.generateOrderID(userID, timeOfBuy)
        let newOrder: Order = new Order(orderID, userID, ProductDB.copyProductArray(currentCart.getProductList()), currentCart.totalCost, timeOfBuy);

        HISTORY.updateHistory(userID, newOrder);
        currentCart.makeBlank();
        STORE.updateByOrder(newOrder);
        // newOrder.showDetails();
        Action.showNotification("Successfully");
    }
}
