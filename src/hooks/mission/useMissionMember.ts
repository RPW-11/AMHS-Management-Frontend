"use client";

import { useUserStore } from "@/stores/useAuthStore";
import { AssignedEmployee, ChangeMemberRoleRequest } from "@/types/mission";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { UnauthorizedError, useUnauthorized } from "../useUnauthorized";

export const useMissionMember = (missionId: string) => {
    const { user, isHydrated } = useUserStore();
    const [missionMembers, setMissionMembers] = useState<AssignedEmployee[]>(
        []
    );
    const [isFetchingMembers, setIsFetchingMembers] = useState<boolean>(true);

    const handleUnauthorized = useUnauthorized();

    const fetchMissionMembers = useCallback(async (missionId: string) => {
        setIsFetchingMembers(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}/members`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );

            if (response.status === 401) {
                handleUnauthorized();
            }

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.title);
            }

            setMissionMembers(data);
        } catch (error) {
            if (error instanceof UnauthorizedError) return;
            toast.error((error as Error).message);
        } finally {
            setIsFetchingMembers(false);
        }
    }, [user?.token, handleUnauthorized]);

    const addMemberToMissionHandler = useCallback(
        async (memberId: string, missionId: string) => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}/members/add/${memberId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user?.token}`,
                        },
                    }
                );

                if (response.status === 401) {
                    handleUnauthorized();
                }

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.title);
                }

                // refetch
                fetchMissionMembers(missionId);
            } catch (error) {
                throw error;
            }
        },
        [user?.token, handleUnauthorized, fetchMissionMembers]
    );

    const deleteMemberFromMissionHandler = useCallback(
        async (memberId: string, missionId: string) => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}/members/delete/${memberId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user?.token}`,
                        },
                    }
                );

                if (response.status === 401) {
                    handleUnauthorized();
                }

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.title);
                }

                // refetch
                fetchMissionMembers(missionId);
            } catch (error) {
                throw error;
            }
        },
        [user?.token, handleUnauthorized, fetchMissionMembers]
    );

    const changeMemberRoleHandler = useCallback(
        async (
            memberId: string,
            missionId: string,
            changeMemberRoleRequest: ChangeMemberRoleRequest
        ) => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}/members/changeRole/${memberId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user?.token}`,
                        },
                        body: JSON.stringify(changeMemberRoleRequest),
                    }
                );

                if (response.status === 401) {
                    handleUnauthorized();
                }

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.title);
                }

                // refetch
                fetchMissionMembers(missionId);
            } catch (error) {
                throw error;
            }
        },
        [user?.token, handleUnauthorized, fetchMissionMembers]
    );

    const addMemberToMission = (memberId: string) =>
        toast.promise(addMemberToMissionHandler(memberId, missionId), {
            loading: "Adding a member...",
            success: "Member added successfully",
            error: (error) => (error as Error).message,
        });

    const deleteMemberFromMission = (memberId: string) =>
        toast.promise(deleteMemberFromMissionHandler(memberId, missionId), {
            loading: "Deleting a member...",
            success: "Member deleted successfully",
            error: (error) => (error as Error).message,
        });

    const changeMemberRole = (
        memberId: string,
        changeMemberRoleRequest: ChangeMemberRoleRequest
    ) =>
        toast.promise(
            changeMemberRoleHandler(memberId, missionId, changeMemberRoleRequest),
            {
                loading: "Changing member's role...",
                success: "Member's role changed successfully",
                error: (error) => (error as Error).message,
            }
        );

    useEffect(() => {
        if (isHydrated && missionId) {
            fetchMissionMembers(missionId);
        }
    }, [isHydrated, missionId, fetchMissionMembers]);

    return {
        missionMembers,
        isFetchingMembers,
        addMemberToMission,
        deleteMemberFromMission,
        changeMemberRole,
    };
};
