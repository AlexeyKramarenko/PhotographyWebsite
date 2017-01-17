using ApplicationCore.DomainModel;


namespace ApplicationCore.DomainServices
{
    public interface IMessageRepository
    {
        void AddMessage(Message msg);
        int Save();
    }
}
