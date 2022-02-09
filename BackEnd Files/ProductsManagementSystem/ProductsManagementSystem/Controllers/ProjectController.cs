using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PMS_API.Entites;
using PMS_API.Services.Interfaces;

namespace PMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService _projectService)
        {
            this._projectService = _projectService;
        }

        // GET: api/Project
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> Get()
        {
            try
            {
                return Ok(await _projectService.GetAllProjects());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // GET: api/Project/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            try
            {
                var project = await _projectService.GetProject(id);
                if (project == null)
                {
                    return NotFound();
                }

                return project;
            }
            catch (Exception ex)
            {
                return BadRequest();
            }           
        }

        // POST: api/Project
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            try
            {
                project.CreatedDate = DateTime.Now;
                await _projectService.CreateProject(project);
                return CreatedAtAction("GetProject", new { id = project.Id }, project);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // PUT: api/Project/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }
            try
            {
                await _projectService.PutProject(project);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_projectService.ProjectExists(id))
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
       
        // DELETE: api/Project/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Invalid id");

                var project = await _projectService.GetProject(id);
                if (project == null)
                {
                    return NotFound();
                }

                await _projectService.DeleteProject(project);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }                       
        }       
    }
}
