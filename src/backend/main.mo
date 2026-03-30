import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

actor {
  type Product = {
    name : Text;
    pricePerKg : Float;
  };

  type OrderItem = {
    productName : Text;
    quantity : Float;
  };

  type OrderStatus = {
    #pending;
    #confirmed;
  };

  type CustomerOrder = {
    id : Nat;
    customerName : Text;
    phoneNumber : Text;
    address : Text;
    items : [OrderItem];
    timestamp : Time.Time;
    status : OrderStatus;
    totalAmount : Float;
  };

  module CustomerOrder {
    public func compare(order1 : CustomerOrder, order2 : CustomerOrder) : Order.Order {
      Nat.compare(order1.id, order2.id);
    };
    public func compareByCustomerName(order1 : CustomerOrder, order2 : CustomerOrder) : Order.Order {
      Text.compare(order1.customerName, order2.customerName);
    };
  };

  let products = Map.empty<Text, Product>();

  let orders = Map.empty<Nat, CustomerOrder>();
  var orderId = 0;

  // Seed products
  func seedProducts() {
    let initialProducts : [(Text, Product)] = [
      ("Tomato", { name = "Tomato"; pricePerKg = 25.43 }),
      ("Onion", { name = "Onion"; pricePerKg = 24.24 }),
      ("Potato", { name = "Potato"; pricePerKg = 19.44 }),
      ("Brinjal", { name = "Brinjal"; pricePerKg = 36.89 }),
      ("Ladies Finger", { name = "Ladies Finger"; pricePerKg = 47.00 }),
      ("Green Chilli", { name = "Green Chilli"; pricePerKg = 42.00 }),
      ("Cabbage", { name = "Cabbage"; pricePerKg = 22.00 }),
      ("Carrot", { name = "Carrot"; pricePerKg = 26.00 }),
      ("Bitter Gourd", { name = "Bitter Gourd"; pricePerKg = 44.00 }),
      ("Bottle Gourd", { name = "Bottle Gourd"; pricePerKg = 28.00 }),
      ("Capsicum", { name = "Capsicum"; pricePerKg = 55.00 }),
      ("Ginger", { name = "Ginger"; pricePerKg = 24.30 }),
      ("Garlic", { name = "Garlic"; pricePerKg = 35.46 }),
    ];

    for ((name, product) in initialProducts.values()) {
      products.add(name, product);
    };
  };

  seedProducts();

  public query ({ caller }) func getProduct(name : Text) : async Product {
    switch (products.get(name)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public shared ({ caller }) func placeOrder(
    customerName : Text,
    phoneNumber : Text,
    address : Text,
    items : [OrderItem]
  ) : async Nat {
    let id = orderId;
    orderId += 1;

    var totalAmount = 0.0;

    for (item in items.values()) {
      switch (products.get(item.productName)) {
        case (null) {};
        case (?product) {
          totalAmount += product.pricePerKg * item.quantity;
        };
      };
    };

    let order : CustomerOrder = {
      id;
      customerName;
      phoneNumber;
      address;
      items;
      timestamp = Time.now();
      status = #pending;
      totalAmount;
    };

    orders.add(id, order);
    id;
  };

  public query ({ caller }) func getOrder(id : Nat) : async CustomerOrder {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getAllOrders() : async [CustomerOrder] {
    orders.values().toArray();
  };

  public query ({ caller }) func getAllOrdersByCustomerName() : async [CustomerOrder] {
    orders.values().toArray().sort(CustomerOrder.compareByCustomerName);
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : OrderStatus) : async () {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder : CustomerOrder = {
          id = order.id;
          customerName = order.customerName;
          phoneNumber = order.phoneNumber;
          address = order.address;
          items = order.items;
          timestamp = Time.now();
          status;
          totalAmount = order.totalAmount;
        };
        orders.add(id, updatedOrder);
      };
    };
  };

  public query ({ caller }) func getShopName() : async Text {
    "Thirupathi Vegetables and Fruits Shop";
  };
};
