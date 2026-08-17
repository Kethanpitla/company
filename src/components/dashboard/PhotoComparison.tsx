import { useRef, useState } from "react";
import {
  FaCamera,
  FaUpload,
  FaImage,
  FaArrowRight,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

const PhotoComparison = () => {
  const { user } = useUser();

  const inputRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] =
    useState<string | null>(
      user.progressPhoto || null
    );

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setPhoto(imageUrl);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-400">
              <FaCamera />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-purple-400">
                Transformation
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Progress Photos
              </h2>

            </div>

          </div>

          <FaImage className="text-gray-700" />

        </div>

        {/* PHOTO */}

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

          {photo ? (

            <div className="relative h-48">

              <img
                src={photo}
                alt="Progress"
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">

                <p className="text-xs font-semibold text-white">
                  Current Progress
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  Keep tracking your transformation
                </p>

              </div>

            </div>

          ) : (

            <div className="flex h-48 flex-col items-center justify-center p-6 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-400">
                <FaCamera />
              </div>

              <p className="mt-4 text-sm font-semibold">
                No progress photo yet
              </p>

              <p className="mt-1 max-w-xs text-xs text-gray-300">
                Upload a photo to track your
                transformation over time.
              </p>

            </div>

          )}

        </div>

        {/* HIDDEN INPUT */}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        {/* ACTION */}

        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-gray-400 transition hover:border-purple-400/20 hover:bg-purple-400/10 hover:text-purple-400"
        >

          <FaUpload />

          {photo
            ? "Update Photo"
            : "Upload Progress Photo"}

          <FaArrowRight className="ml-auto text-xs" />

        </button>

        {/* TIP */}

        <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.03] p-3">

          <p className="text-[10px] leading-relaxed text-gray-300">
            💡 Take progress photos under similar
            lighting and at the same angle for a
            more accurate comparison.
          </p>

        </div>

      </div>

    </div>
  );
};

export default PhotoComparison;