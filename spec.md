# Thirupathi Vegetables and Fruits Shop

## Current State
New project, no existing application files.

## Requested Changes (Diff)

### Add
- Shop homepage with name "Thirupathi Vegetables and Fruits Shop"
- Product listing page showing all vegetables with prices in INR (₹)
- Shopping cart functionality: add/remove items, adjust quantities
- Order placement: customer submits name, phone, address and places order
- Backend stores product catalog and orders
- Admin can view placed orders

### Modify
- N/A

### Remove
- N/A

## Implementation Plan

### Products (pre-seeded in backend)
- Tomato ₹25.43, Onion ₹24.24, Potato ₹19.44, Brinjal ₹36.89
- Ladies Finger (Bhindi) ₹47.00, Green Chilli ₹42.00, Cabbage ₹22.00
- Carrot ₹26.00, Bitter Gourd (Kakarakaya) ₹44.00, Bottle Gourd (Sorakaya) ₹28.00
- Capsicum ₹55.00, Ginger ₹24.30, Garlic ₹35.46

### Backend (Motoko)
- Store product list with name, price, unit (per kg)
- Store orders with customer details, items, quantities, total, timestamp, status
- APIs: getProducts, placeOrder, getOrders (admin)

### Frontend (React)
- Header with shop name and cart icon with item count
- Product grid cards with name, price, add-to-cart button and quantity controls
- Cart sidebar/drawer showing items, quantities, total
- Checkout form: customer name, phone, delivery address
- Order confirmation message after placing
- Orders page (admin) to view all placed orders
