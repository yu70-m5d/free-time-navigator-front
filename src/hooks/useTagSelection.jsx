import { selectedTagsState } from "@/state/atoms";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";


export const useTagSelection = () => {
  const [ selectedTags, setSelectedTags ] = useRecoilState(selectedTagsState);
  const router = useRouter();
  const isContactPage = router.pathname.includes("/");

  const handleSelectedChange = (selected) => {
    setSelectedTags(selected);

    if (isContactPage && selected.length) {
      router.push("/spots");
    }
  };

  return { selectedTags, handleSelectedChange };
};