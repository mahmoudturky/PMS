using Microsoft.AspNetCore.Identity;

namespace PMS_API
{
    public class UserAndRoleDataInitializer
    {
        public static void SeedData(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        private static void SeedUsers(UserManager<IdentityUser> userManager)
        {
            if (userManager.FindByEmailAsync("admin@localhost.com").Result == null)
            {
                IdentityUser user = new IdentityUser();
                user.UserName = "admin";
                user.Email = "admin@localhost.com";

                IdentityResult result = userManager.CreateAsync(user, "P@ssw0rd1!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, Enums.Roles.Administrator.ToString()).Wait();
                }
            }
        }

        private static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync(Enums.Roles.Administrator.ToString()).Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = Enums.Roles.Administrator.ToString();
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync(Enums.Roles.Manager.ToString()).Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = Enums.Roles.Manager.ToString();
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync(Enums.Roles.Employee.ToString()).Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = Enums.Roles.Employee.ToString();
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }
        }
    }
}
