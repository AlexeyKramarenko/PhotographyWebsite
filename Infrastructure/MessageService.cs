using ApplicationCore.ApplicationServices;
using ApplicationCore.DomainModel;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using System;
using ApplicationCore.DomainServices;

namespace Infrastructure
{
    public class MessageService : BaseRepository, IMessageService
    {
        const string fromEmail = "some email";
        const string password = "some password";
        const string recipientEmail = "";

        IMessageRepository repo;
        public MessageService(IMessageRepository repo)
        {
            this.repo = repo;
        }
        public OperationResult SendMessage(Message msg)
        {
            try
            {
                repo.AddMessage(msg);
                int result = repo.Save();
            }
            catch (Exception e)
            {

            }
            try
            {
                using (MailMessage mm = new MailMessage(fromEmail, msg.Email))
                {

                    mm.Subject = "Замовлення";
                    mm.Body = string.Format(@"<table>
                                              <tr>
                                                <td>Email:</td>                    
                                                <td>{0}</td>
                                              </tr>
                                              <tr>
                                                <td>Ім'я:</td>                    
                                                <td>{1}</td>
                                              </tr>
                                              <tr>
                                                <td>Повiдомлення:</td>                    
                                                <td>{2}</td>
                                              </tr>
                                        </table>", msg.Email, msg.Name, msg.Text);
                    mm.IsBodyHtml = true;

                    var smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = new NetworkCredential(fromEmail, password);
                    smtp.Port = 587;
                    smtp.Send(mm);
                }
                return new OperationResult { Succeded = true, Message = "Повiдомлення вiдправлено." };
            }
            catch
            {
                return new OperationResult { Succeded = true, Message = "Виникли помилки при вiдправленi повiдомлення." };
            }
        }

        public OperationResult SendOrder(Order order)
        {
            return null;
        }
    }
}
