export class PaginationResponseDTO {
    limit: number;
    page: number;
  
    constructor(limit: number, page: number) {
      this.limit = limit;
      this.page = page;
    }
  }
  