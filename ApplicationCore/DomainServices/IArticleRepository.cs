using ApplicationCore.DomainModel;

namespace ApplicationCore.DomainServices
{
    public interface IArticleRepository
    {
        Article GetArticleByID(int id);
        Article GetArticleByPageName(string pageName);
        void UpdateArticle(Article article);
        int Save();
    }
}
