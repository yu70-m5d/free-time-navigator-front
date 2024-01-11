import useFetchSpots from "@/hooks/useFetchSpots";
import { selectedTagsState, tagsState } from "@/state/atoms";
import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";


export default function MultiSelectDropdown(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

  const { loading } = useFetchSpots();


  const handleSelectChange = (event) => {
    setSelectedTags(event.target.value);
    console.log(event.target.value);
  };


  useEffect(() => {
    const fetchTags = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_FTN_API_TAGS}`;
        const res = await axios.get(url);
        setTags(res.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();

  }, []);


  return (
    <FormControl fullWidth sx={{position: "sticky", top: 52, backgroundColor: "#FFFFFF" }} >
      {selectedTags.length === 0 && (
        <InputLabel
        sx={{
          fontSize: 12,
          transform: "translate(0, 8.0px)",
          position: "absolute",
          }}
        >
          タグで絞り込む
        </InputLabel>
      )}
      <Select
        sx={{height: 32}}
        multiple
        value={selectedTags}
        onChange={handleSelectChange}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
          <Chip sx={{height: 24, color: "#FFFFFF", backgroundColor: "#0B8CE9" }} key={value} label={value} />
            ))}
          </div>
        )}
      >
        {tags && tags.map((tag) => (
          <MenuItem key={tag.id} value={tag.name}>{tag.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};