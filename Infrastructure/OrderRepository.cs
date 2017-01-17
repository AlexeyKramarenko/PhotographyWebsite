using ApplicationCore.DomainModel;
using ApplicationCore.DomainServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        public void AddOrder(Order order)
        {
            db.Orders.Add(order);
        }
        public void RemoveOrderByID(int orderId)
        {
            Order item = db.Orders.Find(orderId);
            if (item != null)
                db.Orders.Remove(item);
        } 
        public List<Order> GetOrderList()
        {
            return db.Orders.ToList();
        }
        public Order GetOrderByID(int orderId)
        {
            return db.Orders.Find(orderId);
        }


    }
}
