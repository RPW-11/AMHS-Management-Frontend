import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'zh-TW';

type LanguageStore = {
    language: Language;
    setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageStore>()(
    persist(
        (set) => ({
            language: 'en',
            setLanguage: (language) => set(() => ({ language }))
        }),
        {
            name: 'language-storage'
        }
    )
);
