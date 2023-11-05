import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { ProductRepository } from './product.repository';
import { CreateProductPayload, PaginationPayload, UpdateProductPayload } from './contracts/product.contracts';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productRepository: ProductRepository,
        private usersService: UsersService
    ) { }
    
    async findAll(query: PaginationPayload): Promise<Product[]> {
        return await this.productRepository.findAll(query);
      }
    
    async create(data: CreateProductPayload, email: string): Promise<Product> {
        const user = await this.usersService.getUserByEmail(email);
        return await this.productRepository.create(data, user);
      }
    
      async findOne(_id: string): Promise<Product> {
        return await this.productRepository.findOne(_id);
      }
    
    async update(_id: string, data: UpdateProductPayload, req: any): Promise<Product> {
        const user = await this.usersService.getUserByEmail(req.user.email);

        return await this.productRepository.update(_id, data, user);
      }
    
    async delete(_id: string, req: any): Promise<Product> {
        const user = await this.usersService.getUserByEmail(req.user.email);

        return await this.productRepository.delete(_id, user);
      }
    

}
