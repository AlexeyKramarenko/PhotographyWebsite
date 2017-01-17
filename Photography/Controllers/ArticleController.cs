using ApplicationCore.ApplicationServices;
using ApplicationCore.DomainModel;
using ApplicationCore.DomainServices;
using System.Web.Mvc;

namespace Photography.Controllers
{
    public class ArticleController : Controller
    {
        IArticleRepository articleRepo;
        IMappingService mappingService;

        public ArticleController(IArticleRepository articleRepo, IMappingService mappingService)
        {
            this.articleRepo = articleRepo;
            this.mappingService = mappingService;
        }
        [HttpGet]
        public JsonResult GetArticleByPageName(string id)
        {
            Article article = articleRepo.GetArticleByPageName(id);
            return Json(article, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetArticleByID(int id)
        {
            Article article = articleRepo.GetArticleByID(id);
            return Json(article, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        public JsonResult UpdateArticle(int id, Article article)
        {
            Article oldArticle = articleRepo.GetArticleByID(id);
            oldArticle.Text = article.Text;
            int result = articleRepo.Save();
            if (result > 0)
                return Json("Стаття оновлена успiшно", JsonRequestBehavior.AllowGet);

            return Json("Виникли проблеми пiд час оновлення cтаттi.", JsonRequestBehavior.AllowGet);
        }
    }
}