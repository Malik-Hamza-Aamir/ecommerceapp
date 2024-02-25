"use client";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "../ui/button";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";
import { addProductImagesAction } from "@/app/_actions/actions";

interface Props {
    prodId: string;
    id: string;
}

export default function UploadBtn({ prodId, id }: Props) {
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
                        onClientUploadComplete={async (res) => {
                            const data = res.map((d) => {
                                return {
                                    url: d.serverData.url,
                                    key: d.serverData.key,
                                    productId: prodId,
                                    uploadStatus: "SUCCESS",
                                    imageType: "SECONDARY"
                                }
                            })

                            const addImage = await addProductImagesAction(data, prodId, id);

                            if (addImage?.message) {
                                toast({
                                    title: addImage.message,
                                    description: "Product Images has been added successfully"
                                })
                            } else if (addImage?.error) {
                                toast({
                                    variant: "destructive",
                                    title: addImage.error,
                                    description: "Something went wrong during adding product images"
                                })
                            }

                            setIsUploading(false);
                        }}
                        onUploadError={() => {
                            return toast({
                                variant: "destructive",
                                title: "Something went wrong!",
                                description: "An Error occured while uploading the files",
                            })
                        }}
                        appearance={{
                            button: "bg-black h-[70%]",
                            container: "",
                            allowedContent: "hidden"
                        }}
                        content={{
                            button({ ready }) {
                                if (ready) {
                                    return "Choose Files";
                                }
                            },

                        }}
                    />
                )
            }


        </Button>
    );
}