import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportDto } from './dtos/report.dto';
import { Report } from './report.entity';
import { ReportService } from './report.service';

@Controller('report')
@UseGuards(AuthGuard)
export class ReportController {
    constructor(private reportService: ReportService){}
    @Post()
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportService.create(body, user)
    }

    @Patch("/:id")
    @UseGuards(AdminGuard)
    approveReport(@Param("id") id: number, @Body() body: ApproveReportDto ){
        return  this.reportService.updateApproval(id, body.approved)
    }

    @Get()
    fetch(){
        return  this.reportService.fetch()
    }

    @Get("/get-estimate")
    getEstimate(@Query() query: GetEstimateDto){
        return this.reportService.createEstimate(query)
    }
}
