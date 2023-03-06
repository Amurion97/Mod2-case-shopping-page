import {ManageUsers} from "./manage-users";
import {Action} from "../../action/action";
import {LoginPanel} from "../login";
import {ManageProduct} from "./manage-product";
import {GetInput} from "../../action/get-input";

const readlineSync = require('readline-sync');

export class AdminMenu {
    static menu: Array<string> = ["Manage User", "Manage Product", "Log out"];
    static menuNavigation():void {
        Action.showMenuName("ADMIN MENU");
        let index = readlineSync.keyInSelect(AdminMenu.menu, 'Hello admin, what would you like to do? ');
        // console.log(index);
        switch (index) {
            case 0:
                ManageUsers.menuNavigation() ;
                break;
            case 1:
                ManageProduct.menuNavigation();
                break;
            case 2:
                LoginPanel.menuNavigation();
                break;
            case -1:
                if (GetInput.getConfirmation(AdminMenu.menuNavigation, "you want to exit")) {
                    Action.sayBye();
                }
                break;
        }
    }
}