import { accessTokenState, signInState } from '@/state/atoms';
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';

const Auth = dynamic(() =>
  import('@/components/auth'), { ssr: false })

export default function Page() {

  const signIn = useRecoilValue(signInState);
  const accessToken = useRecoilValue(accessTokenState);

  console.log(signIn);

  return (
    <>
      <Auth>
        <div>
          <h1>テストページ</h1>
          <p>{accessToken}</p>
        </div>
      </Auth>
    </>
  )
}