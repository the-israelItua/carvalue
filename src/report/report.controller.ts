import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportService } from './report.service';

@Controller('report')
@UseGuards(AuthGuard)
export class ReportController {
    constructor(private reportService: ReportService){}
    @Post()
    createReport(@Body() body: CreateReportDto){
        this.reportService.create(body)
    }
}
