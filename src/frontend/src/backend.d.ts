import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CustomerOrder {
    id: bigint;
    customerName: string;
    status: OrderStatus;
    totalAmount: number;
    address: string;
    timestamp: Time;
    items: Array<OrderItem>;
    phoneNumber: string;
}
export type Time = bigint;
export interface Product {
    name: string;
    pricePerKg: number;
}
export interface OrderItem {
    productName: string;
    quantity: number;
}
export enum OrderStatus {
    pending = "pending",
    confirmed = "confirmed"
}
export interface backendInterface {
    getAllOrders(): Promise<Array<CustomerOrder>>;
    getAllOrdersByCustomerName(): Promise<Array<CustomerOrder>>;
    getAllProducts(): Promise<Array<Product>>;
    getOrder(id: bigint): Promise<CustomerOrder>;
    getProduct(name: string): Promise<Product>;
    getShopName(): Promise<string>;
    placeOrder(customerName: string, phoneNumber: string, address: string, items: Array<OrderItem>): Promise<bigint>;
    updateOrderStatus(id: bigint, status: OrderStatus): Promise<void>;
}
