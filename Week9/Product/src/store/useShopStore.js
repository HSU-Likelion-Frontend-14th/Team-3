import { create } from 'zustand'

const ALL_CATEGORY = '전체'

const clampQuantity = (quantity, stock) => Math.min(quantity, stock)

const useShopStore = create((set) => ({
  cart: [],
  selectedCategory: ALL_CATEGORY,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  addToCart: (product) =>
    set((state) => {
      if (product.stock <= 0) {
        return state
      }

      const existing = state.cart.find((item) => item.id === product.id)

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: clampQuantity(item.quantity + 1, product.stock) }
              : item,
          ),
        }
      }

      return {
        cart: [...state.cart, { id: product.id, quantity: 1 }],
      }
    }),
  increaseQuantity: (product) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: clampQuantity(item.quantity + 1, product.stock) }
          : item,
      ),
    })),
  decreaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}))

export { ALL_CATEGORY }
export default useShopStore
