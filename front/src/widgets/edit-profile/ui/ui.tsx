import { EditProfileForm, ImagesForm, useEditProfileForm } from "@features/edit-profile";

import type { IUserProfile } from "@entities/user";

import { formateDate } from "@shared/lib/formateDate";

interface IEditPorfileProps {
  userProfile: IUserProfile;
}

export const EditPorfile = ({ userProfile }: IEditPorfileProps) => {
  const profileData = {
    fullName: userProfile.fullName,
    image: userProfile.image,
    backgroundImage: userProfile.backgroundImage,
    tag: userProfile.tag,
    status: userProfile.profileInfo.status,
    isSearchingJob: userProfile.profileInfo.isSearchingJob,
    about: userProfile.profileInfo.about,
    userLocation: userProfile.profileInfo.userLocation,
    birthDate: formateDate(userProfile.birthDate, "dote")
  };
  const editProfileForm = useEditProfileForm(profileData);

  return (
    <>
      <ImagesForm
        editProfileForm={editProfileForm}
        backgroundImage={userProfile.backgroundImage}
        fullName={userProfile.fullName}
        image={userProfile.image}
      />
      <EditProfileForm editProfileForm={editProfileForm} {...userProfile} />
    </>
  );
};
