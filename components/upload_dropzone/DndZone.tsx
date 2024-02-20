"use client";
import {
    DialogContent,
    DialogDescription
} from "@/components/ui/dialog";
import { UploadCloud, FileImage } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "../ui/use-toast";

const DndZone = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const { startUpload } = useUploadThing("profilePicture");
    const { toast } = useToast();

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

    const onDrop = useCallback(async (acceptedFiles: any) => {
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

        return toast({
            title: "User Image Updated",
            description: "See the New Image Next Time you Login"
        })
    }, []);
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop });

    return (
        <DialogContent>
            <DialogDescription className="sm:max-w-[425px] p-2">
                <div {...getRootProps()} className="cursor-pointer border-2 border-black rounded-sm px-5 py-10 flex flex-col items-center hover:bg-zinc-100 transition-all ease-in-out duration-200">
                    <UploadCloud size="50px" />
                    <h2>Drag Image to Upload</h2>
                    <p>Drag 'n' drop some files here, or click to select files</p>
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
            </DialogDescription>
        </DialogContent>
    )
}

export default DndZone;