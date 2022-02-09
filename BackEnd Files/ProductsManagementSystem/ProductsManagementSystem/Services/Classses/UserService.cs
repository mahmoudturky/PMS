using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PMS_API.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS_API.Services.Classses
{
    public class UserService : IUserService
    {
        private readonly AppDBContext _context;
        private readonly UserManager<IdentityUser> userManager;


        public UserService(AppDBContext _context, UserManager<IdentityUser> userManager)
        {
            this._context = _context;
            this.userManager = userManager;
        }
       
    }
}
