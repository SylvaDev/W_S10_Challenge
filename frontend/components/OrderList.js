import React from 'react'
import { useGetOrdersQuery } from '../state/pizzaOrdersApi'
import { useDispatch, useSelector } from 'react-redux'
import { setSizeFilter } from '../state/sizeFilterSlice'

export default function OrderList() {
  //rtk query
  const { data: orders } = useGetOrdersQuery()
  const dispatch = useDispatch()
  const sizeFilter = useSelector(state => state.sizeFilter)

  // Filter orders based on the selected size filter
  const filteredOrders = sizeFilter === 'All' 
    ? orders 
    : orders?.filter(order => order.size === sizeFilter)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders?.map((order) => {
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
            const className = `button-filter${size === sizeFilter ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => dispatch(setSizeFilter(size))}
            >
              {size}
            </button>
          })
        }
      </div>
    </div>
  )
}
