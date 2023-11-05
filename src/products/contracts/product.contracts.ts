export type CreateProductPayload = {
    name: string;
    description?: string;
    price: number;
    quantity: number;
};

export type UpdateProductPayload = {
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
};

export type PaginationPayload = {
    limit: number;
    page: number;
};