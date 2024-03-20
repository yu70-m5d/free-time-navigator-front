import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { locationState, modalIsOpenState, selectedTagsState } from '@/state/atoms';
import styles from '@/styles/BasicCard.module.css';
import { Chip } from '@mui/material';
import Link from 'next/link';
import { useTagSelection } from '@/hooks/useTagSelection';
import { translateToJapanese } from '@/utils/translationUtils';
import { useEffect, useState } from 'react';
import TimerModal from './TimerModal';
import { useModalOperation } from '@/hooks/useModalOperation';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddIcon from '@mui/icons-material/Add';
import { useFavorite } from '@/hooks/useFavorite';
import Cookies from 'js-cookie';
import TwitterShareButton from './TwitterShareButton';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

export default function BasicCard(props) {
  const { id, name, address, rating, image, duration, tags, favorite } = props;

  const origin = useRecoilValue(locationState);
  const router = useRouter()
  const queryParams = `origin=${encodeURIComponent(JSON.stringify(origin))}`;
  const isContactPage = router.pathname.includes("/spots/[id]");

  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  const loggedIn = Cookies.get("loggedIn");
  const { handleSelectedChange } = useTagSelection();
  const { checkFavorites, addFavorites, removeFavorites } = useFavorite();

  const handleChipClick = (clickedTag) => {
    const isSelected = selectedTags.includes(clickedTag);
    const newSelectedTags = isSelected
      ? selectedTags.filter((tag) => tag !== clickedTag)
      : [...selectedTags, clickedTag];

    handleSelectedChange(newSelectedTags);
  };

  const { modalOpen } = useModalOperation();

  const [isFavorite, setIsFavorite] = useState(favorite);

  useEffect(() => {
    if (id && isContactPage) {
      const getFavoriteStatus = async() => {
        const favoritesStatus = await checkFavorites(id);
        setIsFavorite(favoritesStatus);
      };
      getFavoriteStatus();
    }
  }, [id, isFavorite]);



  const handleFavorites = (id) => {
    if (!loggedIn) {
      alert("ログインしてください。");
    } else {
      isFavorite ? removeFavorites(id) : addFavorites(id);
      setIsFavorite(checkFavorites);
    }
  };


  const aryMax = (a, b) => {return Math.max(a, b);}
  const aryMin = (a, b) => {return Math.min(a, b);}
  const stayTimeAry = tags.map((tag) => tag.stay_time);
  const max = stayTimeAry.length > 0 ? stayTimeAry.reduce(aryMax) : 0;
  const min = stayTimeAry.length > 0 ? stayTimeAry.reduce(aryMin) : 0;
  const ave = stayTimeAry.length > 0 ? (max + min) / 2 : 0;


  if (isContactPage) {
    const regex = /[^0-9]/g;
    const result = duration ? duration.replace(regex, "") : "";
    const durationTime = parseInt(result);

    return (
      <Card className={styles.containerShow}>
				<div className={styles.item1Show}>
					<p className={styles.nameText}>{name}</p>
				</div>
        <div className={styles.item6Show} >
          <AccessAlarmIcon onClick={modalOpen} />
        </div>
				<div className={styles.item2Show}>
        { !!image ? (
            <img src={image} width={120} height={120} alt={`施設画像: ${name}`} />
          ) : (
            <div className={styles.noImageBox}>
              <p>No Image</p>
            </div>
          ) }
				</div>
				<div className={styles.item3Show}>
					<div className={styles.rate}>
						<StarIcon sx={{height: '20px', width: '20px'}} />
						<p className={styles.rateText}>{rating}</p>
					</div>
					<div>
            <p className={styles.requiredTime}>所要時間:{ max === min ? `約${durationTime + ave}` : `約${durationTime + min}分~${durationTime + max}分` }</p>
						<p className={styles.timeText}>移動時間:{`約${durationTime}分`}</p>
						<p className={styles.timeText}>滞在時間:{ max === min ? `約${ave}分` : `約${min}~${max}分` }</p>
					</div>
				</div>
        <div className={isFavorite ? styles.itemOfRemoveFavoriteBtnShow : styles.itemOfAddFavoriteBtnShow} onClick={() => handleFavorites(id)}>
          <AddIcon />
          <p className={styles.itemOfFavoriteBtnText}>お気に入り</p>
        </div>
        <div className={styles.itemOfShareBtn}>
          <TwitterShareButton name={props.name} id={props.id} />
        </div>
				<div className={styles.item4Show}>
					<p className={styles.addressText}>{address}</p>
				</div>
        <div className={styles.item5Show}>
          {tags.map((tag) => (
              <Chip
                key={tag.id}
                sx={{
                      height: 24,
                      color: "#FFFFFF",
                      backgroundColor: "#757575",
                      border: "solid",
                      borderColor: "#383838",
                      borderWidth: "1px"
                    }}
                label={translateToJapanese(tag.name)} />
            ))}
					</div>
      </Card>
    );
  }


  return (
        <Card className={styles.containerIndex}>
        <div className={styles.item1Index}>
          <p className={styles.nameText}>{name}</p>
        </div>
        <div className={styles.item2Index}>
          { !!image ? (
            <img src={image} width={120} height={120} alt={`施設画像: ${name}`} />
          ) : (
            <div className={styles.noImageBox}>
              <p>No Image</p>
            </div>
          ) }
        </div>
        <div className={styles.item3Index}>
          <div className={styles.rate}>
            <StarIcon sx={{height: '20px', width: '20px'}} />
            <p className={styles.rateText}>{ rating == undefined ? '-' : rating }</p>
          </div>
          <div>
            <p className={styles.timeText}>滞在時間<br />
            { max === min ? `約${ave}分` : `約${min}~${max}分` }</p>
          </div>
        </div>
        <div className={styles.item4Index}>
          <Link href={`spots/${id}?${queryParams}`}>
            <ArrowForwardIosSharpIcon />
          </Link>
        </div>
        <div className={styles.item5Index}>
            {tags.map((tag) => (
              <Chip
                key={tag.id}
                sx={{
                      height: 24,
                      color: "#FFFFFF",
                      backgroundColor: "#757575",
                      border: "solid",
                      borderColor: "#383838",
                      borderWidth: "1px"
                    }}
                label={translateToJapanese(tag.name)}
                onClick={() => handleChipClick(tag.name)} />
            ))}
          </div>
      </Card>
  );
}