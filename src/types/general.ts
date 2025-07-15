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
    firstName: string;
    lastName: string;
    imgUrl?: string;
    position: string;
}