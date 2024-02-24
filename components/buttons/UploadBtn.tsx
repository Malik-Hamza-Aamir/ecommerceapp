"use client";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "../ui/button";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";

interface Props {
    prodId: string;
}

export default function UploadBtn({ prodId }: Props) {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const { toast } = useToast();

    return (
        <Button size="sm" disabled={isUploading ? true : false}>
            {
                isUploading ? (
                    <div className="flex items-center justify-center">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Uploading Files
                    </div>
                ) : (
                    <UploadButton
                        endpoint="productImages"
                        onUploadProgress={() => {
                            setIsUploading(true);
                        }}
                        onClientUploadComplete={async res => {
                            // Do something with the response
                            setIsUploading(false);
                            console.log("Files: ", res);
                        }}
                        onUploadError={() => {
                            return toast({
                                variant: "destructive",
                                title: "Something went wrong!",
                                description: "An Error occured while uploading the files",
                            })
                        }}
                        appearance={{
                            button: "",
                            container: "",
                            allowedContent: "hidden"
                        }}
                        content={{
                            button({ ready }) {
                                if (ready) {
                                    return <div>Choose Files</div>;
                                }
                            },

                        }}
                    />
                )
            }


        </Button>
    );
}