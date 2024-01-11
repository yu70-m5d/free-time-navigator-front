import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { locationState } from '@/state/atoms';
import styles from '@/styles/BasicCard.module.css';
import { Chip } from '@mui/material';
import Link from 'next/link';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

export default function BasicCard(props) {
  const { id, name, address, latitude, longitude, rating, image, duration, tags } = props;
  const origin = useRecoilValue(locationState);
  const router = useRouter()
  const queryParams = `origin=${encodeURIComponent(JSON.stringify(origin))}`;
  const isContactPage = router.pathname.includes("/spots/[id]");

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
				<div className={styles.item2Show}>
					<img src={image} width={100} height={100} alt='施設画像' />
				</div>
				<div className={styles.item3Show}>
					<div className={styles.rate}>
						<StarIcon sx={{height: '20px', width: '20px'}} />
						<p className={styles.rateText}>{rating}</p>
					</div>
					<div>
						<p className={styles.timeText}>移動時間:{`約${durationTime}分`}</p>
						<p className={styles.timeText}>滞在時間:{ max === min ? `約${ave}分` : `約${min}分~${max}分` }</p>
					</div>
					<div>
						{tags.map((tag) => (
              <Chip sx={{
                          height: 24,
                          color: "#FFFFFF",
                          backgroundColor: "#757575",
                          border: "solid",
                          borderColor: "#383838",
                          borderWidth: "1px"
                        }}
                    label={tag.name} />
            ))}
					</div>
				</div>
				<div className={styles.item4Show}>
					<p className={styles.addressText}>{address}</p>
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
          <img src={image} width={120} height={120} alt='施設画像' />
        </div>
        <div className={styles.item3Index}>
          <div className={styles.rate}>
            <StarIcon sx={{height: '20px', width: '20px'}} />
            <p className={styles.rateText}>{ rating == undefined ? '-' : rating }</p>
          </div>
          <div>
            <p className={styles.timeText}>滞在時間:<br />
            { max === min ? `約${ave}分` : `約${min}分~${max}分` }</p>
          </div>
          <div>
            {tags.map((tag) => (
              <Chip sx={{
                          height: 24,
                          color: "#FFFFFF",
                          backgroundColor: "#757575",
                          border: "solid",
                          borderColor: "#383838",
                          borderWidth: "1px"
                        }}
                    label={tag.name} />
            ))}
          </div>
        </div>
        <div className={styles.item4Index}>
          <Link href={`spots/${id}?${queryParams}`}>
            <ArrowForwardIosSharpIcon />
          </Link>
        </div>
      </Card>
  );
}