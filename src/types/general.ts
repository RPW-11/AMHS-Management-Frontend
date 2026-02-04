import { LucideIcon } from "lucide-react";

export type Option = {
    name: string;
    value: string;
}

export type SidebarItemType = {
    name: string;
    icon: LucideIcon;
    path: string;
}

export interface NotificationData {
    id: string;
    actorAvatarUrl?: string;
    actorName: string;
    message: string;
    targetType: string;
    targetId: string;
    isRead: boolean;
    createdAt: string;
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