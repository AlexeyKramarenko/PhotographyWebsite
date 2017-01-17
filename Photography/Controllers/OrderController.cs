using ApplicationCore.ApplicationServices;
using ApplicationCore.DomainModel;
using ApplicationCore.DomainServices;
using Photographer.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Photography.Controllers
{
    public class OrderController : Controller
    {
        IImagesRepository imagesRepo;
        ISessionService sessionService;
        IUserRepository userRepo;
        IOrderRepository orderRepo;
        IMessageService messageService;
        IMappingService mappingService;
        public OrderController(IUserRepository userRepo, IImagesRepository imagesRepo, ISessionService sessionService, IOrderRepository orderRepo, IMessageService messageService, IMappingService mappingService)
        {
            this.userRepo = userRepo;
            this.imagesRepo = imagesRepo;
            this.sessionService = sessionService;
            this.orderRepo = orderRepo;
            this.messageService = messageService;
            this.mappingService = mappingService;
        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public JsonResult GetOrderList()
        {
            List<Order> orderList = orderRepo.GetOrderList();
            var items = new List<OrderItemViewModel>();
            foreach (var order in orderList)
            {
                var item = new OrderItemViewModel
                {
                    ID = order.OrderID,
                    GalleryID = order.GalleryID,
                    OrderDate = order.OrderDate,
                    Username = userRepo.GetUsernameByGalleryID(order.GalleryID)
                };
                items.Add(item);
            }
            return Json(items, JsonRequestBehavior.AllowGet);

        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public JsonResult GetOrderByID(int id)
        {
            Order order = orderRepo.GetOrderByID(id);

            var userOrder = new UserOrderViewModel
            {
                OrderID = order.OrderID,
                Username = userRepo.GetUsernameByGalleryID(order.GalleryID),
                Comment = order.Comment
            };

            foreach (var item in order.OrderItems)
            {
                Picture pic = imagesRepo.GetPictureByID(item.PictureID);
                var model = new PictureItemViewModel
                {
                    PictureID = pic.PictureID,
                    LargeImagePath = pic.LargeImagePath,
                    ThumbnailImagePath = pic.ThumbnailImagePath,
                    GalleryID = order.GalleryID
                };
                userOrder.Pictures.Add(model);
            }

            return Json(userOrder, JsonRequestBehavior.AllowGet);
        }
        [Authorize(Roles = "user")]
        [HttpPost]
        public JsonResult Order(OrderViewModel model)
        {
            var order = new Order
            {
                OrderDate = DateTime.Now,
                GalleryID = model.GalleryID,
                Comment = model.Comment,
                OrderItems = new List<OrderItem>()
            };

            if (model.PictureIDs != null)
                foreach (var id in model.PictureIDs)
                    order.OrderItems.Add(new OrderItem { PictureID = id });

            orderRepo.AddOrder(order);
            int res = orderRepo.Save();
            if (res > 0)
            {
                messageService.SendOrder(order);
                return Json("Ваше замовлення прийнято", JsonRequestBehavior.AllowGet);
            }
            return Json("Виникли проблеми iз вiдправленням Вашого замовлення. Зв'яжiться з Олегом через пошту або зателефонуйте йому.", JsonRequestBehavior.AllowGet);
        }
        [Authorize(Roles = "admin")]
        [HttpDelete]
        public JsonResult DeleteOrderByID(int id)
        {
            orderRepo.RemoveOrderByID(id);
            int result = orderRepo.Save();
            if (result > 0)
                return Json("Замовлення видалено успішно.", JsonRequestBehavior.AllowGet);
            return Json("Виникли проблеми. Спробуйте пізніше.", JsonRequestBehavior.AllowGet);
        }
    }
}