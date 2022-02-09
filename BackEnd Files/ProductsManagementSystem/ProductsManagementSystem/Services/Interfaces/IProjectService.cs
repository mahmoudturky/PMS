using PMS_API.Entites;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PMS_API.Services.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project> GetProject(int id);
        System.Threading.Tasks.Task PutProject(Project project);
        Task<Project> CreateProject(Project project);
        System.Threading.Tasks.Task DeleteProject(Project project);
        bool ProjectExists(int id);
    }
}
