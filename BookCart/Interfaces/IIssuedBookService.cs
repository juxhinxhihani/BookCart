using System;
using BookCart.Models;
using System.Collections.Generic;

namespace BookCart.Interfaces
{
	public interface IIssuedBookService
	{
        List<IssuedBookClient> GetIssuedBookByusId(int userID);

    }
}

