import { Card } from "./ui/card"

type CardButtonProps = {
    children: React.ReactNode,
    title?: string,
    icon?: React.ReactNode,
}

export default function CardButton({children, title, icon}: CardButtonProps){
    return(
        <div className="w-auto">
            <Card className="h-48 w-auto cursor-pointer p-4 transition duration-150 ease-in-out hover:bg-neutral-800">
                <div className="align-center flex items-center space-x-4 text-lg font-bold">
                    {title}
                    <span className="ml-1">{icon}</span>
                </div>
                <hr className="my-1 w-full" />
                <div className="italic">
                    {children}
                </div>
            </Card>
        </div>
    )
}
