import { Logo } from "../Logo/Logo";
import styles from "./Footer.module.css";

export const Footer = () => {
    const participants = [
        {id: 1, telegramm: 'https://t.me/tyshk41'},
        {id: 2, telegramm: 'https://t.me/ackapga'},
        {id: 3, telegramm: 'https://t.me/peshok_s_meskom'},
        {id: 6, telegramm: 'https://t.me/Natalya_S15'},
        {id: 7, telegramm: 'https://t.me/Mercique'},
        {id: 8, telegramm: 'https://t.me/alco_peach'},
        {id: 9, telegramm: 'https://t.me/Serjik_l'},
        {id: 10, telegramm: 'https://t.me/angelic_victory'},
        {id: 12, telegramm: 'https://t.me/dkhartsii'},
    ]

  return (
    <div className={styles.footer}>
      <div className={styles.contentWrapper}>
          <div className={styles.logoFooter}>
              <Logo width={80} height={80} />
              <div className={styles.copyright}>© 2022</div>
          </div>
          <div className={styles.participantsWrapper}>
              <div className={styles.participantsHeader}>участники:</div>
              <div className={styles.participants}>
                  {participants &&
                  participants.map(participant => (
                      <div className={styles.participant} key={participant.id}>
                          <a className={styles.linkTG} href={participant.telegramm} target='_blank' rel="noopener noreferrer">{participant.telegramm}</a>
                      </div>
                  ))}
              </div>
          </div>
          <div className={styles.contacts}>
              <div className={styles.contactsHeader}>Контакты:</div>
              <div className={styles.phone}>Телефон: 8-800-800-80-80</div>
              <div className={styles.email}>E-mail: mail@mail.ru</div>
          </div>
      </div>
    </div>
  );
};
