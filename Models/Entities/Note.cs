using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectManagementApp.Models.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public string Content { get; set; }
        [ForeignKey(nameof(Project))]
        public int ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}
