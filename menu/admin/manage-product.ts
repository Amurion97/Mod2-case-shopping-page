import {AdminMenu} from "./admin-menu";
import {Action} from "../../action/action";
import {GetInput} from "../../action/get-input";
import {STORE} from "../../data/product-sample";
import {Product} from "../../model/product";

const readlineSync = require('readline-sync');

export class ManageProduct {
    static menu: Array<string> = ["Show Products", "Add Product", "Edit Product", "Remove Product", "Back to previous menu"];
    static menuNavigation(): void {
        Action.showMenuName("MANAGE PRODUCT MENU");
        let index = readlineSync.keyInSelect(ManageProduct.menu, 'What would you like to do? ');
        // console.log(index);
        switch (index) {
            case 0:
                break;
            case 1:
                ManageProduct.addProduct();
                break;
            case 2:
                ManageProduct.editProduct();
                break;
            case 3:
                ManageProduct.removeProduct();
                break;
            case 4:
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
                Action.showMenuName("PRODUCT DB");
                STORE.showDB();
                Action.pause();
                ManageProduct.menuNavigation();
                break;
        }
    }

    static addProduct(): void {
        Action.showMenuName("ADD PRODUCT");
        let parentMenu = ManageProduct.menuNavigation
        let name: string = GetInput.getProductNameToEdit(STORE, parentMenu);
        let price = GetInput.getNumber("price", parentMenu);
        let quantity = GetInput.getNumber("quantity", parentMenu);
        let productID = STORE.generateNewID();
        STORE.addProduct(new Product(productID, name, price, quantity));
        Action.showNotification("Successfully added new product");
    }

    static editProduct(): void {
        Action.showMenuName("EDIT PRODUCT");
        let parentMenu = ManageProduct.menuNavigation
        let productID: number = GetInput.receiveProductID(STORE, parentMenu);
        let chosenProduct: Product = STORE.getProductInfoByID(productID)
        let name: string = GetInput.getProductNameToEdit(STORE, parentMenu);
        let price = GetInput.getNumber("price", parentMenu);
        let quantity = GetInput.getNumber("quantity", parentMenu);
        let newProduct = new Product(chosenProduct.id, name, price, quantity)
        STORE.replaceProduct(productID, newProduct);
        Action.showNotification(`Successfully change product ID ${productID}`);
    }

    static removeProduct(): void {
        Action.showMenuName("REMOVE PRODUCT");
        let productID: number = GetInput.receiveProductID(STORE, ManageProduct.menuNavigation);
        if (GetInput.getConfirmation(ManageProduct.removeProduct)) {
            STORE.removeProduct(productID);
            Action.showNotification(`Successfully remove product ID ${productID}`);
        }
    }
}