import {ADMINS, USERS} from "../data/user-password";
import {AdminMenu} from "./admin/admin-menu";
import {Action} from "../action/action";
import {GetInput} from "../action/get-input";
import {UserDB} from "../manager/user-d-b";
import {UserMenu} from "./user/user-menu";


const readlineSync = require('readline-sync');
const MENUS: Array<string> = ["Admin Login", "User Login"];

export class LoginPanel {
    static menuNavigation(): void{
        Action.showMenuName("MAIN MENU");
        let index = readlineSync.keyInSelect(MENUS, 'Who are you?');
        // console.log(index);
        switch (index) {
            case 0:
                LoginPanel.login("admin");
                break;
            case 1:
                LoginPanel.login("user");
                break;
            case -1:
                Action.sayBye();
                break;
        }
    }

    static login(role: string):void {
        let wrongPasswordMenu: Array<string> = ["Re-type password", "Back to previous menu"];
        let DB: UserDB;
        switch (role) {
            case "admin":
                DB = ADMINS;
                break;
            case "user":
                DB = USERS;
                break;
            default:
                DB = USERS;
                break;
        }
        let username = GetInput.getUserNameToLogin(DB, LoginPanel.menuNavigation);
        // let index:number = DB.findByUsername(username);
        let password: string;
        let isPasswordCorrect = false;
        do {
            password = GetInput.getPassword();
            isPasswordCorrect = DB.checkPassword(username, password)
            if (!isPasswordCorrect) {
                Action.showNotification("WRONG PASSWORD")
                let index = readlineSync.keyInSelect(wrongPasswordMenu, `What would you like to do?:`);
                switch (index) {
                    case 0:
                        break;
                    case 1:
                        LoginPanel.menuNavigation()
                        break;
                    case -1:
                        Action.sayBye();
                        break;
                }
            } else {
                switch (role) {
                    case "admin":
                        AdminMenu.menuNavigation();
                        break;
                    case "user":
                        let userID = DB.getUserInfo(DB.findByUsername(username)).id;
                        if (DB.checkLocked(userID)) {
                            Action.showNotification("Your account is LOCKED, please contact admin");
                            LoginPanel.menuNavigation();
                        } else {
                            UserMenu.initCart(userID);
                            UserMenu.menuNavigation(userID);
                        }
                        break;
                }
                break;
            }
        } while (!isPasswordCorrect);
        // }
    }

}