using ApplicationCore.DomainModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.ApplicationServices
{
    public interface IMessageService
    {
        OperationResult SendMessage(Message msg);
        OperationResult SendOrder(Order order);
    }
}
