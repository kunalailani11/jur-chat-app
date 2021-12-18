import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Cookies } from 'react-cookie';
import ServerSideCookies from 'cookies';

export enum AuthCookie {
    userId = 'user_id'
  }

  type CookieTypes = AuthCookie;

  function GetCookies(
    ctx?: GetServerSidePropsContext<ParsedUrlQuery> | undefined
  ): Cookies | ServerSideCookies {
    let cookies: Cookies | ServerSideCookies;
  
    if (ctx && ctx.req) {
      cookies = new ServerSideCookies(ctx.req, ctx.res);
    } else {
      cookies = new Cookies();
    }
    return cookies;
  }
  
  export function getCookie<T = string>(
    cookie: CookieTypes,
    ctx?: GetServerSidePropsContext<ParsedUrlQuery> | undefined
  ): T {
    const cookies = GetCookies(ctx);
  
    return cookies.get(cookie);
  }
  
  export function setCookie<T>(
    cookie: CookieTypes,
    value: T,
    ctx?: GetServerSidePropsContext<ParsedUrlQuery> | undefined
  ): void {
    const cookies = GetCookies(ctx);
    return cookies.set(cookie, value, { path: '/' });
  }