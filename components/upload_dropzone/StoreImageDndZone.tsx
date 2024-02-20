"use client";
import { UploadCloud, FileImage } from 'lucide-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "../ui/use-toast";

interface Props {
    id: string;
}

const StoreImageDndZone = ({ id }: Props) => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [imgSrc, setImgSrc] = useState<string>("");
    const { toast } = useToast();
    const { startUpload } = useUploadThing("storePicture", {
        async onClientUploadComplete(res) {
            let storeImageId = res[0].serverData.id as string;
            setImgSrc(res[0].serverData.url);


            // const storeImage = await updateStoreIdImage(storeImageId, id);
        },
    });

    const startSimulatedProgress = () => {
        setUploadProgress(0)
        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval)
                    return prevProgress
                }
                return prevProgress + 5
            })
        }, 500)
        return interval
    }

    return (
        <Dropzone multiple={false} onDrop={async acceptedFiles => {
            setIsUploading(true);
            const progressInterval = startSimulatedProgress();
            const res = await startUpload(acceptedFiles)
            if (!res) {
                return toast({
                    title: 'Something went wrong',
                    description: 'Please try again later',
                    variant: 'destructive',
                })
            }

            const [fileResponse] = res;
            const key = fileResponse?.key;

            if (!key) {
                return toast({
                    title: 'Something went wrong',
                    description: 'Please try again later',
                    variant: 'destructive',
                })
            }
            clearInterval(progressInterval);
            setUploadProgress(100);

            // return toast({
            //     title: "Store Image Updated",
            //     description: "See the New Image Next Time you Login"
            // })
        }}>
            {({ getRootProps, getInputProps, acceptedFiles }) => (
                <section className="flex h-[15rem] mt-4 gap-2">
                    <div className="w-[30%] h-[100%] rounded-md bg-no-repeat bg-cover bg-[url('https://picsum.photos/300/300/?blur')]" />

                    <div {...getRootProps()} className="border rounded-md cursor-pointer w-[70%] flex flex-col justify-center items-center">
                        <UploadCloud size="50px" className='text-zinc-600' />
                        <h2 className='text-zinc-400'>Drag 'n' drop Image to Upload</h2>
                        <p className='text-zinc-400'>No need to click on update store button</p>
                        <p className='text-zinc-400'>When image is droped here it will be uploaded directly</p>
                        <input {...getInputProps()} />

                        {
                            isUploading ? (
                                <Progress value={uploadProgress} className="h-[6px] my-2" />
                            ) : null
                        }

                        {
                            acceptedFiles && acceptedFiles[0] ? (
                                <div className="flex justify-center border border-zinc-500 rounded-[3px]">
                                    <div className="p-1 border-r border-zinc-500 flex items-center justify-center">
                                        <FileImage size="15px" />
                                    </div>

                                    <h4 className="rounded-[3px] text-[13px] flex items-center justify-center text-zinc-600 px-2 py-1">
                                        {acceptedFiles[0].name}
                                    </h4>
                                </div>
                            ) : null
                        }
                    </div>
                </section>
            )}
        </Dropzone>
    )
}

export default StoreImageDndZone