using System.Collections.Generic;
using System.Threading.Tasks;

namespace PMS_API.Services.Classses
{
    public interface ITaskService
    {
        Task<IEnumerable<Entites.Task>> GetAllTasks();
        Task<Entites.Task> GetTask(int id);
        Task PutTask(Entites.Task task);
        Task<Entites.Task> CreateTask(Entites.Task task);
        Task DeleteTask(Entites.Task task);
        bool TaskExists(int id);
    }
}
