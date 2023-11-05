import { PaginationPayload } from "../contracts/product.contracts";
import { Product } from "../schemas/product.schema";
import { PaginationResponseDTO } from "./pagination.response.dto";

export class ProductDTO {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  
    constructor(product) {
      this._id = product._id;
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
      this.quantity = product.quantity; 
    }
  }
  
  export class ProductsResponseDTO {
    data: ProductDTO[];
    pagination: PaginationResponseDTO;
  
    constructor(products: Product[], { limit, page }: PaginationPayload) {
      this.data = products.map((product) => new ProductDTO(product));
      this.pagination = new PaginationResponseDTO(limit, page);
    }
  }