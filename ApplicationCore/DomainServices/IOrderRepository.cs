using ApplicationCore.DomainModel;
using System;
using System.Collections.Generic;

namespace ApplicationCore.DomainServices
{
    public interface IOrderRepository
    {
        void AddOrder(Order order);
        void RemoveOrderByID(int orderId);
        List<Order> GetOrderList();
        Order GetOrderByID(int orderId);
        int Save();
    }
}
