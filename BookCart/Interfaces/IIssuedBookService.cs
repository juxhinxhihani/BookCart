using System;
using BookCart.Models;
using System.Collections.Generic;
using BookCart.Dto;

namespace BookCart.Interfaces
{
	public interface IIssuedBookService
	{
        List<IssuedBookClient> GetIssuedBookByusId(int userID);
        List<IssuedBookDto> GetALLIssuedBook();
        List<IssuedBookDto> GetPendingBooks();
        IssuedBookResponse userReturnBook(int issuedid);
        IssuedBookResponse addIssuedBook(IssuedBook book);
        List<IssuedBookClient> ReturnedBooksByUserId(int userID);
        IssuedBookResponse adminApprove(int issuedid);
	}
}

