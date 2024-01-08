import UsePointTable from "./UsePointTable";
import Alert from '../common/Alert';
import Info from "./Info";
import { useState } from "react";

function MyPage(props) {
  //TODO 작성
  //- 탭 이벤트로 리스트 조회 미구현
  //- 디자인 미완성

  //템플릿 URL
  //- https://codepen.io/cruip/pen/MWEWxLK

  /*
  EX)
  discriminator: "1646"
  isLogin: true
  point: 100000
  userAvatar: "https://cdn.discordapp.com/avatars/864874628014014514/61415fe75b548bc600886e78a22f04aa"
  userId: "864874628014014514"
  userName: "킹재훈"           
  */

  // alert
  const [isAlert, setIsAlert] = useState(false);

  let discordUrl = '';
  if (process.env.NODE_ENV === 'development') {
    discordUrl = 'https://discord.com/api/oauth2/authorize?client_id=1045203263592603692&redirect_uri=http%3A%2F%2Flocalhost:3001%2Fapi%2Fauth%2FsignIn&response_type=code&scope=identify';
  } else {
    discordUrl = 'https://discord.com/api/oauth2/authorize?client_id=1045203263592603692&redirect_uri=https%3A%2F%2Flimelight.town%2Fapi%2Fauth%2FsignIn&response_type=code&scope=identify';
  }

  return (
    <>
      {isAlert ? <Alert type={'danger'} text={<span>You can use it after logging in. <a href={discordUrl} className="underline">Go to the login page.</a></span>} /> : null}
      <div className="bg min-h-screen">
        <div className="mx-auto w-3/4 flex flex-col items-start mb-1 pt-32">
          <Info setIsAlert={setIsAlert}/>
          <UsePointTable setIsAlert={setIsAlert}/>
        </div>
      </div>
    </>
  );
}

export default MyPage;
