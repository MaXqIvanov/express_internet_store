import React, { useEffect, useState } from 'react';
import s from '../../scss/auth.module.scss';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import { AuthYandex } from './AuthYandex';
import { AuthSite } from './AuthSite';
import { AuthUsers } from '../../api/api';
const VK = require('vk-openapi');

export const Auth = () => {
  const navHome = useNavigate();
  const [name, setName] = useState<any>(
    localStorage.getItem('auth') != null ? JSON.parse(String(localStorage.getItem('auth'))) : ''
  );
  // Auth
  const [authSite, setAuthSite] = useState<boolean>(true);
  try {
    useEffect(() => {
      gapi.load('auth2', function () {
        gapi.auth2
          .init({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID + '.apps.googleusercontent.com',
          })
          .then(
            () => console.log(''),
            () => console.log('')
          );
      });
    }, []);
  } catch (error) {}
  const signIn = () => {
    try {
      const GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.signIn({
        scope: 'profile email',
      }).then((user: any) => {
        let g: any = user.getBasicProfile();
        const imageAuth: string = user.getBasicProfile().getImageUrl();
        const nameAuth: string = user.getBasicProfile().getName();
        const emailAuth: string = user.getBasicProfile().getEmail();
        const authAuth = true;
        g = { ...g, imageAuth, nameAuth, emailAuth, authAuth };
        localStorage.setItem('auth', JSON.stringify(g));
        setName(
          localStorage.getItem('auth') != null
            ? JSON.parse(String(localStorage.getItem('auth')))
            : ''
        );
        try {
          AuthUsers(emailAuth);
        } catch (error) {}
        navHome('/');
      });
    } catch (error) {}
  };

  const signOut = () => {
    localStorage.removeItem('auth');
    setName('');
    try {
      VK.Auth.logout(function (response: any) {});
    } catch (error) {}
    try {
      const GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.signOut().then(() => {
        localStorage.removeItem('auth');
        setName('');
      });
    } catch (error) {
      localStorage.removeItem('auth');
      setName('');
    }
  };

  return (
    <div className={s.main}>
      {authSite ? (
        <div className={s.registr}>
          <div
            title="?????????????????? ???? ??????????????"
            className={s.navHome}
            onClick={() => navHome('/')}
          ></div>
          <div className={s.div_title}>?????????? ?? ??????????????:</div>
          <div className={s.main_buttons}>
            <div
              onClick={() => (name.nameAuth ? alert('???? ?????? ?????????? ?? ??????????????') : signIn())}
              title={'?????????? ?? ?????????????? Goole'}
              className={s.img_google}
            ></div>
            <AuthYandex name={name} setName={setName} />
          </div>

          {name.nameAuth !== undefined ? (
            <>
              <div title="?????????? ???? ??????????????" onClick={() => signOut()} className={s.signButton}>
                ??????????
              </div>
            </>
          ) : (
            <div
              onClick={() => setAuthSite(!authSite)}
              title="???????????????????????????? ???? ??????????"
              className={s.div_auth}
            >
              ????????????????????????????...
            </div>
          )}
        </div>
      ) : (
        <AuthSite object={{ setAuthSite, authSite, setName }} />
      )}
    </div>
  );
};
