using ProjectManagementApp.Models.DTOs;
using ProjectManagementApp.Models.Entities;

namespace ProjectManagementApp.Extensions.Models.DTOs
{
    public static class ProjectDTOExtensions
    {
        public static Project ToProject(this ProjectDTO projectDTO, Project? project = null)
        {
            project ??= new Project();

            project.Name = projectDTO.Name;
            project.Description = projectDTO.Description;
            project.Size = projectDTO.Size;
            project.PercentageComplete = projectDTO.PercentageComplete;
            project.Priority = projectDTO.Priority;

            return project;
        }
    }
}
