import {Product} from "../product";
import {Order} from "../order";

export class ProductDB {
    protected DB: Array<Product> = [];

    addProduct(product: Product): void {
        let index = this.findByProductID(product.id);
        if (index < 0) {
            this.DB.push(product);
        } else {
            this.DB[index].quantity += product.quantity;
        }
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
        console.log("Product ID || Product name ||   Price   || Quantity");
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

    toString(): string {
        let N = this.DB.length;
        let arr: Array<string> = [];
        for (let i = 0; i < N; i++) {
            let line: Array<string> = []
            line.push(this.DB[i].id.toString());
            line.push(this.DB[i].name);
            line.push(this.DB[i].price.toString());
            line.push(this.DB[i].quantity.toString());
            arr.push(line.join(","));
        }
        return arr.join("\n");
    }

    getNumberOfProduct(): number {
        return this.DB.length;
    }
}