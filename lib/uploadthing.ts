import { generateReactHelpers } from "@uploadthing/react/hooks";
import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
export const { UploadButton } = generateComponents<OurFileRouter>();
