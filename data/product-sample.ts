import {Product} from "../model/product";
import {StorageDB} from "../manager/storageDB";

export const STORE: StorageDB = new StorageDB();
export let product1 = new Product(STORE.generateNewID(), "banana", 10000, 10);
STORE.addProduct(product1);

let product2 = new Product(STORE.generateNewID(), "apple", 20000, 20);
STORE.addProduct(product2);

let product3 = new Product(STORE.generateNewID(), "apple China", 15000, 150);
STORE.addProduct(product3);

