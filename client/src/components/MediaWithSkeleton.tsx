import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import MediaPreviewModal from "./MediaPreviewModal";

export function MediaWithSkeleton({ src }: { src: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full aspect-video">
      {/* Skeleton or error placeholder */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300 animate-pulse rounded-lg z-10">
          {hasError ? (
            <span className="text-gray-500">Image failed to load</span>
          ) : null}
        </div>
      )}

      <Modal>
        <Modal.Open opens="preview">
          <div
            className="relative w-full h-full cursor-pointer aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt="Chat media"
              fill
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`rounded-lg object-cover border transition-opacity duration-300 ${
                isLoaded && !hasError ? "opacity-100" : "opacity-0"
              }`}
              unoptimized
            />
          </div>
        </Modal.Open>
        <Modal.Window
          name="preview"
          className="bg-transparent w-[100%] lg:w-[80%] xl:w-[70%] h-auto shadow-none"
        >
          <MediaPreviewModal previewUrl={src} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
