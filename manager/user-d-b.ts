import {User} from "../model/user";

export class UserDB {
    private DB: Array<User> = [];

    addUser(user: User): void {
        this.DB.push(user);
    }

    findByUsername(username: string): number {
        return this.DB.findIndex(item => item.username === username);
    }

    findByUserID(id: number): number {
        return this.DB.findIndex(item => item.id === id)
    }

    getUserInfo(index: number): User {
        return this.DB[index];
    }

    removeUser(userID: number): void {
        this.DB.splice(this.findByUserID(userID), 1);
    }

    replaceUser(userID: number, user: User): void {
        this.DB[this.findByUserID(userID)] = user;
    }

    checkPassword(username: string, password: string): boolean {
        return this.DB[this.findByUsername(username)].verifyLogin(password);
    }

    showDB(): void {
        let N = this.DB.length;
        console.log("User ID ||  Username  || Account Status");
        for (let i = 0; i < N; i++) {
            let currentUser = this.DB[i];
            let blankID = 7 - currentUser.id.toString().length;
            let blankName = 10 - currentUser.username.length;
            console.log(`${(" ").repeat(blankID)}${currentUser.id} || ${currentUser.username}${(" ").repeat(blankName)} || ${(currentUser.isLocked) ? "LOCKED" : "OPEN ACCESS"}`);
        }
    }

    checkValidUserID(userID: number): boolean {
        let index = this.findByUserID(userID)
        return index >= 0; //&& index < this.DB.length);
    }

    setLocked(userID: number): void {
        this.DB[this.findByUserID(userID)].setLocked();
    }

    unlock(userID: number): void {
        this.DB[this.findByUserID(userID)].unlock();
    }

    checkLocked(userID: number): boolean {
        return this.DB[this.findByUserID(userID)].isLocked;
    }

    generateNewID(): number {
        if (this.DB.length === 0) {
            return 1
        }
        // let newID = ;
        // while (this.findByUserID(newID) >= 0) {
        //     newID++;
        // }
        return this.DB[this.DB.length - 1].id + 1;
    }

    toString(): string {
        let N = this.DB.length;
        let arr: Array<string> = [];
        for (let i = 0; i < N; i++) {
            let line: Array<string> = [];
            line.push(this.DB[i].id.toString());
            line.push(this.DB[i].username);
            line.push(this.DB[i].password);
            line.push((this.DB[i].isLocked) ? "true" : "false");
            arr.push(line.join(","));
        }
        return arr.join("\n");
    }
}