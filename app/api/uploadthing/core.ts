import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  profilePicture: f(["image"])
    .middleware(({ req }) => {
      return {};
    })
    .onUploadComplete((data) => {
      console.log("file", data);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
