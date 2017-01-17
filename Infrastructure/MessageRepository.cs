using ApplicationCore.DomainModel;
using ApplicationCore.DomainServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class MessageRepository : BaseRepository, IMessageRepository
    { 
        public void AddMessage(Message msg)
        {
            db.Messages.Add(new Message { MessageID = Guid.NewGuid(), Email = msg.Email, Name = msg.Name, Text = msg.Text, Date = DateTime.Now });
        }
    }
}
