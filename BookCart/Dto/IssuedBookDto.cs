using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using BookCart.Models;

namespace BookCart.Dto
{
	public class IssuedBookDto : BaseResponse
	{
		public int issueId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BookTitle { get; set; }
        public string Category { get; set; }
        public string Author { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public int returned { get; set; }
        
    }
}

