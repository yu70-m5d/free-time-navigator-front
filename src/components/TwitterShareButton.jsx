import { useEffect } from "react";

export default function TwitterShareButton(props) {
  const { name, id } = props;
  useEffect(() => {
    // Twitterのスクリプトを動的にロード
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    // コンポーネントのアンマウント時にスクリプトを削除することで、リソースをクリーンアップ
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      className="twitter-share-button"
      data-text={`スポットをシェア！${name}`}
      data-url={`${process.env.NEXT_PUBLIC_FTN_FRONT_ORIGIN}/spots/${id}`}
      data-show-count="false">
        Tweet
    </a>
  );
}