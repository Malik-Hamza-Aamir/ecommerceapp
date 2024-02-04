import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { db } from "@/app/db";

const f = createUploadthing();

export const ourFileRouter = {
  profilePicture: f(["image"])
    .middleware(async ({ req }) => {
      const session = await getServerSession(options);
      if (!session || !session?.user) {
        throw new Error("Unauthorized");
      }

      return { userId: session?.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { key } = file;
      let response: { message: string; status: null | number } = {
        message: "",
        status: null,
      };

      const img = await db.user.findUnique({
        where: {
          id: metadata.userId,
        },
      });

      if (img?.userImageId === null || img?.userImageId === "") {
        const userImage = await db.userImage.create({
          data: {
            uploadStatus: "SUCCESS",
            url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
            key: key,
            userId: metadata.userId,
          },
        });

        if (!userImage) {
          response.message = "Image Upload Unsuccessful";
          response.status = 500;
        }

        if (userImage) {
          const userData = await db.user.update({
            where: {
              id: metadata.userId,
            },
            data: {
              userImageId: userImage.id,
            },
          });

          if (!userData) {
            console.log("updating the user failed :", userData);
          } else {
            console.log("updating the user successful :", userData);
          }

          response.message = "Image Uploaded Successfully";
          response.status = 200;
        }
      } else {
        const userImage = await db.userImage.update({
          where: {
            id: img?.userImageId,
          },
          data: {
            url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
            key: key,
          },
        });

        if (!userImage) {
          response.message = "Image Upload Unsuccessful";
          response.status = 500;
        }
      }

      return response;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
