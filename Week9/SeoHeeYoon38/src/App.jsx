import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.scss'

import { fetchProducts } from './apis/productApi'
import useStore from './store/useStore'

import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import ProductList from './components/ProductList'
import CartPanel from './components/CartPanel'
import CategoryStats from './components/CategoryStats'

function App() {
  const cart = useStore((state) => state.cart)
  const selectedCategory = useStore((state) => state.selectedCategory)
  const setSelectedCategory = useStore((state) => state.setSelectedCategory)
  const addToCart = useStore((state) => state.addToCart)

  const [isOrderComplete, setIsOrderComplete] = useState(false)

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5분
  })

  const handleAddToCart = useCallback((productId) => {
    addToCart(productId)
  }, [addToCart])

  const cartItems = useMemo(() => {
    return cart.map((item) => {
      const product = products.find((p) => p.id === item.id) || {}
      return { ...product, quantity: item.quantity }
    })
  }, [cart, products])

  const totalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  )

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
    [cartItems]
  )

  const filteredProducts = useMemo(() => {
    return selectedCategory === '전체'
      ? products
      : products.filter((p) => p.category === selectedCategory)
  }, [products, selectedCategory])

  if (isLoading && products.length === 0) return <div>상품을 불러오는 중입니다...</div>

  if (isOrderComplete) {
    return (
      <div className="app">
        <Header totalCount={0} totalPrice={0} />
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>🎉 주문이 완료되었습니다! 🎉</h2>
          <button onClick={() => setIsOrderComplete(false)}>새로 주문하기</button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header totalCount={totalCount} totalPrice={totalPrice} />

      <div className="app__body">
        <main className="app__main">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />

          <CategoryStats cartItems={cartItems} />
        </main>

        <CartPanel
          items={cartItems}
          totalPrice={totalPrice}
          onOrderComplete={() => setIsOrderComplete(true)}
        />
      </div>
    </div>
  )
}

export default App