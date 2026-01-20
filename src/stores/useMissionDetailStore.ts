import { MissionDetail } from '@/types/mission';
import { create } from 'zustand';

type MissionDetailStore = {
    mission: MissionDetail | null
    refetchFlag: boolean
    triggerRefetch: () => void
    onMissionChange: (newMission: MissionDetail) => void
}

export const useMissionDetailStore  = create<MissionDetailStore>((set) => ({
    mission: null,
    refetchFlag: false,
    triggerRefetch () {
        set((state) => ({...state, refetchFlag: !state.refetchFlag}))
    },
    onMissionChange(newMission) {
        set((state) => ({...state, mission: newMission}))
    },
}))