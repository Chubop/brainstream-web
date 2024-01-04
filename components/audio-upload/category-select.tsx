
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
            <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="What is this about?" />
            </SelectTrigger>
            <SelectContent className={cn("my-2 flex w-full flex-col justify-center rounded border border-gray-300 p-2 align-middle", className)}>
                <SelectItem value="General">
                    📄 General
                </SelectItem>
                <SelectItem value="Interview" className="flex flex-row items-center">
                    🎙️ Interview
                </SelectItem>
                <SelectItem value="Formal Meeting">
                    🏛️ Formal Meeting
                </SelectItem>
                <SelectItem value="Informal Meeting">
                    🍻 Informal Meeting
                </SelectItem> 
                <SelectItem value="Ramble">
                    🗣️ Ramble
                </SelectItem>
                <SelectItem value="Lecture">
                    🎓 Lecture
                </SelectItem>
            </SelectContent>
        </Select>
    )
}

export default CategorySelect;