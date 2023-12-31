﻿using System;
using System.Collections.Generic;

namespace BookCart.Models
{
    public partial class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string CoverFileName { get; set; }
        public bool isActive { get; set; }
        public bool toBoook { get; set; }
        public int? stock { get; set; }

    }
}
