import { create } from 'zustand'

const useStore = create((set) => ({
  cart: [],
  selectedCategory: '전체',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  addToCart: (productId) => set((state) => {
    const existing = state.cart.find((item) => item.id === productId)
    if (existing) {
      return {
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
    }
    return { cart: [...state.cart, { id: productId, quantity: 1 }] }
  }),
  
  increase: (productId) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    )
  })),
  
  decrease: (productId) => set((state) => ({
    cart: state.cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0)
  })),
  
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId)
  })),
  
  clearCart: () => set({ cart: [] })
}))

export default useStore