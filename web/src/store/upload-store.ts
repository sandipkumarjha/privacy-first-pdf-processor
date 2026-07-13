import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface UploadedFile {
  file: File;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
}

export interface UploadStore {
  uploadedFile: UploadedFile | null;
  isLoading: boolean;
  error: string | null;
  
  setUploadedFile: (file: UploadedFile) => void;
  clearUploadedFile: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadStore>()(
  devtools(
    persist(
      (set) => ({
        uploadedFile: null,
        isLoading: false,
        error: null,

        setUploadedFile: (file: UploadedFile) =>
          set(
            { uploadedFile: file, error: null },
            false,
            'setUploadedFile'
          ),

        clearUploadedFile: () =>
          set({ uploadedFile: null }, false, 'clearUploadedFile'),

        setIsLoading: (loading: boolean) =>
          set({ isLoading: loading }, false, 'setIsLoading'),

        setError: (error: string | null) =>
          set({ error }, false, 'setError'),

        reset: () =>
          set(
            {
              uploadedFile: null,
              isLoading: false,
              error: null,
            },
            false,
            'reset'
          ),
      }),
      {
        name: 'upload-store',
        partialize: (state) => ({
          uploadedFile: state.uploadedFile,
        }),
      }
    ),
    { name: 'UploadStore' }
  )
);