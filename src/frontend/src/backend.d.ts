import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderItem {
    productName: string;
    quantity: number;
}
export interface CustomerOrder {
    id: bigint;
    customerName: string;
    status: Variant_pending_confirmed;
    totalAmount: number;
    address: string;
    timestamp: Time;
    items: Array<OrderItem>;
    phoneNumber: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface Product {
    name: string;
    pricePerKg: number;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_pending_confirmed {
    pending = "pending",
    confirmed = "confirmed"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllOrders(): Promise<Array<CustomerOrder>>;
    getAllOrdersByCustomerName(): Promise<Array<CustomerOrder>>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrder(id: bigint): Promise<CustomerOrder>;
    getProduct(name: string): Promise<Product>;
    getShopName(): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCurrentUserAdmin(): Promise<boolean>;
    placeOrder(customerName: string, phoneNumber: string, address: string, items: Array<OrderItem>): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(id: bigint, status: Variant_pending_confirmed): Promise<void>;
}
