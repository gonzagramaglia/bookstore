"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!res.ok) {
      const errorText = await res.text();

      throw new Error(`Request failed with status ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (err: any) {
    throw new Error(`Authentication request failed: ${err.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filepath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const handleError = (err: any) => {
    console.log(err);
    toast({
      title: "Image upload fail",
      description: `Your image could not be uploaded. Please try again`,
      variant: "destructive",
    });
  };
  const handleSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  return (
    <>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <IKUpload
          className="hidden"
          ref={ikUploadRef}
          onError={handleError}
          onSuccess={handleSuccess}
          fileName="test-upload.png"
        />
        <button
          className="upload-btn"
          style={{ background: "#232839" }}
          onClick={(e) => {
            e.preventDefault();
            if (ikUploadRef.current) {
              // @ts-ignore
              ikUploadRef.current?.click();
            }
          }}
        >
          <Image
            src="/icons/upload.svg"
            alt="upload-icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className="text-base text-light-100">Upload a File</p>
          {file && <p className="upload-filename">{file.filePath}</p>}
        </button>

        {file && (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        )}
      </ImageKitProvider>
    </>
  );
};

export default ImageUpload;
