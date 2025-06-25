import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { getFileValidator } from 'src/utils/image-file.validator';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private CategoriesService: CategoriesService) {
    }

    @HasRoles(JwtRole.ADMIN, JwtRole.WORKER)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get()
    findAll() {
        return this.CategoriesService.findAll();
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Post() // hhtp://localhost:3000/categories POST
    @UseInterceptors(FileInterceptor('file'))
    createWithImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                    //new FileTypeValidator({ fileType: /^image/ }),
                ],
            }),
            getFileValidator(),
        )
        file: Express.Multer.File,
        @Body() category: CreateCategoryDto) {
        //console.log(file);
        return this.CategoriesService.create(file, category);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id') // hhtp://localhost:3000/categories PUT
    update(@Param('id', ParseIntPipe) id: number,@Body() category: UpdateCategoryDto){
        return this.CategoriesService.update(id,category);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put('upload/:id') // hhtp://localhost:3000/categories POST
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
                    //new FileTypeValidator({ fileType: /^image/ }),
                ],
            }),
            getFileValidator(),
        )
        file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number,
        @Body() category: UpdateCategoryDto) {
        //console.log(file);
        return this.CategoriesService.updateWithImage(file, id, category);
    }

    @HasRoles(JwtRole.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Delete(':id') // hhtp://localhost:3000/categories Delete
    delete(@Param('id', ParseIntPipe) id: number){
        return this.CategoriesService.delete(id);
    }
}
