namespace ProjectManagementApp.Models.DTOs
{
    public class ProjectDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public string Size { get; set; }
        public int PercentageComplete { get; set; }
    }
}
