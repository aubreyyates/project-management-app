using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectManagementApp.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public string Size { get; set; }
        public int PercentageComplete { get; set; }
        [ForeignKey(nameof(User))]
        public string UserId { get; set; }
        public User? User { get; set; }
    }
}
