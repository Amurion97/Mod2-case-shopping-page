import {UserDB} from "../manager/user-d-b";
import {ProductDB} from "../manager/product-d-b";
import {CartDB} from "../manager/cart-d-b";
import {OrderHistoryDB} from "../manager/order-history-d-b";
import {User} from "../model/user";
import {CUSTOMERS} from "./user-password";
import {STORE} from "./product-sample";
import {Product} from "../model/product";
import {CART_DB} from "./user-cart";
import {Cart} from "../model/cart";
import {HISTORY} from "./history";
import {Order} from "../model/order";

const fs = require('fs');

export class DB {
    static urls = {
        // new URL("admin", "data/admin-db"),
        customer: "data/DB-file/customer-db.txt",
        store: "data/DB-file/store-db.txt",
        cart: "data/DB-file/cart-db.txt",
        history: "data/DB-file/history-db.txt",
    };
    static init(): void {
        this.readCustomerDB();
        this.readProductInStoreDB();
        this.readCartDB();
        this.readHistoryDB();
    }

    static save(): void {
        this.writeCustomerDB();
        this.writeProductInStoreDB();
        this.writeCartDB();
        this.writeHistoryDB();
    }
    static DB: Array<any> = [
        // new UserDB(),
        // new UserDB(),
        // new ProductDB(),
        // new CartDB(),
        // new OrderHistoryDB()
    ]

    static readCustomerDB(): void {
        let content: string = "";
        const URL = this.urls.customer;
        // console.log(URL)
        try {
            content = fs.readFileSync(URL, 'utf8');
        } catch (err) {
            console.error(err);
            console.log("Error happened when reading Customer Database!")
        }
        // console.log(content);
        let arr = content.split(/\r?\n|\r|\n/g);
        let N = arr.length;
        for (let i = 0; i < N; i++) {
            let line = arr[i].split(",");
            let id = +line[0];
            CUSTOMERS.addUser(new User(id,line[1],line[2]));
            if (line[3] === "true") {
                CUSTOMERS.setLocked(id);
            }
            // CUSTOMERS.showDB();
        }
        // return userDB;
    }
    static readProductInStoreDB(): void {
        let content: string = "";
        const URL = this.urls.store;
        // console.log(URL)
        try {
            content = fs.readFileSync(URL, 'utf8');
        } catch (err) {
            console.error(err);
            console.log("Error happened when reading Store Database!")
        }
        // console.log(content);
        let arr = content.split(/\r?\n|\r|\n/g);
        let N = arr.length;
        for (let i = 0; i < N; i++) {
            let line = arr[i].split(",");
            let id = +line[0];
            STORE.addProduct(new Product(id,line[1],+line[2],+line[3]));
        }
        // return userDB;
    }
    static readCartDB(): void {
        let content: string = "";
        const URL = this.urls.cart;
        // console.log(URL)
        try {
            content = fs.readFileSync(URL, 'utf8');
        } catch (err) {
            console.error(err);
            console.log("Error happened when reading Store Database!")
        }
        // console.log(content);
        let arr = content.split(/\r?\n|\r|\n/g);
        let N = arr.length;
        let lineIndex = 0;
        while (lineIndex < N) {
            let userInfoLine = arr[lineIndex].split(",");
            let userid = +userInfoLine[0];
            let numberOfProduct = +userInfoLine[1];
            if (numberOfProduct) {
                let aCart = new Cart(userid);
                for (let i = 1; i <= numberOfProduct; i++) {
                    let line = arr[lineIndex+i].split(",");
                    let id = +line[0];
                    aCart.addProduct(new Product(id,line[1],+line[2],+line[3]));
                }
                CART_DB.addCart(aCart);
            }
            lineIndex += numberOfProduct + 1;
        }
    }
    static readHistoryDB(): void {
        let content: string = "";
        const URL = this.urls.history;
        // console.log(URL)
        try {
            content = fs.readFileSync(URL, 'utf8');
        } catch (err) {
            console.error(err);
            console.log("Error happened when reading Store Database!")
        }
        // console.log(content);
        let arr = content.split(/\r?\n|\r|\n/g);
        let N = arr.length;
        let line = arr[0].split(",")
        let currentOrder: Order = new Order(line[1],+line[0],[],+line[2],+line[3]);
        for (let i = 0; i < N; i++) {
            let line = arr[i].split(",")
            if (line[1] !== currentOrder.orderID) {
                HISTORY.updateHistory(currentOrder.userID,currentOrder);
                currentOrder = new Order(line[1],+line[0],[],+line[2],+line[3]);
            }
            let currentProduct = new Product(+line[4],line[5],+line[6],+line[7]);
            currentOrder.addProduct(currentProduct);
        }
        HISTORY.updateHistory(currentOrder.userID,currentOrder);
    }

    static writeCustomerDB(): void {
        const content = CUSTOMERS.toString();
        const URL = this.urls.customer;
        try {
            fs.writeFileSync(URL, content);
            // file written successfully
        } catch (err) {
            console.error(err);
            console.log("Error happened when writing Customer Database!")
        }
    }
    static writeProductInStoreDB(): void {
        const content = STORE.toString();
        const URL = this.urls.store;
        try {
            fs.writeFileSync(URL, content);
            // file written successfully
        } catch (err) {
            console.error(err);
            console.log("Error happened when writing Customer Database!")
        }
    }
    static writeCartDB(): void {
        const content = CART_DB.toString();
        const URL = this.urls.cart;
        try {
            fs.writeFileSync(URL, content);
            // file written successfully
        } catch (err) {
            console.error(err);
            console.log("Error happened when writing Customer Database!")
        }
    }
    static writeHistoryDB(): void {
        const content = HISTORY.toString();
        const URL = this.urls.history;
        try {
            fs.writeFileSync(URL, content);
            // file written successfully
        } catch (err) {
            console.error(err);
            console.log("Error happened when writing Order History Database!")
        }
    }


}


