import {AdminMenu} from "./admin-menu";
import {CUSTOMERS} from "../../data/user-password";
import {User} from "../../model/user";
import {Action} from "../../action/action";
import {GetInput} from "../../action/get-input";

const readlineSync = require('readline-sync');

export class ManageUsers {
    static menu: Array<string> = ["Show Users", "Add User", "Edit User", "Remove User", "Lock user", "Unlock user", "Back to previous menu"];
    static menuNavigation(): void {
        Action.showMenuName("MANAGE USER MENU");
        let index = readlineSync.keyInSelect(ManageUsers.menu, 'What would you like to do? ');
        // console.log(index);
        switch (index) {
            case 0:
                break;
            case 1:
                ManageUsers.addUser();
                break;
            case 2:
                ManageUsers.editUser();
                break;
            case 3:
                ManageUsers.removeUser();
                break;
            case 4:
                ManageUsers.lockUser();
                break;
            case 5:
                ManageUsers.unlockUser();
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
                CUSTOMERS.showDBAsTable();
                Action.pause();
                ManageUsers.menuNavigation();
                break;
        }
    }

    static addUser(): void {
        Action.showMenuName("ADD USER");
        let name: string = GetInput.getUsernameToChange("", CUSTOMERS, ManageUsers.menuNavigation);
        let password = GetInput.getPasswordToChange("", ManageUsers.menuNavigation);
        let userID = CUSTOMERS.generateNewID();
        CUSTOMERS.addCustomer(new User(userID, name, password));
        Action.showNotification("Successfully added new user");
    }

    static editUser(): void {
        Action.showMenuName("EDIT USER");
        let customerID: number = GetInput.receiveUserID(CUSTOMERS, ManageUsers.menuNavigation);
        let index = CUSTOMERS.findIndexByUserID(customerID);
        let customer = CUSTOMERS.getCustomerByIndex(index);
        let oldUsername = customer.username;
        let newUsername: string = GetInput.getUsernameToChange(oldUsername, CUSTOMERS, ManageUsers.editUser);
        let oldPassword = customer.password;
        let newPassword = GetInput.getPasswordToChange(oldPassword, ManageUsers.editUser);
        let newUser = new User(customer.id, newUsername, newPassword)
        CUSTOMERS.replaceCustomerInfo(customerID, newUser);
        Action.showNotification(`Successfully change user ID ${customerID}`);
    }

    static removeUser(): void {
        Action.showMenuName("REMOVE USER");
        let userIndex: number = GetInput.receiveUserID(CUSTOMERS, ManageUsers.menuNavigation);
        if (GetInput.getConfirmation(ManageUsers.removeUser)) {
            CUSTOMERS.deleteCustomer(userIndex);
            Action.showNotification(`Successfully remove user ID ${userIndex}`);
        }
    }

    static lockUser(): void {
        Action.showMenuName("LOCK USER");
        let userID: number = GetInput.receiveUserID(CUSTOMERS, ManageUsers.menuNavigation);
        if (CUSTOMERS.checkLockedStatus(userID)) {
            Action.showNotification("User already locked");
        } else {
            if (GetInput.getConfirmation(ManageUsers.lockUser)) {
                CUSTOMERS.setLocked(userID);
                Action.showNotification(`Successfully lock user ID ${userID}`);
            }
        }
    }

    static unlockUser(): void {
        Action.showMenuName("LOCK USER");
        let userID: number = GetInput.receiveUserID(CUSTOMERS, ManageUsers.menuNavigation);
        if (!CUSTOMERS.checkLockedStatus(userID)) {
            Action.showNotification("User is not locked");
        } else {
            if (GetInput.getConfirmation(ManageUsers.lockUser)) {
                CUSTOMERS.unlock(userID);
                Action.showNotification(`Successfully lock user ID ${userID}`);
            }
        }
    }
}