'use client';
import { ArrowSwapHorizontal, SettingsIcon, SettingsIcon2 } from "@/assets/icons";
import { STORAGE_KEY } from "@/constants/storage-constant";
import { MenuItem } from "@/model/menu-items";

export function createNestedMenusItems(screenData: any): MenuItem[] {
  const rootScreen: Array<MenuItem> = [];

  for (const screen of screenData) {
    const { screenId, parentScreenId, ...rest } = screen;

    if (parentScreenId === 0) {
      // rootScreen[screenId] = { ...rest, child: {} };
      const icon = getIconFromScreenId(screenId);
      rootScreen.push({...rest, screenId,parentScreenId, icon, child: []});

    } else {
      // rootScreen[parentScreenId].child[screenId] = { ...rest, child: {} };
      const isParentItem = (element: MenuItem) => element.screenId === parentScreenId;
      const index = rootScreen.findIndex(isParentItem);
      rootScreen[index].child.push({...rest, screenId,parentScreenId, child: []});
    }
  }
  return rootScreen;
}


export const getIconFromScreenId = (id: number) => {
  switch(id) {
    case 19:
      return <ArrowSwapHorizontal />
    case 20:
      // return <SendRequestIcon /> not available icon on figma
      return <ArrowSwapHorizontal />
    case 21:
      // return <RequsetDashboard /> not available icon on figma
      return <ArrowSwapHorizontal />
    case 23:
      // return <Change password /> not available icon on figma
      return <ArrowSwapHorizontal />
    case 24:
      // return <Change password /> not available icon on figma
      return <SettingsIcon2 />
    case 25:
      // return <Enter Study SUbject /> not available icon on figma
      return <ArrowSwapHorizontal />
    case 28:
      // return <Re print match report /> not available icon on figma
      return <ArrowSwapHorizontal />
    case 29:
      // return <RePrintLastSubjectReport /> not available icon on figma
      return <ArrowSwapHorizontal />
    case 202:
      return <SettingsIcon />
    default:
      return <ArrowSwapHorizontal />;
  }
}

export function setCookie(key: string, value: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/";
}
export function deleteCookie(name: string) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}
export function getCookie(key: string) {
  let name = key + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const getAccessToken = () => {
  let token = localStorage.getItem(STORAGE_KEY.AUTH_TOKEN);
  if(token) token = JSON.parse(token ?? '');
  if(token) {
    return token[STORAGE_KEY.ACCESS_TOKEN as any]
  }
  return '';
}

export function calculateDaysBetweenDates(startDate: string | Date, endDate: string | Date) {
  const startDateTime = new Date(startDate).getTime();
  const endDateTime = new Date(endDate).getTime();

  const timeDifference = endDateTime - startDateTime;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}