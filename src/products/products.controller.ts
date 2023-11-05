import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { ProductsResponseDTO } from './dtos/product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }
   
    @ApiOperation({ summary: 'Create new product.' })
    @ApiCreatedResponse({ description: 'Product created succesfully.' })
    @UseGuards(AuthGuard)    
    @Post('')
    createProduct(
        @Body() createProductDto: CreateProductDto,
        @Request() req,
    ): Promise<Product> {
        return this.productService.create(createProductDto, req.user.email);
        
    }

    @ApiOperation({ summary: 'Return list of all products.' })
    @ApiOkResponse({ description: 'Products were returned successfully.' })
    @UseGuards(AuthGuard)
    @Get()
    async getAllProducts(
      @Query() query: PaginationDto,
    ): Promise<ProductsResponseDTO> {
      const products = await this.productService.findAll(query);
      return new ProductsResponseDTO(products, {
        limit: query.limit,
        page: query.page,
      });
    }

    @ApiOperation({ summary: 'Find a product.' })
    @ApiNotFoundResponse({
      description: 'Nothing to return.',
    })
    @ApiOkResponse({ description: 'Product was successfuly found.' })
    @UseGuards(AuthGuard)
    @Get(':id')
    getProduct(
      @Param('id') id: string,
    ): Promise<Product> {
      return this.productService.findOne(id);
    }

    @ApiOperation({ summary: 'Update existing product.' })
    @ApiNotFoundResponse({
      description: 'Nothing to update.',
    })
    @ApiConflictResponse({description: 'Not the owner of product'})
    @UseGuards(AuthGuard)
    @Patch(':id')
    updateProduct(
      @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
      @Request() req,
    ): Promise<Product> {
      return this.productService.update(id, updateProductDto, req);
    }

    @ApiOperation({ summary: 'Delete a product.' })
    @ApiNotFoundResponse({
      description: 'Nothing to delete.',
    })
    @ApiOkResponse({ description: 'Product was successfuly deleted.' })
    @ApiConflictResponse({description: 'Not the owner of product'})
    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteProduct(@Param('id') id: string, @Request() req): Promise<Product> {
      return this.productService.delete(id, req);
    }
}
