import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
const uploadToCloudinary = require('../utils/cloud_storage');


@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category) private categoriesRepository: Repository<Category>
    ) { }

    findAll() {
        return this.categoriesRepository.find();
    }

    async create(file: Express.Multer.File, category: CreateCategoryDto) {

        let newCategory = this.categoriesRepository.create(category);
        const url = await uploadToCloudinary(file);

        if (url === undefined && url === null) {
            throw new HttpException('La Imagen no se pudo Guardar', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        newCategory.image = url;

        return this.categoriesRepository.save(newCategory);
    }

    async updateWithImage(file: Express.Multer.File, id: number, category: UpdateCategoryDto) {


        const url = await uploadToCloudinary(file);

        if (url === undefined && url === null) {
            throw new HttpException('La Imagen no se pudo Guardar', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const categoryFound = await this.categoriesRepository.findOneBy({ id: id });

        if (!categoryFound) {
            throw new HttpException('La categoria no existe', HttpStatus.NOT_FOUND);
        }

        category.image = url;
        const updatedCategory = Object.assign(categoryFound, category);
        return this.categoriesRepository.save(updatedCategory);
    }

    async update(id: number, category: UpdateCategoryDto) {

        const categoryFound = await this.categoriesRepository.findOneBy({ id: id });

        if (!categoryFound) {
            throw new HttpException('La categoria no existe', HttpStatus.NOT_FOUND);
        }


        const updatedCategory = Object.assign(categoryFound, category);
        return this.categoriesRepository.save(updatedCategory);
    }

    async delete(id: number) {
        const categoryFound = await this.categoriesRepository.findOneBy({id:id});
        if (!categoryFound) {
            throw new HttpException('La categoria no existe', HttpStatus.NOT_FOUND);
        }

        return this.categoriesRepository.delete(id);
    }
}
