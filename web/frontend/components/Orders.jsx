import { useEffect, useState } from "react";
import { Page, Spinner, LegacyCard, Grid } from "@shopify/polaris";

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

  return (
    <Page title="Latest Orders">
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 50 }}>
          <Spinner accessibilityLabel="Loading orders" size="large" />
        </div>
      ) : (
        <>
          {orders.length === 0 ? (
            <p style={{ textAlign: "center" }}>No orders found.</p>
          ) : (
            <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 3 }}>
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
