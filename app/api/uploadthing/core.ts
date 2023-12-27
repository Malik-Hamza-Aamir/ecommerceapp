// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { getServerSession } from "next-auth";
// import { options } from "../auth/[...nextauth]/options";

// const f = createUploadthing();

// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: "4MB" } })
//     .middleware(async ({ req }) => {
//       const session = await getServerSession(options);

//       if (!session) {
//         throw new Error("Unauthorized");
//       }

//       return { userId: session?.user?.id };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {}),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
