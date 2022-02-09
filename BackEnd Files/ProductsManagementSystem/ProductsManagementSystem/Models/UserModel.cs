using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS_API.Models
{
    public class UserModel
    {
        public string Id { get; set; }
        public string name { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        //[Phone]
        //public string PhoneNumber { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string RoleID { get; set; }
        public string Role { get; set; }

    }
}
