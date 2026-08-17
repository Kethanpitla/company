import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

import { useUser } from "../context/UserContext";

import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import StepHeader from "../components/onboarding/StepHeader";
import BackButton from "../components/onboarding/BackButton";
import NextButton from "../components/onboarding/NextButton";

const UploadPhoto = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(
    user.progressPhoto || null
  );

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);

    setUser({
      ...user,
      progressPhoto: imageUrl,
    });
  };

  const handleNext = () => {
    if (!image) return;

    navigate("/loading-plan");
  };

  return (
    <OnboardingLayout step={10} totalSteps={10}>
      <StepHeader
        title="Upload Your Progress Photo"
        subtitle="This will be your starting point for tracking body transformation."
      />

      <div className="mt-12 flex justify-center">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group flex h-[380px] w-[380px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-yellow-400/40 bg-white/5 transition hover:border-yellow-400 hover:bg-white/10"
        >
          {image ? (
            <img
              src={image}
              alt="preview"
              className="h-full w-full rounded-3xl object-cover"
            />
          ) : (
            <>
              <FaCloudUploadAlt className="text-7xl text-yellow-400" />

              <h2 className="mt-6 text-2xl font-bold text-white">
                Upload Photo
              </h2>

              <p className="mt-2 text-gray-400">
                Click here to upload your first physique picture
              </p>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImage}
          />
        </div>
      </div>

      <div className="mt-14 flex justify-between">
        <BackButton
          onClick={() => navigate("/budget")}
        />

        <NextButton
          onClick={handleNext}
          disabled={!image}
        />
      </div>
    </OnboardingLayout>
  );
};

export default UploadPhoto;