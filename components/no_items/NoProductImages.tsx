import { Image } from 'lucide-react';
import UploadBtn from '../buttons/UploadBtn';

interface Props {
    prodId: string;
    id: string;
}

const NoProductImages = ({ prodId, id }: Props) => {
    return (
        <div className="border px-5 py-3 rounded-lg bg-[#fafafa] flex justify-between items-center">
            <div className="flex gap-4">
                <Image className="font-normal" />
                <div>
                    <strong className="text-md font-semibold">No Images Added Yet</strong>
                    <p className="text-sm">Add products images. Only 5 images are allowed at max.</p>
                </div>
            </div>
            <UploadBtn prodId={prodId} id={id} />
        </div>
    )
}

export default NoProductImages