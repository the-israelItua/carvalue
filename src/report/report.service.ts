import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { report } from 'process';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}
  create(body: CreateReportDto, user: User) {
    const newReport = this.reportRepository.create(body);
    newReport.user = user;
    return this.reportRepository.save(newReport);
  }

  fetch() {
    return this.reportRepository.find();
  }

  async updateApproval(id: number, approved: boolean) {
    const report = await this.reportRepository.findOne({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;
    return this.reportRepository.save(report);
  }

  createEstimate(estimate: GetEstimateDto){
    return this.reportRepository.createQueryBuilder()
      .select("*")
      .where("make = :make", {make: estimate.make})
      .andWhere("model = :model", {model: estimate.model})
      .getRawMany()
  }
}
