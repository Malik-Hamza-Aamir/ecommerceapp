"use client";
import { UploadCloud, FileImage } from 'lucide-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "../ui/use-toast";
import {
    updateStoreImageAction,
    checkImageLinkWithStoreAction,
    createStoreImageAction
} from '@/app/_actions/actions';
import Image from 'next/image';

interface Props {
    id: string;
    url: string | undefined;
}

const StoreImageDndZone = ({ id, url }: Props) => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [imgSrc, setImgSrc] = useState<string>(url !== undefined ? url : "");
    const placeHolderImage = "https://picsum.photos/300/300/?blur";
    const { toast } = useToast();

    const { startUpload } = useUploadThing("storePicture", {
        async onClientUploadComplete(res) {
            const key = res[0].serverData.key as string;
            const url = res[0].serverData.url as string;
            const storeId = id as string;
            let storeImageId: string = "";

            const storeImage = await checkImageLinkWithStoreAction(storeId);

            if (storeImage.isLinked === true) {
                storeImageId = storeImage.storeImage?.id as string;
                const isUpdated = await updateStoreImageAction(storeImageId, storeId, key, url);

                if (isUpdated.message) {
                    setImgSrc(url);
                    return toast({
                        title: isUpdated.message,
                        description: "Store Image has been successfully updated"
                    })
                }

                if (isUpdated.error) {
                    return toast({
                        variant: "destructive",
                        title: isUpdated.error,
                        description: "Some issue occured during storeImage Updation"
                    })
                }


            } else if (storeImage.isLinked === false) {
                const isStoreImageCreated = await createStoreImageAction(storeId, key, url);
                if (isStoreImageCreated.message) {
                    setImgSrc(url);
                    return toast({
                        title: isStoreImageCreated.message,
                        description: "Store Image has been successfully added"
                    })
                }

                if (isStoreImageCreated.error) {
                    return toast({
                        variant: "destructive",
                        title: isStoreImageCreated.error,
                        description: "Some issue occured during storeImage creation"
                    })
                }
            }
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
        }}>
            {({ getRootProps, getInputProps, acceptedFiles }) => (
                <section className="flex h-[15rem] mt-4 gap-2">
                    <Image
                        src={imgSrc !== "" ? imgSrc : placeHolderImage}
                        alt='store image'
                        width={1280}
                        height={1024}
                        className='w-[30%] h-[100%] rounded-md'
                    />

                    <div {...getRootProps()} className="border rounded-md cursor-pointer w-[70%] flex flex-col justify-center items-center px-5">
                        <UploadCloud size="50px" className='text-zinc-600' />
                        <input {...getInputProps()} />

                        {
                            isUploading ? (
                                <>
                                    <h2 className='text-zinc-500'>Wait while the image is uploading...</h2>
                                    <Progress value={uploadProgress} className="h-[6px] my-2" />
                                </>
                            ) : (
                                <>
                                    <h2 className='text-zinc-400'>Drag 'n' drop Image to Upload</h2>
                                    <p className='text-zinc-400'>No need to click on update store button</p>
                                    <p className='text-zinc-400'>When image is droped here it will be uploaded directly</p>
                                </>
                            )
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