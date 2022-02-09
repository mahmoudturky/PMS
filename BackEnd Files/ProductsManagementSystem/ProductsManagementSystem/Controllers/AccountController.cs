using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using PMS_API.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly UserManager<IdentityUser> userManager;
        private readonly IConfiguration config;

        public AccountController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IConfiguration config)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await userManager.FindByEmailAsync(model.Email);
                if (existingUser == null)
                {
                    IdentityUser user = new IdentityUser();
                    user.UserName = model.Name;
                    user.Email = model.Email;

                    IdentityResult result = userManager.CreateAsync(user, model.Password).Result;

                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, model.Role);
                        return Created("", model);
                    }
                }

            }
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await this.userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var passwordCheck = await this.signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                    if (passwordCheck.Succeeded)
                    {
                        var claims = new List<Claim>
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
                        };
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config["Tokens:Key"]));
                        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(
                            this.config["Tokens:Issuer"],
                            this.config["Tokens:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddHours(3),
                            signingCredentials: credentials
                            );

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        });
                    }

                }
                else
                {
                    return Unauthorized();
                }
            }

            return BadRequest();
        }


        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var users = userManager.Users.ToList();
                var usersProfiles = new List<UserModel>();
                for (int i = 0; i < users.Count; i++)
                {
                    var roles = await userManager.GetRolesAsync(users[i]);
                    var userInfo = new UserModel
                    {
                        Id = users[i].Id,
                        name = users[i].UserName,
                        Email = users[i].Email,
                        Role = roles.FirstOrDefault(),
                    };
                    usersProfiles.Add(userInfo);
                }

                return Ok(usersProfiles);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}