import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profiles
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Seed products that are available in the shop
  let products = Map.empty<Text, Product>();
  products.add("Tomato", { name = "Tomato"; pricePerKg = 25.43 });
  products.add("Onion", { name = "Onion"; pricePerKg = 24.24 });
  products.add("Potato", { name = "Potato"; pricePerKg = 19.44 });
  products.add("Brinjal", { name = "Brinjal"; pricePerKg = 36.89 });
  products.add("Ladies Finger", { name = "Ladies Finger"; pricePerKg = 47.00 });
  products.add("Green Chilli", { name = "Green Chilli"; pricePerKg = 42.00 });
  products.add("Cabbage", { name = "Cabbage"; pricePerKg = 22.00 });
  products.add("Carrot", { name = "Carrot"; pricePerKg = 26.00 });
  products.add("Bitter Gourd", { name = "Bitter Gourd"; pricePerKg = 44.00 });
  products.add("Bottle Gourd", { name = "Bottle Gourd"; pricePerKg = 28.00 });
  products.add("Capsicum", { name = "Capsicum"; pricePerKg = 55.00 });
  products.add("Ginger", { name = "Ginger"; pricePerKg = 24.30 });
  products.add("Garlic", { name = "Garlic"; pricePerKg = 35.46 });

  type Product = {
    name : Text;
    pricePerKg : Float;
  };

  let orders = Map.empty<Nat, CustomerOrder>();
  // Kept for stable variable compatibility with previous version
  let orderOwners = Map.empty<Nat, Principal>();
  var orderId = 0;

  type OrderItem = {
    productName : Text;
    quantity : Float;
  };

  type CustomerOrder = {
    id : Nat;
    customerName : Text;
    phoneNumber : Text;
    address : Text;
    items : [OrderItem];
    timestamp : Time.Time;
    status : {
      #pending;
      #confirmed;
    };
    totalAmount : Float;
  };

  public query ({ caller }) func getProduct(name : Text) : async Product {
    switch (products.get(name)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  // Place an order - open to all callers (no login required)
  public shared ({ caller }) func placeOrder(
    customerName : Text,
    phoneNumber : Text,
    address : Text,
    items : [OrderItem]
  ) : async Nat {
    if (items.size() == 0) {
      Runtime.trap("Order must contain at least one item");
    };

    var totalAmount = 0.0;
    let validItems = List.empty<OrderItem>();

    for (item in items.values()) {
      switch (products.get(item.productName)) {
        case (null) {
          Runtime.trap("Product " # item.productName # " not found");
        };
        case (?product) {
          if (item.quantity <= 0) {
            Runtime.trap("Quantity for " # item.productName # " must be positive");
          };
          totalAmount += product.pricePerKg * item.quantity;
          validItems.add(item);
        };
      };
    };

    if (validItems.size() == 0) {
      Runtime.trap("Order must contain at least one valid item");
    };

    let order : CustomerOrder = {
      id = orderId;
      customerName;
      phoneNumber;
      address;
      items = validItems.toArray();
      timestamp = Time.now();
      status = #pending;
      totalAmount;
    };

    orders.add(orderId, order);
    orderId += 1;

    orderId - 1;
  };

  // Get a single order by ID
  public query ({ caller }) func getOrder(id : Nat) : async CustomerOrder {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getShopName() : async Text {
    "Thirupathi Vegetables and Fruits Shop";
  };

  // Get all orders - frontend enforces password gate
  public query ({ caller }) func getAllOrders() : async [CustomerOrder] {
    orders.values().toArray();
  };

  // Get all customer orders by customer name
  public query ({ caller }) func getAllOrdersByCustomerName() : async [CustomerOrder] {
    orders.values().toArray();
  };

  // Update order status
  public shared ({ caller }) func updateOrderStatus(id : Nat, status : { #pending; #confirmed }) : async () {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder : CustomerOrder = {
          id = order.id;
          customerName = order.customerName;
          phoneNumber = order.phoneNumber;
          address = order.address;
          items = order.items;
          timestamp = order.timestamp;
          status;
          totalAmount = order.totalAmount;
        };
        orders.add(id, updatedOrder);
      };
    };
  };

  // Check if caller is admin (kept for compatibility)
  public query ({ caller }) func isCurrentUserAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };
};
