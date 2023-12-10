import { Button } from "./button"
import { IconPlus } from "./icons";

type NewStreamButton = {
    children?: string;
}

const NewStreamButton: React.FC<NewStreamButton> = ({ children }) => {
    return(
        <Button variant={"ghost"} className="bg-background">
            <IconPlus className="mr-2" /> New Stream
        </Button>
    )
}

export default NewStreamButton;