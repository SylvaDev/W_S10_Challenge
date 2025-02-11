import React from 'react'
import { useGetOrdersQuery, useCreateOrderMutation } from '../state/pizzaOrdersApi'

export default function OrderList() {
  //rtk query
  const { data: orders } = useGetOrdersQuery()

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders?.map((order) => {
            return (
              <li key={order.id}>
                <div>
                {`${order.customer} ordered a size ${order.size} with ${order.toppings && order.toppings.length > 0 ? `${order.toppings.length} topping${order.toppings.length > 1 ? 's' : ''}` : 'no toppings'}`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
