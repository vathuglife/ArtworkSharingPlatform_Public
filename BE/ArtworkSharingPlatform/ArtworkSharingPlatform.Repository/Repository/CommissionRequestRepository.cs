﻿using ArtworkSharingPlatform.Domain.Entities.Commissions;
using ArtworkSharingPlatform.Domain.Migrations;
using ArtworkSharingPlatform.Repository.Interfaces;

namespace ArtworkSharingPlatform.Repository.Repository;

public class CommissionRequestRepository:ICommissionRequestRepository
{
    private ArtworkSharingPlatformDbContext _dbContext;

    public CommissionRequestRepository(ArtworkSharingPlatformDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void Insert(CommissionRequest commissionRequest)
    {
        _dbContext.CommissionRequests.Add(commissionRequest);
        _dbContext.SaveChanges();
    }

    public CommissionRequest GetById(int id)
    {
        return _dbContext.CommissionRequests.Find(id)!;
    }

    public void Update(CommissionRequest commissionRequest)
    {
        _dbContext.Update(commissionRequest);
        _dbContext.SaveChanges();
    }
}