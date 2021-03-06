import React from 'react';
import s from '../../scss/auth.module.scss';
import { useNavigate } from 'react-router-dom';
import { AuthInVK } from '../../api/api';
const VK = require('vk-openapi');

export const AuthYandex = (props: any) => {
  const navHome = useNavigate();
  VK.init({
    apiId: process.env.REACT_APP_VK_CLIENT_ID,
  });
  const btn = () => {
    try {
      VK.Auth.login(function (response: any) {
        if (response.session) {
          /* User is authorized successfully */
          if (response.settings) {
            /* Selected user access settings, if they were requested */
          }
          let auth: any = {};
          let imageAuth: any;
          VK.Api.call(
            'photos.get',
            { owner_id: response.session.user.id, album_id: 'profile', v: 5.121 },
            function (r: any) {
              if (r.response) {
                imageAuth = JSON.stringify(r.response.items[0].sizes[0].url);
                //  auth = {...auth, imageAuth}
                // localStorage.setItem("auth", JSON.stringify(auth))
              }

              VK.Api.call(
                'users.get',
                { user_ids: response.session.user.id, v: 5.121 },
                function (r: any) {
                  if (r.response) {
                    const nameAuth = JSON.stringify(r.response[0].first_name);
                    const emailAuth = JSON.stringify(r.response[0].id);
                    const authAuth = true;

                    auth = { ...auth, nameAuth, emailAuth, imageAuth, authAuth };
                    localStorage.setItem('auth', JSON.stringify(auth));
                    props.setName(
                      localStorage.getItem('auth') != null
                        ? JSON.parse(String(localStorage.getItem('auth')))
                        : ''
                    );
                    try {
                      AuthInVK(emailAuth);
                    } catch (error) {}
                    navHome('/');
                  }
                }
              );
            }
          );
        } else {
          /* User clicked Cancel button in the authorization window */
        }
      });

      VK.Auth.getLoginStatus(function (response: any) {
        if (response.session) {
          /* User authorized in Open API, response.status="connected" */
        } else {
          /* User not authorized in Open API,  response.status="not_authorized"  */
        }
      });
    } catch (error) {}
  };

  return (
    <>
      <div
        onClick={() => (props.name.nameAuth ? alert('???? ?????? ?????????? ?? ??????????????') : btn())}
        className={s.main_div_Yandex}
        title="?????????? ?? ?????????????? VK"
      ></div>
      {/* <div onClick={()=>btn2()} className={s.butt}></div> */}
    </>
  );
};
