import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconBriefcase, IconGlobe, IconRocket } from "../ui/icons";

const CategorySelect = () => {
    return(
        <Select>
            <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="What is this about?" />
            </SelectTrigger>
            <SelectContent className='w-full flex flex-col align-middle justify-center my-2 p-2 border border-gray-300 rounded'>
                <SelectItem value="1" className="flex flex-row items-center">
                    🎙️ Interview
                </SelectItem>
                <SelectItem value="2">
                    🏛️ Formal Meeting
                </SelectItem>
                <SelectItem value="3">
                    🍻 Informal Meeting
                </SelectItem> 
                <SelectItem value="4">
                    🗣️ Ramble
                </SelectItem>
                <SelectItem value="5">
                    🎓 Lecture
                </SelectItem>
                <SelectItem value="6">
                    📄 General
                </SelectItem>
            </SelectContent>
        </Select>
    )
}

export default CategorySelect;