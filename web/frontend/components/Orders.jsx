import { useEffect, useState } from "react";
import { Page, Spinner, LegacyCard, Grid, Button } from "@shopify/polaris";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();

        if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          console.error("Expected orders to be an array", data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const exportToCSV = () => {
    const headers = ["Order ID", "Customer Name", "Total Amount", "Currency", "Payment Status"];
    const rows = orders.map(order => [
      order.name,
      order.customerName,
      order.amount,
      order.currency,
      order.displayFinancialStatus,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(value => `"${value}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "latest_orders.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Page
      title="Latest Orders"
      primaryAction={{
        content: "Export CSV",
        onAction: exportToCSV,
        disabled: loading || orders.length === 0,
      }}
    >
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 50 }}>
          <Spinner accessibilityLabel="Loading orders" size="large" />
        </div>
      ) : (
        <>
          {orders.length === 0 ? (
            <p style={{ textAlign: "center" }}>No orders found.</p>
          ) : (
            <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 3 }} gap="4">
              {orders.map((order) => (
                <Grid.Cell key={order.id}>
                  <LegacyCard title={`Order ${order.name}`} sectioned>
                    <p><strong>Customer:</strong> {order.customerName}</p>
                    <p><strong>Total:</strong> {order.amount} {order.currency}</p>
                    <p><strong>Payment Status:</strong> {order.displayFinancialStatus}</p>
                  </LegacyCard>
                </Grid.Cell>
              ))}
            </Grid>
          )}
        </>
      )}
    </Page>
  );
}
