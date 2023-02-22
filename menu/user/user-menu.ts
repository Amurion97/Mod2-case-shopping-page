// import {ManageUser} from "./manage-user";
import {Action} from "../../action/action";
import {LoginPanel} from "../login";
import {ShoppingMenu} from "./shopping-menu";
import {CUSTOMERS} from "../../data/user-password";
import {CartMenu} from "./cart-menu";
import {HISTORY} from "../../data/history";
import {CART_DB} from "../../data/user-cart";
import {Cart} from "../../model/cart";
// import {ManageProduct} from "./manage-product";

const readlineSync = require('readline-sync');

export class UserMenu {
    static menu: Array<string> = ["Shopping", "My Cart", "My Purchase History", "Log out"];

    static menuNavigation(userID: number): void {
        Action.showMenuName("CUSTOMER MENU");
        let userIndex: number = CUSTOMERS.findByUserID(userID);
        let username: string = CUSTOMERS.getUserInfo(userIndex).username;
        let index = readlineSync.keyInSelect(this.menu, `Hello ${username}, what would you like to do? `);
        // console.log(index);
        switch (index) {
            case 0:
                ShoppingMenu.menuNavigation(userID);
                break;
            case 1:
                CartMenu.menuNavigation(userID);
                break;
            case 2:
                UserMenu.showHistory(userID);
                break;
            case 3:
                LoginPanel.menuNavigation();
                break;
            case -1:
                Action.sayBye();
                break;
        }
        switch (index) {
            case 0:
            case 1:
            case 2:
                Action.pause();
                UserMenu.menuNavigation(userID);
                break;
        }
    }

    static showHistory(userID: number): void {
        let index = HISTORY.findByUserID(userID);
        if (index < 0) {
            console.log("NO HISTORY");
        } else {
            HISTORY.getByIndex(index).showAsTable();
        }
    }

    static initCart(userID: number): void {
        if (CART_DB.findByUserID(userID) < 0) {
            CART_DB.addCart(new Cart(userID));
        }
    }

}