import { useMemo } from 'react'

function CategoryStats({ cartItems }) {
  const stats = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const category = item.category || '기타'
      acc[category] = (acc[category] || 0) + (item.price * item.quantity)
      return acc
    }, {})
  }, [cartItems])

  if (cartItems.length === 0) return null

  return (
    <div style={{ marginTop: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '10px' }}>📊 카테고리별 구매 통계</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(stats).map(([category, total]) => (
          <li key={category} style={{ marginBottom: '8px' }}>
            <strong>{category}</strong>: {total.toLocaleString()}원
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryStats