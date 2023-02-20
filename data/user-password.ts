import {User} from "../model/user";
import {UserDb} from "../manager/user-db";

export const ADMINS: UserDb = new UserDb();
export const USERS: UserDb = new UserDb();

let admin1 = new User(ADMINS.generateNewID(),"admin", "admin");
ADMINS.addUser(admin1);

let user1 = new User(USERS.generateNewID(),"giang","123");
USERS.addUser(user1);
USERS.setLocked(1);

let user2 = new User(USERS.generateNewID(),"ning", "1234");
USERS.addUser(user2);

let user3 = new User(USERS.generateNewID(),"link", "123");
USERS.addUser(user3);