import { Loader2, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Variant_pending_confirmed } from "../backend.d";
import { useGetAllOrders, useUpdateOrderStatus } from "../hooks/useQueries";

export function AdminOrdersPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const { data: orders = [], isLoading: ordersLoading } = useGetAllOrders();
  const updateStatus = useUpdateOrderStatus();

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Hariprasad" && password === "Hariprasad009") {
      localStorage.setItem("adminAuth", "true");
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const formatDate = (timestamp: bigint) => {
    const ms = Number(timestamp / 1000000n);
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-shop-green text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Admin — Orders</h1>
          <p className="text-white/70 text-sm">
            Thirupathi Vegetables &amp; Fruits Shop
          </p>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button
              type="button"
              data-ocid="admin.logout_button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
          <a
            href="/"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            ← Back to Shop
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!isLoggedIn ? (
          /* Login form */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-card border border-border rounded-2xl shadow-lg w-full max-w-sm p-8">
              <div className="text-center mb-8">
                <div className="bg-shop-green/10 rounded-full p-4 inline-flex mb-4">
                  <svg
                    className="w-10 h-10 text-shop-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Admin Login
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Sign in to manage orders
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="admin-username"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Username
                  </label>
                  <input
                    id="admin-username"
                    data-ocid="admin.input"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-shop-green/50 focus:border-shop-green transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    id="admin-password"
                    data-ocid="admin.input"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-shop-green/50 focus:border-shop-green transition-colors"
                  />
                </div>

                {loginError && (
                  <div
                    data-ocid="admin.error_state"
                    className="text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2 text-center"
                  >
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  data-ocid="admin.submit_button"
                  className="w-full bg-shop-green hover:bg-shop-green-dark text-white font-semibold py-3 rounded-xl transition-colors mt-2"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        ) : ordersLoading ? (
          <div
            data-ocid="admin.loading_state"
            className="flex items-center justify-center py-20"
          >
            <Loader2 className="w-8 h-8 animate-spin text-shop-green" />
            <span className="ml-3 text-muted-foreground">
              Loading orders...
            </span>
          </div>
        ) : orders.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            className="text-center py-20 text-muted-foreground"
          >
            No orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {orders.length} order(s) found
            </p>
            {orders.map((order, i) => (
              <div
                key={order.id.toString()}
                data-ocid={`admin.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-5 shadow-card"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-foreground">
                        Order #{order.id.toString()}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          order.status === Variant_pending_confirmed.confirmed
                            ? "bg-price-green/10 text-price-green"
                            : "bg-shop-orange/10 text-shop-orange"
                        }`}
                      >
                        {order.status === Variant_pending_confirmed.confirmed
                          ? "Confirmed"
                          : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.timestamp)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-price-green text-lg">
                      ₹{order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Customer: </span>
                    <span className="font-medium">{order.customerName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone: </span>
                    <span className="font-medium">{order.phoneNumber}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-muted-foreground">Address: </span>
                    <span className="font-medium">{order.address}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                    Items
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item) => (
                      <span
                        key={item.productName}
                        className="bg-muted text-xs px-2 py-1 rounded-md"
                      >
                        {item.productName} — {item.quantity}kg
                      </span>
                    ))}
                  </div>
                </div>

                {order.status === Variant_pending_confirmed.pending && (
                  <button
                    type="button"
                    data-ocid={`admin.confirm_button.${i + 1}`}
                    onClick={() =>
                      updateStatus.mutate({
                        id: order.id,
                        status: Variant_pending_confirmed.confirmed,
                      })
                    }
                    disabled={updateStatus.isPending}
                    className="bg-shop-green hover:bg-shop-green-dark disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    {updateStatus.isPending
                      ? "Updating..."
                      : "Mark as Confirmed"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
