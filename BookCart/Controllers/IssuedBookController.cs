using System;
using BookCart.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using BookCart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using BookCart.Dto;
using Microsoft.AspNetCore.Authorization;

namespace BookCart.Controllers
{

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
        /// Get the list of issued books by user ID
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>List of issued Book</returns>
        [HttpGet("{userId}")]
        public async Task<List<IssuedBookClient>> GetByUser(int userId)
        {
            return await Task.FromResult(_bookService.GetIssuedBookByusId(userId)).ConfigureAwait(true);
        } 
        
        /// <summary>
        /// Returned issued books by user ID
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>List of returned books</returns>
        [HttpGet("return/{userId}")]
        public async Task<List<IssuedBookClient>> ReturnedBooks(int userId)
        {
            return await Task.FromResult(_bookService.ReturnedBooksByUserId(userId)).ConfigureAwait(true);
        } 
        /// <summary>
        /// Get the list of issued books
        /// </summary>
        /// <returns>List of issued Book</returns>
        [HttpGet]
        public async Task<List<IssuedBookDto>> GetBooks()
        {
            return await Task.FromResult(_bookService.GetALLIssuedBook()).ConfigureAwait(true);
        }
        /// <summary>
        /// Get the list of issued books
        /// </summary>
        /// <returns>List of issued Book</returns>
        [HttpGet("Pending")]
        public async Task<List<IssuedBookDto>> GetPendings()
        {
            return await Task.FromResult(_bookService.GetPendingBooks()).ConfigureAwait(true);
        }
        /// <summary>
        /// Return book
        /// </summary>
        /// <returns>Returned book</returns>
        [HttpPut("Return/{issuedId}")]
        public async Task<IssuedBookResponse> returnBook(int issuedId)
        {
            return await Task.FromResult(_bookService.userReturnBook(issuedId)).ConfigureAwait(true);
        }
        /// <summary>
        /// Return book
        /// </summary>
        /// <returns>Returned book</returns>
        [HttpPut("Approve/{issuedId}")]
        public async Task<IssuedBookResponse> approve(int issuedId)
        {
            return await Task.FromResult(_bookService.adminApprove(issuedId)).ConfigureAwait(true);
        }
        /// <summary>
        /// Add new issued book
        /// </summary>
        /// <param name="book"></param>
        /// <returns>Add book</returns>
        [HttpPost]
        public async Task<IssuedBookResponse> addBook([FromBody]IssuedBook book)
        {
            return await Task.FromResult(_bookService.addIssuedBook(book)).ConfigureAwait(true);
        }
        
    }
}

