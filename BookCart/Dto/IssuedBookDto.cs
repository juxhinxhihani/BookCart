using System;
using System.Collections.Generic;
using BookCart.Models;

namespace BookCart.Dto
{
	public class IssuedBookDto
	{
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BookTitle { get; set; }
        public string Author { get; set; }
        public List<IssuedBook> OrderDetails { get; set; }
    }
}

