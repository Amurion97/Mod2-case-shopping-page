import {ProductDB} from "./product-d-b";
import {Product} from "../product";

export class StorageDB extends ProductDB {
    constructor() {
        super();
    }

    showAsTable(productList: Array<Product> = this.productList) {
        console.log("Product ID || Product name ||   Price   || Quantity");
        productList.forEach(item => item.showInfo());
    }

    static showAsTable(productList: Array<Product>) {
        console.log("Product ID || Product name ||   Price   || Quantity");
        productList.forEach(item => item.showInfo());
    }

    sortByPrice(ascending: boolean = true): Array<Product> {
        let newList = [...this.productList];
        if (ascending) {
            return newList.sort(function(a: Product, b: Product){return a.price - b.price});
        } else {
            return newList.sort(function(a: Product, b: Product){return b.price - a.price});
        }

    }

    findByNearestName(name: string): Array<Product> {
        let newList: Array<Product> = [];
        this.productList.forEach(item => {
            if (item.name.toLowerCase().includes(name.toLowerCase())) {
                newList.push(item)
            }
        });
        return newList;
    }

    filterByPriceRange(low: number, high: number): Array<Product> {
        return this.productList.filter(item => (item.price >= low && item.price <= high));
    }
    generateNewID(): number {
        if (this.productList.length === 0) {
            return 1
        }
        // let newID = ;
        // while (this.findByProductID(newID) >= 0) {
        //     newID++;
        // }
        return this.productList[this.productList.length - 1].id + 1;
    }
}