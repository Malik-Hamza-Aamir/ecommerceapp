import { Image } from 'lucide-react';
import UploadBtn from '../buttons/UploadBtn';

interface Props {
    prodId: string;
}

const NoProductImages = ({ prodId }: Props) => {
    return (
        <div className="border px-5 py-3 rounded-lg bg-[#fafafa] flex justify-between items-center">
            <div className="flex gap-4">
                <Image className="font-normal" />
                <div>
                    <strong className="text-md font-semibold">No Images Added Yet</strong>
                    <p className="text-sm">Add products images. Only 5 images are allowed at max.</p>
                </div>
            </div>
            <UploadBtn prodId={prodId} />
        </div>
    )
}

export default NoProductImages