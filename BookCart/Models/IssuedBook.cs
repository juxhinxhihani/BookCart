using System;
using System.Collections.Generic;

namespace BookCart.Models
{
    public class IssuedBook
    {
        public int issueId { get; set; }
        public int user_id { get; set; }
        public int product_id { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public int returned { get; set; }
        public DateTime? returnDate { get; set; }
        public string phoneNumber { get; set; }
    }
    public class AddIssuedBook
    {
        public int user_id { get; set; }
        public int product_id { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public int returned { get; set; }
        public DateTime? returnDate { get; set; }
        public string phoneNumber { get; set; }
    }
    public class IssuedBookClient : BaseResponse
    {
        public int issueId { get; set; }
        public string bookTitle { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public int returned { get; set; }
        public DateTime? returnDate { get; set; }
        public string phoneNumber { get; set; }
    }

    public class BaseResponse
    {
        public string Message { get; set; }
        public bool error { get; set; }
    }
    public class IssuedBookResponse : BaseResponse
    {
        public int issueId { get; set; }
        public int user_id { get; set; }
        public int product_id { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public int returned { get; set; } = 0;
        public bool added { get; set; }
        public DateTime? returnDate { get; set; }
        public string phoneNumber { get; set; }
    }
}