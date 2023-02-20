import {User} from "../model/user";
import {UserDB} from "../manager/user-d-b";

export const ADMINS: UserDB = new UserDB();
export const USERS: UserDB = new UserDB();

let admin1 = new User(ADMINS.generateNewID(),"admin", "admin");
ADMINS.addUser(admin1);

let user1 = new User(USERS.generateNewID(),"giang","123");
USERS.addUser(user1);
USERS.setLocked(1);

let user2 = new User(USERS.generateNewID(),"ning", "1234");
USERS.addUser(user2);

let user3 = new User(USERS.generateNewID(),"link", "123");
USERS.addUser(user3);