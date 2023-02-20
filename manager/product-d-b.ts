import {Product} from "../model/product";
import {Order} from "../model/order";

export class ProductDB {
    protected DB: Array<Product> = [];

    addProduct(product: Product): void {
        this.DB.push(product);
    }

    findByProductID(id: number): number {
        return this.DB.findIndex(item => item.id === id);
    }

    findByProductName(name: string): number {
        return this.DB.findIndex(item => item.name === name)
    }

    getProductInfo(id: number): Product {
        return this.DB[this.findByProductID(id)];
    }

    removeProduct(productID: number): void {
        this.DB.splice(this.findByProductID(productID), 1);
    }

    replaceProduct(productID: number, product: Product): void {
        this.DB[this.findByProductID(productID)] = product;
    }

    updateByOrder(order: Order): void {
        order.productList.forEach(item => {
            let product: Product = this.getProductInfo(item.id);
            product.quantity -= item.quantity;
        })
    }

    showDB(): void {
        // let N = this.DB.length;
        console.log("Product ID || Product name || Price || Quantity");
        this.DB.forEach( item => item.showInfo())
    }

    checkValidProductID(productID: number): boolean {
        let index = this.findByProductID(productID)
        return index >= 0; //&& index < this.DB.length);
    }

    static copyProductArray(productList: Array<Product>): Array<Product> {
        // let newList: Array<Product> = [];
        return productList.map(item => {
            return new Product(item.id, item.name, item.price, item.quantity)
        })
    }
}