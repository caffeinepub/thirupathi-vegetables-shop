# Thirupathi Vegetables Shop

## Current State
- Admin page at `/admin/orders` requires Internet Identity login + admin role assignment
- Customer checkout requires Internet Identity login before placing an order
- Backend enforces `isAdmin` check on `getAllOrders`, `updateOrderStatus`, and `hasPermission(#user)` check on `placeOrder`
- User cannot use Internet Identity and has not been assigned admin Principal

## Requested Changes (Diff)

### Add
- Simple username/password login form on the admin page (username: `Hariprasad`, password: `Hariprasad009`)
- localStorage-based admin session (stays logged in across page reloads)

### Modify
- Backend `placeOrder`: Remove `hasPermission(#user)` check so anonymous callers (customers) can place orders without login
- Backend `getAllOrders`: Remove `isAdmin` check so it is accessible without auth
- Backend `updateOrderStatus`: Remove `isAdmin` check
- Frontend `AdminOrdersPage`: Replace Internet Identity login with username/password form
- Frontend `CheckoutModal`: Remove the Internet Identity gate, show checkout form directly

### Remove
- Internet Identity login requirement for customers (checkout)
- Internet Identity login requirement for admin
- `isCurrentUserAdmin` backend call dependency from admin page

## Implementation Plan
1. Modify `src/backend/main.mo` - remove auth checks from `placeOrder`, `getAllOrders`, `updateOrderStatus`
2. Modify `src/frontend/src/pages/AdminOrdersPage.tsx` - replace II login with a username/password form that checks hardcoded credentials and stores session in localStorage
3. Modify `src/frontend/src/components/CheckoutModal.tsx` - remove the II login gate, show checkout form immediately
