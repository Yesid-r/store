import React, { useContext, useEffect, useState, useMemo } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { API_URL } from '../utils/constants'

const Orders = () => {
  const { user } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    if (user) {
      getOrders()
    }
  }, [user])

  const getOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/order/${user.id}`)
      const data = await response.json()
      setOrders(data.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const filteredOrders = useMemo(() => {
    let filtered = [...orders]
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus)
    }
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortBy === 'total') {
        return sortOrder === 'asc' ? a.total - b.total : b.total - a.total
      } else {
        return 0
      }
    })
    return filtered
  }, [orders, sortBy, sortOrder, filterStatus])

  if (!user) {
    return <div className="container mx-auto">Por favor, inicia sesión para ver tus órdenes.</div>
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tus ordenes</h1>
        <div className="flex items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-40 border border-gray-300 rounded-md p-2"
          >
            <option value="all">All</option>
            <option value="Delivered">Entregada</option>
            <option value="Shipped">Enviada</option>
            <option value="Cancelled">Estado</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-40 border border-gray-300 rounded-md p-2"
          >
            <option value="date">Fecha</option>
            <option value="total">Total</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 border border-gray-300 rounded-md"
          >
            {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="border border-gray-300 rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Items</h3>
                <ul className="space-y-2">
                  {order.orderItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between">
                      <div>{item.product.name}</div>
                      <div>
                        {item.quantity} x ${item.product.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Resumen</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Total:</div>
                  <div className="font-medium">
                    ${order.orderItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
                  </div>
                  <div className="text-gray-500">Status:</div>
                  <div className={`font-medium ${order.isPaid?  'text-green-500' : 'text-red-500'}`}>
                    Pago
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
