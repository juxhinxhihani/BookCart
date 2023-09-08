using System;
using System.Collections.Generic;
using System.Linq;
using BookCart.Dto;
using BookCart.Interfaces;
using BookCart.Models;
using Microsoft.EntityFrameworkCore;

namespace BookCart.DataAccess
{
	public class IssuedDataAccessLayer : IIssuedBookService
    {
        readonly BookDBContext _dbContext;

        public IssuedDataAccessLayer(BookDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        //for user
        public List<IssuedBookClient> GetIssuedBookByusId(int userID)
        {
            try
            {
                List<IssuedBook> books = _dbContext.IssuedBook.Where(x => x.user_id == userID).ToList();
                List<IssuedBookClient> booksList = new List<IssuedBookClient>();

                if (books != null)
                {
                    foreach(IssuedBook book in books)
                    {
                        IssuedBookClient clientbooks = new IssuedBookClient();
                        clientbooks.bookTitle = _dbContext.Book.FirstOrDefault(x => x.BookId == book.product_id).Title;
                        clientbooks.startDate = book.startDate;
                        clientbooks.endDate = book.endDate;
                        clientbooks.returned = book.returned;

                        booksList.Add(clientbooks);
                       
                    }
                    return booksList;
                }
                return null;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }

        ////for admin
        //public List<IssuedBookDto> GetAllInfosForIssuedBook()
        //{

        //}
    }
}

