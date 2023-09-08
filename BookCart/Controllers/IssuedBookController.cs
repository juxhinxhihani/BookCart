using System;
using BookCart.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using BookCart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookCart.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class IssuedBookController: Controller
	{
        public IWebHostEnvironment _hostingEnvironment;
        public IIssuedBookService _bookService;
        public IConfiguration _config;

        public IssuedBookController(IConfiguration config, IWebHostEnvironment hostingEnvironment, IIssuedBookService bookService)
        {
            _config = config;
            _bookService = bookService;
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// Get the list of issued books
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>List of issued Book</returns>
        [HttpGet("{userId}")]
        public async Task<List<IssuedBookClient>> GetIssuedBooksByUser(int userId)
        {
            return await Task.FromResult(_bookService.GetIssuedBookByusId(userId)).ConfigureAwait(true);
        }
    }
}

