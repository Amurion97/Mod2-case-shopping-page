import {User} from "../user";

export class UserDB {
    private customerList: Array<User> = [];

    addCustomer(user: User): void {
        this.customerList.push(user);
    }

    findIndexByUsername(username: string): number {
        return this.customerList.findIndex(item => item.username === username);
    }

    findIndexByUserID(id: number): number {
        return this.customerList.findIndex(item => item.id === id)
    }

    getCustomerByIndex(index: number): User {
        return this.customerList[index];
    }

    deleteCustomer(userID: number): void {
        this.customerList.splice(this.findIndexByUserID(userID), 1);
    }

    replaceCustomerInfo(userID: number, user: User): void {
        this.customerList[this.findIndexByUserID(userID)] = user;
    }

    checkPassword(username: string, password: string): boolean {
        let customerIndex = this.findIndexByUsername(username);
        let customer = this.getCustomerByIndex(customerIndex);
        return customer.verifyLogin(password);
    }


    checkValidUserIDInput(customerID: number): boolean {
        let index = this.findIndexByUserID(customerID)
        return index >= 0; //&& index < this.DB.length);
    }

    setLocked(customerID: number): void {
        let customerIndex = this.findIndexByUserID(customerID);
        let customer = this.getCustomerByIndex(customerIndex);
        customer.setLocked();
    }

    unlock(customerID: number): void {
        let customerIndex = this.findIndexByUserID(customerID);
        let customer = this.getCustomerByIndex(customerIndex);
        customer.unlock();
    }

    checkLockedStatus(customerID: number): boolean {
        let customerIndex = this.findIndexByUserID(customerID);
        let customer = this.getCustomerByIndex(customerIndex);
        return customer.isLocked;
    }

    generateNewID(): number {
        if (this.customerList.length === 0) {
            return 1
        }
        // let newID = ;
        // while (this.findByUserID(newID) >= 0) {
        //     newID++;
        // }
        return this.customerList[this.customerList.length - 1].id + 1;
    }
    showDBAsTable(): void {
        let N = this.customerList.length;
        console.log("User ID ||  Username  || Account Status");
        for (let i = 0; i < N; i++) {
            let currentUser = this.customerList[i];
            let blankID = 7 - currentUser.id.toString().length;
            let blankName = 20 - currentUser.username.length;
            console.log(`${(" ").repeat(blankID)}${currentUser.id} || ${currentUser.username}${(" ").repeat(blankName)} || ${(currentUser.isLocked) ? "LOCKED" : "OPEN ACCESS"}`);
        }
    }

    toCSVLine(): string {
        let N = this.customerList.length;
        let arr: Array<string> = [];
        for (let i = 0; i < N; i++) {
            let line: Array<string> = [];
            line.push(this.customerList[i].id.toString());
            line.push(this.customerList[i].username);
            line.push(this.customerList[i].password);
            line.push((this.customerList[i].isLocked) ? "true" : "false");
            arr.push(line.join(","));
        }
        return arr.join("\n");
    }
}