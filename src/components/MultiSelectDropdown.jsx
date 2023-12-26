import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


export default function MultiSelectDropdown(props) {
  const {onSpotsData, onTagsChange, origin, time} = props;
  const [tags, setTags] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);


  const fetchTagsSpots = async (tags) => {
    const params = { tags: tags, time: time, lat: origin.lat, lng: origin.lng }
    const tagSearchUrl = `${process.env.NEXT_PUBLIC_FTN_API_SPOTS}`;
    const tagResponse = await axios.get(tagSearchUrl, {
      params: params
    });
    console.log(tags);
    onSpotsData(tagResponse.data);
    onTagsChange(tags);
  };

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value);
    console.log(event.target.value);
    fetchTagsSpots(event.target.value);
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
    <FormControl fullWidth sx={{ marginBottom: 2, position: "relative" }} >
      {selectedOptions.length === 0 && (
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
        value={selectedOptions}
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