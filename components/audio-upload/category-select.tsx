
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FC, SetStateAction } from "react";

type CategorySelectProps = {
    setCategory: React.Dispatch<SetStateAction<string>>
    className?: string;
};

const CategorySelect: FC<CategorySelectProps> = ({ setCategory, className }) => {

    const onValueChange = (value: string) => {
        console.log("New category:", value);
        setCategory(value);
    }

    return(
        <Select onValueChange={onValueChange}>
            <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="What is this about?" />
            </SelectTrigger>
            <SelectContent className={cn("w-full flex flex-col align-middle justify-center my-2 p-2 border border-gray-300 rounded", className)}>
                <SelectItem value="General">
                    📄 General
                </SelectItem>
                <SelectItem value="interview" className="flex flex-row items-center" disabled>
                    🎙️ Interview
                </SelectItem>
                <SelectItem value="formal_meeting" disabled>
                    🏛️ Formal Meeting
                </SelectItem>
                <SelectItem value="informal_meeting" disabled>
                    🍻 Informal Meeting
                </SelectItem> 
                <SelectItem value="ramble" disabled>
                    🗣️ Ramble
                </SelectItem>
                <SelectItem value="lecture" disabled>
                    🎓 Lecture
                </SelectItem>
            </SelectContent>
        </Select>
    )
}

export default CategorySelect;