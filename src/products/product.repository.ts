import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./schemas/product.schema";
import { Model } from "mongoose";
import { CreateProductPayload, PaginationPayload, UpdateProductPayload } from "./contracts/product.contracts";
import { User } from "src/users/schemas/user.schema";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>
    ) { }
    
    async create(data: CreateProductPayload, user: User): Promise<Product> {
        const existingProduct = await this.productModel.findOne({
          name: data.name,
        });
        if (existingProduct) {
          throw new ConflictException(
            'Product with provided name already exists. Choose another name.',
          );
        }
        const createdProduct = new this.productModel(data);
        createdProduct.user = user;
        return createdProduct.save();
      }
    
      async findAll(query: PaginationPayload): Promise<Product[]> {
        const limit = query.limit;
        const page = query.page;
        const skip = limit * (page - 1);
    
        return await this.productModel
          .find()
          .limit(limit)
          .skip(skip)
          .exec();
    }
    
    async findOne(_id: string): Promise<Product> {
        const document = await this.productModel.findOne({_id});
    
        if (!document) {
          throw new NotFoundException('Product not found.');
        }
    
        return document;
      }
    
    async update(_id: string, data: UpdateProductPayload, user: User): Promise<Product> {
          
        if (data.name) {
            const existingProduct = await this.productModel.findOne({
                name: data.name,
              });
              if (existingProduct) {
                throw new ConflictException(
                  'Product with provided name already exists. Choose another name.',
                );
              }
        }

        const product = await this.productModel.findOne({ _id }).populate('user');

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        if (product.user.email !== user.email) {
            throw new UnauthorizedException('Only owner of product can update product.')
        }

        const updatedProduct = await this.productModel.findByIdAndUpdate(_id, data, { new: true, lean: true });
        
        return updatedProduct;
      }
    
    async delete(_id: string, user: User) {
        const product = await this.productModel.findOne({ _id }).populate('user');

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        if (product.user.email !== user.email) {
            throw new UnauthorizedException('Only owner of product can update product.')
        }
    
        return await product.deleteOne();
      }
}