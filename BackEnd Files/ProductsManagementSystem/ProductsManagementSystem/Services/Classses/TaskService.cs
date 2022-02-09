using Microsoft.EntityFrameworkCore;
using PMS_API.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS_API.Services.Classses
{
    public class TaskService : ITaskService
    {
        private readonly AppDBContext _context;

        public TaskService(AppDBContext _context)
        {
            this._context = _context;
        }

        public async Task<IEnumerable<Entites.Task>> GetAllTasks()
        {
            return await _context.Tasks.Include(x => x.Project).ToListAsync();
        }

        public async Task<Entites.Task> GetTask(int id)
        {
            return await _context.Tasks.Include(x => x.Project).FirstOrDefaultAsync(x => x.Id == id); ;
        }

        public async Task<Entites.Task> CreateTask(Entites.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task DeleteTask(Entites.Task task)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }

        public async Task PutTask(Entites.Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
