import {Product} from "../model/product";
import {StorageDB} from "../model/manager/storage-d-b";

export const STORE: StorageDB = new StorageDB();
// export let product1 = new Product(STORE.generateNewID(), "banana", 10000, 10);
// STORE.addProduct(product1);
//
// let product2 = new Product(STORE.generateNewID(), "apple", 20000, 20);
// STORE.addProduct(product2);
//
// let product3 = new Product(STORE.generateNewID(), "apple China", 15000, 150);
// STORE.addProduct(product3);
//
// let product4 = new Product(STORE.generateNewID(), "banana China", 5000, 250);
// STORE.addProduct(product4);

