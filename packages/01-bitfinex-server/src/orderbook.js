class Orderbook {

  constructor() {
    this.orders = [];
    this.matchedOrders = [];
    this.remainingOrders = [];
  }

  // Submit an order to the order book
  submitOrder(order) {
    this.orders.push(order);
    return this.orders;
  }

  // Match orders and return any remaining orders
  matchOrders(order) {
    // const this.matchedOrders = [];
    // const this.remainingOrders = [];

    for (const existingOrder of this.orders) {
      if (order.type !== existingOrder.type && order.price === existingOrder.price) {
        // Matched orders, execute trade
        this.matchedOrders.push(existingOrder);
      } else {
        // Non-matching orders, keep in the order book
        this.remainingOrders.push(existingOrder);
      }
    }

    this.orders = this.remainingOrders; // Update the order book

    return {
      matchedOrders,
      remainingOrders,
    };
  }


  matchOrders(newOrder) {

    for (let i = 0; i < orderBook.length; i++) {
      const existingOrder = orderBook[i];
      if (isMatchingOrder(existingOrder, newOrder)) {
        // Match and add to this.matchedOrders
        const match = {
          buyer: newOrder.clientId,
          seller: existingOrder.clientId,
          price: existingOrder.price,
          quantity: Math.min(existingOrder.quantity, newOrder.quantity),
        };
        this.matchedOrders.push(match);

        // Update remaining quantities in the order book
        existingOrder.quantity -= match.quantity;
        newOrder.quantity -= match.quantity;

        // If the existing order is  matched, remove it from the order book
        if (existingOrder.quantity === 0) {
          orderBook.splice(i, 1);
          i--; // Adjust the index after removal
        }

        // If the new order is  matched, break the loop
        if (newOrder.quantity === 0) {
          break;
        }
      }
    }

    // If there is remaining quantity in the new order, add it to the order book
    if (newOrder.quantity > 0) {
      orderBook.push(newOrder);
    }

    return this.matchedOrders;
  }

  // Function to check if two orders match
  isMatchingOrder(order1, order2) {
    return (
      order1.price === order2.price &&
      order1.type !== order2.type && // Assuming different types are buy and sell
      ((order1.type === 'buy' && order1.price >= order2.price) ||
        (order1.type === 'sell' && order1.price <= order2.price))
    );
  }




}

module.exports = Orderbook;