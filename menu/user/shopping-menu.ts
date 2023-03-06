import {Action} from "../../action/action";
import {STORE} from "../../data/product-sample";
import {UserMenu} from "./user-menu";
import {GetInput} from "../../action/get-input";
import {CART_DB} from "../../data/user-cart";
import {Cart} from "../../model/cart";
import {Product} from "../../model/product";

const readlineSync = require('readline-sync');
export class ShoppingMenu {
    static menu: Array<string> = ["All products available", "Sort by Price", "Search by name", "Filter by Price Range", "Add to Cart", "Back to previous menu"];
    static menuNavigation(userID: number):void {
        Action.showMenuName("SHOPPING MENU");
        let index = readlineSync.keyInSelect(ShoppingMenu.menu, `What would you like to do? `);
        // console.log(index);
        switch (index) {
            case 0:
                STORE.showAsTable();
                break;
            case 1:
                ShoppingMenu.sortByPrice();
                break;
            case 2:
                ShoppingMenu.searchByName();
                break;
            case 3:
                ShoppingMenu.filterByPriceRange();
                break;
            case 4:
                ShoppingMenu.addToCart(userID);
                break;
            case 5:
                UserMenu.menuNavigation(userID);
                break;
            case -1:
                if (GetInput.getConfirmation(ShoppingMenu.menuNavigation, "you want to exit", userID)) {
                    Action.sayBye();
                }
                break;
        }
        switch (index) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                Action.pause();
                ShoppingMenu.menuNavigation(userID);
                break;
        }
    }

    static sortByPrice(): void {
        let menu: Array<string> = ["Lowest to Highest", "Highest to Lowest"];
        let index = readlineSync.keyInSelect(menu, `How do you like to sort? `);
        let sortAscending = index === 0;
        STORE.showAsTable(STORE.sortByPrice(sortAscending));
    }

    static searchByName():void {
        let name = readlineSync.question("Input name to search: ");
        STORE.showAsTable(STORE.findByNearestName(name));
    }

    static filterByPriceRange(): void {
        let parentMenu = ShoppingMenu.menuNavigation;
        let low = GetInput.getNumber("lowest price", parentMenu);
        let high = GetInput.getNumber("highest price", parentMenu);
        STORE.showAsTable(STORE.filterByPriceRange(low, high));
    }

    static addToCart(userID: number): void {
        let parentMenu = ShoppingMenu.menuNavigation;
        let productID = GetInput.receiveProductID(STORE, parentMenu);

        let cartIndex = CART_DB.findIndexByUserID(userID);
        if (cartIndex < 0) {
            let newCart = new Cart(userID);
            CART_DB.addCart(newCart);
        }

        let currentCart = CART_DB.getCartInfoByUserID(userID);
        let chosenProduct = STORE.getProductInfoByID(productID);
        let quantity = GetInput.getProductQuantityToCart(productID, STORE, currentCart, parentMenu);
        currentCart.addProduct(new Product(productID,chosenProduct.name, chosenProduct.price, quantity));
        // CART_DB.updateCart(userID, currentCart);

        // console.log(productID, quantity);
        Action.showNotification("ADD TO CART SUCCESSFULLY")
    }
}