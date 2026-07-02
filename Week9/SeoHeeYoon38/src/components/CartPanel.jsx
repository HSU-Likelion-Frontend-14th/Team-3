import { useMutation } from '@tanstack/react-query'
import { checkoutOrder } from '../apis/productApi'
import useStore from '../store/useStore'
import CartItem from './CartItem'

function CartPanel({ items, totalPrice, onOrderComplete }) {
  const increase = useStore((state) => state.increase)
  const decrease = useStore((state) => state.decrease)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const clearCart = useStore((state) => state.clearCart)

  const checkoutMutation = useMutation({
    mutationFn: checkoutOrder,
    onSuccess: () => {
      clearCart()
      onOrderComplete()
    },
  })

  return (
    <aside className="cart-panel">
      <h2>장바구니</h2>

      {items.length === 0 ? (
        <p className="empty">장바구니가 비어 있어요.</p>
      ) : (
        <ul className="cart-list">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increase}
              onDecrease={decrease}
              onRemove={removeFromCart}
            />
          ))}
        </ul>
      )}

      <div className="cart-panel__total">
        <span>총 합계</span>
        <strong>{totalPrice.toLocaleString()}원</strong>
      </div>

      <button
        className="checkout-btn"
        disabled={items.length === 0 || checkoutMutation.isPending}
        onClick={() => checkoutMutation.mutate(items)}
      >
        {checkoutMutation.isPending ? '주문 처리 중...' : '주문하기'}
      </button>
    </aside>
  )
}

export default CartPanel