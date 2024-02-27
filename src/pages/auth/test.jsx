import { useSignOut } from '@/hooks/useSignOut';
import { accessTokenState, signInState } from '@/state/atoms';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const Auth = dynamic(() =>
  import('@/components/auth'), { ssr: false })

  
export default function Page() {

  const signIn = useRecoilValue(signInState);
  const accessToken = useRecoilValue(accessTokenState);

  const { hasError, isLoading, signOut, closeError } = useSignOut();

  const router = useRouter();


  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };


  return (
    <>
      <Auth>
        <div>
          <h1>テストページ</h1>
          <p>{accessToken}</p>
          <Button
            variant='contained'
            type="submit"
            onClick={handleSignOut}
            disabled={isLoading}
            >
            { !isLoading ? 'サインアウト' : 'サインアウト中' }
          </Button>
        </div>
      </Auth>
    </>
  )
}