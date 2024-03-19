﻿using System.ComponentModel.DataAnnotations;

namespace ArtworkSharingPlatform.DataTransferLayer
{
	public class ArtworkToAddDTO
    {
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "ReleaseCount must be greater than or equal to 0")]
        public int ReleaseCount { get; set; }
        [Required]
        public int OwnerId { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public int GenreId { get; set; }
        public byte Status { get; set; }
        public List<ArtworkImageToAddDTO> ArtworkImages { get; set; }
    }
}
