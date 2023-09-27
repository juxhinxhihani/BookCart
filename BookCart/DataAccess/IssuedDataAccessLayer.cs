using System;
using System.Collections.Generic;
using System.Linq;
using BookCart.Dto;
using BookCart.Interfaces;
using BookCart.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Operations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

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
        public List<IssuedBookClient> GetIssuedBookByusId(int userID) {
            try {
                List<IssuedBook> books = _dbContext.IssuedBook.Where(x => x.user_id == userID && 
                                                                          x.returned == 0).ToList();
                List<IssuedBookClient> booksList = new List<IssuedBookClient>();
                if (books != null) {
                    foreach(IssuedBook book in books) {
                        IssuedBookClient clientbooks = new IssuedBookClient();
                        clientbooks.issueId = book.issueId;
                        clientbooks.bookTitle = _dbContext.Book.FirstOrDefault(x => 
                            x.BookId == book.product_id).Title;
                        clientbooks.startDate = book.startDate;
                        clientbooks.endDate = book.endDate;
                        clientbooks.returned = book.returned;
                        clientbooks.phoneNumber = book.phoneNumber;
                        booksList.Add(clientbooks); }
                    return booksList; }
                return null;
            }catch(Exception ex) {
                throw new Exception(ex.Message.ToString());
            }
        }

        public List<IssuedBookDto> GetALLIssuedBook()
        {
            List<IssuedBook> books = _dbContext.IssuedBook.Where(x => x.returned == 0).ToList();
            List<IssuedBookDto> booksList = new List<IssuedBookDto>();

            foreach (var book in books)
            {
                var issuedbook = new IssuedBookDto();
                var dbBbook = _dbContext.Book.FirstOrDefault(x => x.BookId == book.product_id );
                if (dbBbook != null)
                {
                    var client = _dbContext.UserMaster.FirstOrDefault(x => x.UserId == book.user_id);
                    issuedbook.issueId = book.issueId;
                    issuedbook.Author = dbBbook.Author;
                    issuedbook.BookTitle = dbBbook.Title;
                    issuedbook.startDate = book.startDate;
                    issuedbook.endDate = book.endDate;
                    issuedbook.FirstName = client.FirstName;
                    issuedbook.LastName = client.LastName;
                    issuedbook.returned = book.returned;
                    issuedbook.Category = dbBbook.Category;
                    issuedbook.phoneNumber = book.phoneNumber;
                    booksList.Add(issuedbook);
                }
            }

            return booksList;
        }

        public List<IssuedBookDto> GetPendingBooks()
        {
            List<IssuedBook> books = _dbContext.IssuedBook.Where(x => x.returned == 2).ToList();
            List<IssuedBookDto> booksList = new List<IssuedBookDto>();

            foreach (var book in books)
            {
                var issuedbook = new IssuedBookDto();
                var dbBbook = _dbContext.Book.FirstOrDefault(x => x.BookId == book.product_id);
                var client = _dbContext.UserMaster.FirstOrDefault(x => x.UserId == book.user_id);
                issuedbook.issueId = book.issueId;
                issuedbook.Author = dbBbook.Author;
                issuedbook.BookTitle = dbBbook.Title;
                issuedbook.startDate = book.startDate;
                issuedbook.endDate = book.endDate;
                issuedbook.FirstName = client.FirstName;
                issuedbook.LastName = client.LastName;
                issuedbook.returned = book.returned;
                issuedbook.Category = dbBbook.Category;
                issuedbook.phoneNumber = book.phoneNumber;
                issuedbook.returnDate = book.returnDate;
                booksList.Add(issuedbook);
            }

            return booksList;
        }
        public IssuedBookResponse userReturnBook(int issuedid)
        {
            try
            {
                var book = _dbContext.IssuedBook.FirstOrDefault(x => x.issueId == issuedid);
                if (book.returned != 0)
                {
                    throw new Exception("Book is not taken");
                }
                else
                {
                    book.returned = 2;
                    book.returnDate = DateTime.Now;
                    _dbContext.Update(book);
                    var affectedRow = _dbContext.SaveChanges();
                    if (affectedRow < 1)
                    {
                        throw new Exception("No affected rows");
                    }

                    return new IssuedBookResponse()
                    {
                        error = false,
                        Message = "",
                        product_id = book.product_id,
                        returned = book.returned,
                        user_id = book.user_id,
                        endDate = book.endDate,
                        issueId = book.issueId,
                        startDate = book.startDate,
                        returnDate = book.returnDate,
                        phoneNumber = book.phoneNumber
                    };
                }
            }
            catch (Exception ex)
            {
                return new IssuedBookResponse()
                {
                    error = true,
                    Message = ex.Message
                };
            }
        }
        public IssuedBookResponse adminApprove(int issuedid)
        {
            try
            {
                var book = _dbContext.IssuedBook.FirstOrDefault(x => x.issueId == issuedid);
                var bookfromtable = _dbContext.Book.FirstOrDefault(x => x.BookId == book.product_id);
                if (book.returned != 2)
                {
                    throw new Exception("Book is not pending for approve");
                }
                else
                {
                    bookfromtable.isActive = true;
                    book.returned = 1;
                    book.returnDate = DateTime.Now;
                    _dbContext.Update(bookfromtable);
                    _dbContext.Update(book);
                    var affectedRow = _dbContext.SaveChanges();
                    if (affectedRow < 2)
                    {
                        throw new Exception("No affected rows");
                    }

                    return new IssuedBookResponse()
                    {
                        error = false,
                        Message = "",
                        product_id = book.product_id,
                        returned = book.returned,
                        user_id = book.user_id,
                        endDate = book.endDate,
                        issueId = book.issueId,
                        startDate = book.startDate,
                        returnDate = book.returnDate,
                        phoneNumber = book.phoneNumber
                    };
                }
            }
            catch (Exception ex)
            {
                return new IssuedBookResponse()
                {
                    error = true,
                    Message = ex.Message
                };
            }
        }
        public IssuedBookResponse addIssuedBook(IssuedBook book)
        {
            try {
                var originalBook = _dbContext.Book.FirstOrDefault(x => 
                    x.BookId == book.product_id);
                if (book.product_id == null || book.user_id == null)
                    throw new Exception("Product id or user id should not be null");
                if(!originalBook.isActive)
                    throw new Exception("Book is not active or is not to booked");
                if (!originalBook.toBoook)
                    throw new Exception("Book is not to book");
                originalBook.isActive = false;
                book.returned = 0;
                _dbContext.Update(originalBook);
                _dbContext.Add(book);
                var affectedRows = _dbContext.SaveChanges();
                if (affectedRows < 2) {
                    throw new Exception("No affected rows on adding new book");
                }
                return new IssuedBookResponse() {
                    error = false,
                    Message = "",
                    product_id = book.product_id,
                    returned = book.returned,
                    user_id = book.user_id,
                    endDate = book.endDate,
                    startDate = book.startDate,
                    added = true
                };
            }
            catch (Exception ex) {
                return new IssuedBookResponse()
                {
                    error = true,
                    Message = ex.Message
                };
            }
        }

        public List<IssuedBookClient> ReturnedBooksByUserId(int userID)
        {
            try
            {
                List<IssuedBook> books = _dbContext.IssuedBook.Where(x => x.user_id == userID && x.returned == 1).ToList();
                List<IssuedBookClient> booksList = new List<IssuedBookClient>();

                if (books != null)
                {
                    foreach(IssuedBook book in books)
                    {
                        IssuedBookClient clientbooks = new IssuedBookClient();
                        clientbooks.issueId = book.issueId;
                        clientbooks.bookTitle = _dbContext.Book.FirstOrDefault(x => x.BookId == book.product_id).Title;
                        clientbooks.startDate = book.startDate;
                        clientbooks.endDate = book.endDate;
                        clientbooks.returned = book.returned;
                        clientbooks.returnDate = book.returnDate;
                        clientbooks.phoneNumber = book.phoneNumber;
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
        
    }
}

