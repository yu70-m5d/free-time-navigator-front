import axios from "axios";
import styles from "@/styles/UserPage.module.css";
import { useEffect, useRef, useState } from "react";
import NameFrom from "@/components/NameForm";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import EditIcon from '@mui/icons-material/Edit';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { locationState } from "@/state/atoms";
import { useGetLocation } from "@/hooks/useGetLocation";


export async function getServerSideProps(context) {
  const { params, req } = context;
  const userId = params.userId;
  const accessToken = req.cookies['access-token'];
  const client = req.cookies['client'];
  const uid = req.cookies['uid'];
  const headers = {
    'access-token': accessToken,
    'client': client,
    'uid': uid,
  };

  if (!accessToken || !client || !uid) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/users/${userId}`;
    const response = await axios.get(url, {headers: headers});

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const initialUser = await response.data;

    return {
      props: {
        initialUser,
      },
    };

  } catch (error) {
    console.error(`Error in getStaticProps for task ID ${taskId}:`, error);
    return {
      props: {},
    };
  }
}

export default function User( {initialUser} ) {
  const [showNameForm, setShowNameForm] = useState(false);
  const [user, setUser] = useState(initialUser);
  const location = useRecoilValue(locationState);
  const [loading, setLoading] = useState(false);

  const { getGeolocation } = useGetLocation();

  const router = useRouter();

  const { handleSubmit, formState: { errors }, register } = useForm();
  const formRef = useRef(null);
  const { fetchUser, editUserProfile } = useUser();

  const userId = user?.id;

  const handleNameEdit = () => {
    setShowNameForm(true);
  };

  const onSubmit = async(data) => {
    try {
      const updatedUser = await editUserProfile({userId, data});
      setUser(updatedUser);
      setShowNameForm(false);
    } catch (error) {
      console.error('エラー：' + error.message);
    }
  };

  const handleOutSideClick = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowNameForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutSideClick); // マウスクリック時のイベントリスナーを追加
    return () => {
      document.removeEventListener('click', handleOutSideClick);
    };
  }, []);

  const handleFavoriteSpot = async(id) => {
    try {
      setLoading(true);

      if (location.lat === 0 || location.lng === 0) {
        await getGeolocation();
      }
      router.push(`/spots/${id}`);
    } catch (error) {
      console.error("エラー：", error);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.item1NotFound}>スポットを取得しています。</div>
          <div id={styles.animationContainer}>
            <span></span>
            <span></span>
            <span></span>
            <p>LOADING</p>
          </div>
        </div>
      </>
    );
  };

  return(
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.profile} onSubmit={handleSubmit(onSubmit)}>
          { showNameForm ? (
            <form ref={formRef} className={styles.nameFormContainer}>
              <NameFrom
                register={register}
                errorMessage={errors.title?.message}
                className={styles.nameForm}
                label={"ユーザーネーム"}
                defaultValue={user.name}
                optional
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={styles.submitButton}
              >
                  作成
              </Button>
            </form>
          ) : (
            <div className={styles.userNameContainer}>
              <p className={styles.userName}>{user.name ? user.name : "未設定"}さん</p>
              <EditIcon className={styles.editIcon} onClick={()=>(handleNameEdit())} />
            </div>
          ) }
          <p className={styles.numberOfFavorite}>お気に入り：{user.favorite_spots.length}件</p>
        </div>
        <div className={styles.favorites}>
          <div className={styles.favoriteHeadBox}>
            <div className={styles.horizontalLine}></div>
            <p className={styles.favoriteHead}>お気に入りスポット一覧</p>
            <div className={styles.horizontalLine}></div>
          </div>
          { user.favorite_spots.length > 0 && (
            <div className={styles.favoriteSpots}>
            {user.favorite_spots.map((favorite_spot, index) => (
              <div key={favorite_spot.id} className={styles.favorite} onClick={()=>(handleFavoriteSpot(favorite_spot.id))}>
                {index % 3 !== 0 && <div className={styles.delimiter}></div>}
                <div className={styles.favoriteSpot}>
                  <div className={styles.favoriteSpotImage}>
                    { !!favorite_spot.image ? (
                      <img src={favorite_spot.image} width={96} height={96} />
                    ) : (
                      <div className={styles.noImageBox}>No Image</div>
                    ) }
                  </div>
                  <p className={styles.favoriteSpotName}>{favorite_spot.name.replace(/\s/g, "")}</p>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}