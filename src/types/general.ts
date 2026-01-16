export type Option = {
    name: string;
    value: string;
}

export interface NotificationData {
    id: string;
    userName: string;
    description: string;
    dayWithTime: string;
    date: string;
    isRead: boolean;
}

export interface PaginatedResponse<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
}

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    imgUrl?: string;
    position: string;
    token?: string;
}

export interface ApiError {
    title: string;
    details?: string;
}