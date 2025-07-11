import { Profile } from "@shared/types/types";
import ProfileImage from "../../../../components/ProfileImage";
import { IoLocationOutline } from "react-icons/io5";
import { RiLink } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { formatJoinedDate } from "@/lib/utils/formatDate";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";

type ProfileHeaderProps = {
  profile: Profile | undefined;
  isLoading?: boolean;
};

function ProfileHeader({ profile, isLoading }: ProfileHeaderProps) {
  if (isLoading) {
    return <ProfileHeaderSkeleton />;
  }

  return (
    <>
      <div className="relative">
        <div className="h-50 bg-[var(--color-grey-300)]/30" />
        <div className="absolute left-4 -bottom-12">
          <ProfileImage imgSrc={profile?.user.avatar} />
        </div>
      </div>
      <div className="h-12" />
      <div className="p-2 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xl">
            {profile?.user.displayName}
          </span>
          <span className="">@{profile?.user.username}</span>
        </div>

        <div>
          <span className="">{profile?.bio}</span>
        </div>
        <div className="flex gap-4">
          {profile?.location && (
            <div className="flex items-center gap-1 text-sm text-[var(--color-grey-500)]">
              <IoLocationOutline className="text-sm" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile?.website && (
            <div className="flex items-center gap-1 text-sm text-[var(--color-grey-500)]">
              <RiLink className="text-lg" />
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-sm hover:text-[var(--color-blue-200)] hover:underline">
                  {profile.website}
                </span>
              </a>
            </div>
          )}
          <div className="flex items-center gap-1 text-sm text-[var(--color-grey-500)]">
            <LuCalendarDays />
            <span>Joined {formatJoinedDate(profile?.createdAt as string)}</span>
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-bold">{profile?.user._count?.posts}</span>
            <span className="text-[var(--color-grey-500)]">Posts</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">{profile?.user._count?.following}</span>
            <span className="text-[var(--color-grey-500)]">Following</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">{profile?.user._count?.followers}</span>
            <span className="text-[var(--color-grey-500)]">Followers</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
