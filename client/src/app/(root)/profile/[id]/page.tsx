"use client";
import BackButton from "@/components/BackButton";
import Posts from "@/components/Posts";
import ProfileHeader from "@/app/(root)/profile/components/ProfileHeader";
import ProfileTabs, {
  ProfileTabContext,
} from "@/app/(root)/profile/components/ProfileTabs";

import { useProfile } from "@/hooks/useProfile";
import { useUserPosts } from "@/hooks/useUserPosts";

import { useParams } from "next/navigation";
import { useState } from "react";

function Profile() {
  const { id } = useParams();
  const { profile, isLoading: isLoadingProfile } = useProfile(id as string);

  const userId = profile?.user.id;
  const { userPosts, isLoading: isLoadingPosts } = useUserPosts(
    userId as string
  );

  const [context, setContext] = useState<ProfileTabContext>("posts");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 py-4 sticky top-0 z-10 backdrop-blur-md bg-[var(--color-grey-50)]/10 rounded-bl-md rounded-br-md">
        <BackButton navigateTo="/home" />
        <span className="text-xl font-semibold">
          {profile?.user.displayName}
        </span>
      </div>

      <ProfileHeader profile={profile} isLoading={isLoadingProfile} />

      <ProfileTabs context={context} setContext={setContext} />

      {context === "posts" && (
        <Posts posts={userPosts} isLoading={isLoadingPosts} />
      )}
    </div>
  );
}

export default Profile;
