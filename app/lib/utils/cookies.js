export function setCookie(name, value, daysToLive) {
  let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  if (typeof daysToLive === 'number') {
    cookie += '; max-age=' + daysToLive * 24 * 60 * 60;

    cookie += '; secure';

    cookie += '; path=/';
  }

  document.cookie = cookie;
}

export function getCookie(name) {
  const cookieArray = document.cookie.split('; ');

  const cookie = cookieArray.find((c) => c.startsWith(name + '='));

  if (cookie) {
    return decodeURIComponent(cookie.split('=')[1]);
  }

  return undefined;
}
