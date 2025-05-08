export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}


export interface BaseFilter {
  page?: number;
  size?: number;
} 