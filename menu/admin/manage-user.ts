import {AdminMenu} from "./admin-menu";
import {CUSTOMERS} from "../../data/user-password";
import {User} from "../../model/user";
import {Action} from "../../action/action";
import {GetInput} from "../../action/get-input";

const readlineSync = require('readline-sync');

export class ManageUser {
    static menu: Array<string> = ["Show Users", "Add User", "Edit User", "Remove User", "Lock user", "Unlock user", "Back to previous menu"];
    static menuNavigation(): void {
        Action.showMenuName("MANAGE USER MENU");
        let index = readlineSync.keyInSelect(ManageUser.menu, 'What would you like to do? ');
        // console.log(index);
        switch (index) {
            case 0:
                break;
            case 1:
                ManageUser.addUser();
                break;
            case 2:
                ManageUser.editUser();
                break;
            case 3:
                ManageUser.removeUser();
                break;
            case 4:
                ManageUser.lockUser();
                break;
            case 5:
                ManageUser.unlockUser();
                break;
            case 6:
                AdminMenu.menuNavigation();
                break;
            case -1:
                Action.sayBye();
                break;
        }
        switch (index) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                Action.showMenuName("USER DB");
                CUSTOMERS.showDB();
                Action.pause();
                ManageUser.menuNavigation();
                break;
        }
    }

    static addUser(): void {
        Action.showMenuName("ADD USER");
        let name: string = GetInput.getUserNameToEdit(CUSTOMERS, ManageUser.menuNavigation);
        let password = readlineSync.question("password: ");
        let userID = CUSTOMERS.generateNewID();
        CUSTOMERS.addUser(new User(userID, name, password));
        Action.showNotification("Successfully added new user");
    }

    static editUser(): void {
        Action.showMenuName("EDIT USER");
        let userID: number = GetInput.receiveUserID(CUSTOMERS, ManageUser.menuNavigation);
        let name: string = GetInput.getUserNameToEdit(CUSTOMERS, ManageUser.editUser);
        let password = readlineSync.question("password: ");
        let index = CUSTOMERS.findByUserID(userID);
        let newUser = new User(CUSTOMERS.getUserInfo(index).id, name, password)
        CUSTOMERS.replaceUser(userID, newUser);
        Action.showNotification(`Successfully change user ID ${userID}`);
    }

    static removeUser(): void {
        Action.showMenuName("REMOVE USER");
        let userIndex: number = GetInput.receiveUserID(CUSTOMERS, ManageUser.menuNavigation);
        if (GetInput.getConfirmation(ManageUser.removeUser)) {
            CUSTOMERS.removeUser(userIndex);
            Action.showNotification(`Successfully remove user ID ${userIndex}`);
        }
    }

    static lockUser(): void {
        Action.showMenuName("LOCK USER");
        let userID: number = GetInput.receiveUserID(CUSTOMERS, ManageUser.menuNavigation);
        if (CUSTOMERS.checkLocked(userID)) {
            Action.showNotification("User already locked");
            // ManageUser.menuNavigation();
        } else {
            if (GetInput.getConfirmation(ManageUser.lockUser)) {
                CUSTOMERS.setLocked(userID);
                Action.showNotification(`Successfully lock user ID ${userID}`);
            }
        }
    }

    static unlockUser(): void {
        Action.showMenuName("LOCK USER");
        let userID: number = GetInput.receiveUserID(CUSTOMERS, ManageUser.menuNavigation);
        if (!CUSTOMERS.checkLocked(userID)) {
            Action.showNotification("User is not locked");
            // Action.pause();
            // ManageUser.menuNavigation();
        } else {
            if (GetInput.getConfirmation(ManageUser.lockUser)) {
                CUSTOMERS.unlock(userID);
                Action.showNotification(`Successfully lock user ID ${userID}`);
            }
        }
    }
}