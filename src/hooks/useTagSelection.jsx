import { selectedTagsState } from "@/state/atoms";
import { useRecoilState } from "recoil";


export default function useTagSelection() {
  const [ selectedTags, setSelectedTags ] = useRecoilState(selectedTagsState);

  const handleSelectedChange = (selected) => {
    setSelectedTags(selected);
  };

  return { selectedTags, handleSelectedChange };
};