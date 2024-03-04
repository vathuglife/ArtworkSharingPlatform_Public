﻿using ArtworkSharingPlatform.Domain.Entities.Artworks;
using ArtworkSharingPlatform.Domain.Entities.Orders;

namespace ArtworkSharingPlatform.Domain.Entities.Users;

public class Audience : User
{
    public int CreditRemaining { get; set; }
}