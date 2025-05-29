// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const { filePath } = await req.json();

  return new Promise<NextResponse>((resolve) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: "hr-management/uploads" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          resolve(
            NextResponse.json({ error: "Upload failed" }, { status: 500 })
          );
        } else if (result && result.secure_url) {
          resolve(
            NextResponse.json({ url: result.secure_url }, { status: 201 })
          );
        } else {
          resolve(
            NextResponse.json(
              { error: "No URL returned from Cloudinary" },
              { status: 500 }
            )
          );
        }
      }
    );
  });
}
