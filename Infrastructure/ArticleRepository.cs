using ApplicationCore.DomainServices;
using System.Linq;
using ApplicationCore.DomainModel;
using System;

namespace Infrastructure
{
    public class ArticleRepository : BaseRepository, IArticleRepository
    {
        public Article GetArticleByID(int id)
        {
            return db.Articles.Find(id);
        }

        public Article GetArticleByPageName(string pageName)
        {
            return db.Articles.FirstOrDefault(a => a.PageName == pageName);
        }

        public void UpdateArticle(Article article)
        {
            db.Entry(article).State = System.Data.Entity.EntityState.Modified;
        }
    }
}
