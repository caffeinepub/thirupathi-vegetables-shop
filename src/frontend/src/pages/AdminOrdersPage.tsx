import { Loader2 } from "lucide-react";
import { OrderStatus } from "../backend.d";
import { useGetAllOrders, useUpdateOrderStatus } from "../hooks/useQueries";

export function AdminOrdersPage() {
  const { data: orders = [], isLoading } = useGetAllOrders();
  const updateStatus = useUpdateOrderStatus();

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
            Thirupathi Vegetables & Fruits Shop
          </p>
        </div>
        <a
          href="/"
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          ← Back to Shop
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
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
                          order.status === OrderStatus.confirmed
                            ? "bg-price-green/10 text-price-green"
                            : "bg-shop-orange/10 text-shop-orange"
                        }`}
                      >
                        {order.status === OrderStatus.confirmed
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

                {order.status === OrderStatus.pending && (
                  <button
                    type="button"
                    data-ocid={`admin.confirm_button.${i + 1}`}
                    onClick={() =>
                      updateStatus.mutate({
                        id: order.id,
                        status: OrderStatus.confirmed,
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
