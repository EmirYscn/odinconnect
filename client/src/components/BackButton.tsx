import { FaArrowLeft } from "react-icons/fa";
import Button from "./Button";
import { useRouter } from "next/navigation";

function BackButton({ navigateTo }: { navigateTo?: string }) {
  const router = useRouter();

  const handleRouting = () => {
    if (navigateTo) {
      router.push(navigateTo);
    } else {
      router.back();
    }
  };
  return <Button icon={<FaArrowLeft />} onClick={handleRouting} />;
}

export default BackButton;
