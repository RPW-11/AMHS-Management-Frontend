"use client"
import { Check, Languages } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Language, useLanguageStore } from "@/stores/useLanguageStore";

const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
    { value: "en", label: "English" },
    { value: "zh-TW", label: "繁體中文" },
];

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguageStore();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="text-muted-foreground">
                    <Languages />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1">
                {LANGUAGE_OPTIONS.map((option) => (
                    <Button
                        key={option.value}
                        onClick={() => setLanguage(option.value)}
                        variant={"ghost"}
                        size={"sm"}
                        className="w-full font-normal justify-between"
                    >
                        {option.label}
                        {language === option.value && <Check className="size-4" />}
                    </Button>
                ))}
            </PopoverContent>
        </Popover>
    )
}

export default LanguageSwitcher;
