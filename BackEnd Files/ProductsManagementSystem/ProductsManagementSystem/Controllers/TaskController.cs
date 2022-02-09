using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PMS_API.Services.Classses;

namespace PMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService _taskService)
        {
            this._taskService = _taskService;
        }

        // GET: api/Task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entites.Task>>> Get()
        {
            try
            {
                return Ok(await _taskService.GetAllTasks());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Entites.Task>> GetTask(int id)
        {
            try
            {
                var task = await _taskService.GetTask(id);
                if (task == null)
                {
                    return NotFound();
                }

                return task;
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<Entites.Task>> PostTask(Entites.Task task)
        {
            try
            {
                task.CreatedDate = DateTime.Now;
                await _taskService.CreateTask(task);
                return CreatedAtAction("Gettask", new { id = task.Id }, task);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, Entites.Task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }
            try
            {
                await _taskService.PutTask(task);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_taskService.TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }

            return Ok();
        }

        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Invalid id");

                var task = await _taskService.GetTask(id);
                if (task == null)
                {
                    return NotFound();
                }

                await _taskService.DeleteTask(task);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
