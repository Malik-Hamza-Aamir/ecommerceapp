import Link from "next/link"
import { Plus } from 'lucide-react'

type Props = {
    hrefSrc: string;
    text: string;
}

const AddProfileBtn = ({ hrefSrc, text }: Props) => {
    return (
        <Link href={hrefSrc} className="flex gap-2 items-center text-[#5777f2] hover:bg-[#5776f242] rounded-md px-3 py-1">
            <Plus size={16} color="#5777f2" />
            <h6 className="font-normal text-[15px]">{text}</h6>
        </Link>
    )
}

export default AddProfileBtn