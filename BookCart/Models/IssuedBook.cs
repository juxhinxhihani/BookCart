using System;
using System.Collections.Generic;

namespace BookCart.Models
{
    public partial class IssuedBook
    {
        public int issueId { get; set; }
        public int user_id { get; set; }
        public int product_id { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public bool returned { get; set; }
    }
    public partial class IssuedBookClient
    {
        public string bookTitle { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public bool returned { get; set; }

    }
}