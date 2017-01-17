using ApplicationCore.DomainModel;
using System;
using System.Collections.Generic;

namespace ApplicationCore.DomainServices
{
    public interface IUserRepository : IDisposable
    {
        bool UserIsInRole(string userName, string roleName);
        OperationResult CreateUser(string userName, string password);
        OperationResult LoginUser(string userName, string password);
        OperationResult RemoveUserByID(string userId);
        OperationResult RemoveUserByName(string username);
        List<Gallery> GetGalleries();
        string GetUsernameByGalleryID(int galleryId);        
        int Save();
    }


}
