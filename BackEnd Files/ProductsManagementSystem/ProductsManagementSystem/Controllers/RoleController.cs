using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PMS_API.Entites;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace PMS_API.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    //public class RoleController : ControllerBase
    //{
    //    private readonly UserManager<ApplicationUser> userManager;
    //    private readonly RoleManager<IdentityRole> _roleManager;
    //    private readonly ILogger<RoleController> _logger;

    //    public RoleController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogger<RoleController> _logger)
    //    {
    //        _roleManager = roleManager;
    //        this._logger = _logger;
    //        this.userManager = userManager;
    //    }

    //    [HttpGet("GetAllRoles")]
    //    public async Task<IActionResult> GetAllRoles()
    //    {
    //        try
    //        {
    //            var roles = await _roleManager.Roles.ToListAsync();
    //            return Ok(roles);
    //        }
    //        catch (Exception ex)
    //        {
    //            _logger.LogError(ex.Message);
    //            Debug.WriteLine(ex.Message);
    //            return BadRequest("Cannot get roles.");
    //        }
    //    }
    //    [HttpPost("AddRole")]
    //    public async Task<IActionResult> AddRole(string roleName)
    //    {
    //        try
    //        {
    //            if (roleName != null)
    //            {
    //                await _roleManager.CreateAsync(new IdentityRole(roleName.Trim()));
    //                return Ok();
    //            }
    //            else
    //                throw new InvalidOperationException("Role not valid");
    //        }
    //        catch (Exception ex)
    //        {
    //            _logger.LogError(ex.Message);
    //            Debug.WriteLine(ex.Message);
    //            return BadRequest("Cannot add role.");
    //        }
    //    }

    //    [HttpPost("GetUsersRoles")]
    //    public async Task<IActionResult> GetUsersWithRolesAsync()
    //    {
    //        try
    //        {
    //            var currentUser = await userManager.GetUserAsync(HttpContext.User);
    //            var allUsersExceptCurrentUser = await userManager.Users.Where(a => a.Id != currentUser.Id).ToListAsync();
    //            var userRolesViewModel = new List<GetProfileModel>();
    //            foreach (ApplicationUser user in allUsersExceptCurrentUser)
    //            {
    //                var thisViewModel = new GetProfileModel();
    //                thisViewModel.Email = user.Email;
    //                thisViewModel.PhoneNumber = user.PhoneNumber;
    //                thisViewModel.Username = user.UserName;
    //                thisViewModel.ProfilePicture = user.ProfilePicture;
    //                thisViewModel.Role = await GetUserRoles(user);
    //                userRolesViewModel.Add(thisViewModel);
    //            }
    //            return Ok(userRolesViewModel);
    //        }
    //        catch (Exception ex)
    //        {
    //            _logger.LogError(ex.Message);
    //            Debug.WriteLine(ex.Message);
    //            return BadRequest("Cannot add role.");
    //        }
    //    }
    //    private async Task<List<string>> GetUserRoles(AppUser user)
    //    {
    //        return new List<string>(await userManager.GetRolesAsync(user));
    //    }
    //    [HttpGet("GetAllRolesExpectUserRole")]
    //    public async Task<IActionResult> GetAllRolesExpectUserRole(string email)
    //    {
    //        try
    //        {
    //            var viewModel = new List<string>();
    //            var user = await userManager.FindByEmailAsync(email);
    //            foreach (var role in _roleManager.Roles)
    //            {
    //                if (!await userManager.IsInRoleAsync(user, role.Name))
    //                {
    //                    viewModel.Add(role.Name);
    //                }
    //            }
    //            return Ok(viewModel);
    //        }
    //        catch (Exception ex)
    //        {
    //            _logger.LogError(ex.Message);
    //            Debug.WriteLine(ex.Message);
    //            return BadRequest();
    //        }
    //    }

    //    [HttpPost("ManageRoleUser")]
    //    public async Task<IActionResult> Manage(string role, string email)
    //    {
    //        try
    //        {
    //            var user = await userManager.FindByEmailAsync(email);
    //            if (user == null)
    //                return NotFound();
    //            var roles = await userManager.GetRolesAsync(user);
    //            var result = await userManager.RemoveFromRolesAsync(user, roles);
    //            if (!result.Succeeded)
    //                throw new InvalidOperationException("Cannot update Roles.");

    //            if (role.ToLower() == Authorization.Roles.Manager.ToString().ToLower())
    //                result = await userManager.AddToRoleAsync(user, Authorization.Roles.Administrator.ToString());
    //            else
    //                result = await userManager.AddToRoleAsync(user, Authorization.Roles.Manager.ToString());

    //            if (result.Succeeded)
    //                return Ok();
    //            else
    //                throw new InvalidOperationException("Cannot update Roles.");
    //        }
    //        catch (Exception ex)
    //        {
    //            _logger.LogError(ex.Message);
    //            Debug.WriteLine(ex.Message);
    //            return BadRequest();
    //        }
    //    }
    //}
}
