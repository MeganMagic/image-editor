import { useCallback } from "react";
import { create } from "zustand";

interface ImageState {
  canvasSource: CanvasImageSource | undefined;
  dimension: number;
  updateImage: (element: HTMLImageElement) => void;
}

export const useImageStore = create<ImageState>()((set) => ({
  canvasSource: undefined,
  dimension: 1,
  updateImage: (image) =>
    set(() => ({
      dimension: Math.trunc((image.width / image.height) * 100) / 100,
      canvasSource: image as CanvasImageSource,
    })),
}));

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// exposed features to host app
export const useImageController = (onError?: (message: string) => void) => {
  const { updateImage } = useImageStore();

  const uploadImage = useCallback(
    (file: File) => {
      // 파일 용량 초과
      if (file.size > MAX_FILE_SIZE) {
        const message = "File is too large. Maximum size is 5MB.";
        console.error(message);
        onError?.(message);
        return;
      }

      // 파일 타입 오류
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        const message = "Unsupported file format.";
        console.error(message);
        onError?.(message);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result !== "string") return;

        const image = new window.Image();
        image.src = reader.result;
        image.crossOrigin = "Anonymous";
        image.onload = () => updateImage(image);
      };
    },
    [onError, updateImage]
  );

  return { uploadImage };
};
