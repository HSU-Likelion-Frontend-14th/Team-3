import products from '../data/products'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchProducts() {
  await wait(300)
  return products
}

export async function checkoutOrder(orderItems) {
  await wait(500)

  if (orderItems.length === 0) {
    throw new Error('장바구니가 비어 있습니다.')
  }

  return {
    orderId: crypto.randomUUID(),
    orderedAt: new Date().toISOString(),
    items: orderItems,
  }
}
