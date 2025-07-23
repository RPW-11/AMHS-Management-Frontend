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