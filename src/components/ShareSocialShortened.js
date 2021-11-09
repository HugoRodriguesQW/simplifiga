import styles from '../styles/components/Share.module.css'

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton
} from "react-share";
import { useState } from 'react';

export function ShareSocialShortened({shareUrl}) {
  const [actB, setActB] = useState(false)

  function handleActiveBar() { setActB(!actB) }
  return (

    <div className={`${styles.shareContainer} ${actB ? styles.active : null}`}>
      <button onClick={handleActiveBar}>
       {
         actB ?  
         <img src="/icons/bx-x.svg" alt="Close"/> :
         <img src="/icons/bxs-share-alt.svg" alt="Share"/>
       }
      </button>
      <EmailShareButton url={shareUrl}><EmailIcon/></EmailShareButton>
      <FacebookShareButton url={shareUrl}><FacebookIcon/></FacebookShareButton>
      <LinkedinShareButton url={shareUrl}><LinkedinIcon/></LinkedinShareButton>
      <RedditShareButton url={shareUrl}><RedditIcon/></RedditShareButton>
      <TelegramShareButton url={shareUrl}><TelegramIcon/></TelegramShareButton>
      <TumblrShareButton url={shareUrl}><TumblrIcon/></TumblrShareButton>
      <TwitterShareButton url={shareUrl}><TwitterIcon/></TwitterShareButton>
      <WhatsappShareButton url={shareUrl}><WhatsappIcon/></WhatsappShareButton>
      <WorkplaceShareButton url={shareUrl}><WorkplaceIcon/></WorkplaceShareButton>
    </div>
  )
}