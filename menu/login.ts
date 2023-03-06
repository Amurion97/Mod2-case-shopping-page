import {ADMINS, CUSTOMERS} from "../data/user-password";
import {AdminMenu} from "./admin/admin-menu";
import {Action} from "../action/action";
import {GetInput} from "../action/get-input";
import {UserDB} from "../model/manager/user-d-b";
import {UserMenu} from "./user/user-menu";
import {User} from "../model/user";

const readlineSync = require('readline-sync');

export class LoginPanel {
    static menu: Array<string> = ["Admin Login", "Customer Login", "New Customer Registry"];
    static wrongPasswordMenu: Array<string> = ["Re-type password", "Back to previous menu"];
    static menuNavigation(): void{
        Action.showMenuName("MAIN MENU");
        let index = readlineSync.keyInSelect(LoginPanel.menu, 'Who are you?');
        // console.log(index);
        switch (index) {
            case 0:
                LoginPanel.login("admin");
                break;
            case 1:
                LoginPanel.login("customer");
                break;
            case 2:
                LoginPanel.register();
                break;
            case -1:
                if (GetInput.getConfirmation(LoginPanel.menuNavigation, "you want to exit")) {
                    Action.sayBye();
                }
                break;
        }
    }

    static login(role: string):void {
        let DB: UserDB;
        switch (role) {
            case "admin":
                DB = ADMINS;
                break;
            case "customer":
                DB = CUSTOMERS;
                break;
            default:
                DB = CUSTOMERS;
                break;
        }
        let username = GetInput.getUserNameToLogin(DB, LoginPanel.menuNavigation);
        // let index:number = DB.findByUsername(username);
        let password: string;
        let isPasswordCorrect = false;
        do {
            password = GetInput.getPasswordToLogin();
            isPasswordCorrect = DB.checkPassword(username, password)
            if (!isPasswordCorrect) {
                Action.showNotification("WRONG PASSWORD")
                let index = readlineSync.keyInSelect(LoginPanel.wrongPasswordMenu, `What would you like to do?:`);
                switch (index) {
                    case 0:
                        break;
                    case 1:
                        isPasswordCorrect = true;
                        LoginPanel.menuNavigation()
                        break;
                    case -1:
                        if (GetInput.getConfirmation(LoginPanel.menuNavigation, "you want to exit")) {
                            Action.sayBye();
                        }
                        break;
                }
            } else {
                switch (role) {
                    case "admin":
                        AdminMenu.menuNavigation();
                        break;
                    case "customer":
                        let userID = DB.getCustomerByIndex(DB.findIndexByUsername(username)).id;
                        if (DB.checkLockedStatus(userID)) {
                            Action.showNotification("Your account is LOCKED, please contact admin");
                            Action.pause();
                            LoginPanel.menuNavigation();
                        } else {
                            UserMenu.initCart(userID);
                            UserMenu.menuNavigation(userID);
                        }
                        break;
                }
            }
        } while (!isPasswordCorrect);
        // }
    }

    static register() {
        Action.showMenuName("CUSTOMER REGISTRY");
        let name: string = GetInput.getUsernameToChange("", CUSTOMERS, LoginPanel.menuNavigation);
        let password = GetInput.getPasswordToChange("", LoginPanel.menuNavigation);
        let userID = CUSTOMERS.generateNewID();
        CUSTOMERS.addCustomer(new User(userID, name, password));
        Action.showNotification("Successfully registered");
        Action.pause();
        LoginPanel.menuNavigation();
    }
}