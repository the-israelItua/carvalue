import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
    constructor( @InjectRepository(Report) private reportRepository: Repository<Report> ){}
    create(body: CreateReportDto){
        const newReport = this.reportRepository.create(body)
        return this.reportRepository.save(newReport)
    }
}
