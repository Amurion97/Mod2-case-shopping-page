import {User} from "../model/user";
import {UserDB} from "../model/manager/user-d-b";

export const ADMINS: UserDB = new UserDB();
export const CUSTOMERS: UserDB = new UserDB();

let admin1 = new User(ADMINS.generateNewID(),"admin", "admin");
ADMINS.addCustomer(admin1);

// let user1 = new User(CUSTOMERS.generateNewID(),"giang","123");
// CUSTOMERS.addUser(user1);
// CUSTOMERS.setLocked(1);
//
// let user2 = new User(CUSTOMERS.generateNewID(),"ning", "1234");
// CUSTOMERS.addUser(user2);
//
// let user3 = new User(CUSTOMERS.generateNewID(),"link", "123");
// CUSTOMERS.addUser(user3);