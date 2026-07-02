import { useMemo } from 'react'
import { useMutation } from '@tanstack/react-query'
import { checkoutOrder } from '../api/products'
import useShopStore from '../store/useShopStore'
import CartItem from './CartItem'

function CartPanel({
  items,
  totalPrice,
  isOrderComplete,
  onCheckoutSuccess,
  onContinueShopping,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const clearCart = useShopStore((state) => state.clearCart)

  const categoryTotals = useMemo(
    () =>
      items.reduce((totals, item) => {
        const current = totals[item.category] ?? { quantity: 0, price: 0 }

        return {
          ...totals,
          [item.category]: {
            quantity: current.quantity + item.quantity,
            price: current.price + item.price * item.quantity,
          },
        }
      }, {}),
    [items],
  )

  const checkoutMutation = useMutation({
    mutationFn: checkoutOrder,
    onSuccess: () => {
      clearCart()
      onCheckoutSuccess()
    },
  })

  const handleCheckout = () => {
    checkoutMutation.mutate(items)
  }

  if (isOrderComplete) {
    return (
      <aside className="cart-panel cart-panel--complete">
        <h2>주문 완료</h2>
        <p className="cart-panel__message">주문이 정상적으로 접수되었습니다.</p>
        <button className="checkout-btn" onClick={onContinueShopping}>
          계속 쇼핑하기
        </button>
      </aside>
    )
  }

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
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}

      <div className="cart-panel__total">
        <span>총 합계</span>
        <strong>{totalPrice.toLocaleString()}원</strong>
      </div>

      {items.length > 0 && (
        <div className="cart-panel__stats">
          <h3>카테고리별 합계</h3>
          {Object.entries(categoryTotals).map(([category, total]) => (
            <p key={category}>
              <span>{category}</span>
              <strong>
                {total.quantity}개 · {total.price.toLocaleString()}원
              </strong>
            </p>
          ))}
        </div>
      )}

      {checkoutMutation.isError && (
        <p className="cart-panel__error">{checkoutMutation.error.message}</p>
      )}

      <button
        className="checkout-btn"
        disabled={items.length === 0 || checkoutMutation.isPending}
        onClick={handleCheckout}
      >
        {checkoutMutation.isPending ? '주문 중...' : '주문하기'}
      </button>
    </aside>
  )
}

export default CartPanel
