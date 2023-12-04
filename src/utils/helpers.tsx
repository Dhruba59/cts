'use client';
import dayjs from "dayjs";
import { ArrowSwapHorizontal, ChangeRequestIcon, DashboardIcon, IdIcon, IndicationIcon, SettingsIcon, SettingsIcon2, SiteIcon, SponsorIcon, StudyCompoundIcon, StudyInformationIcon, SubjectManagementIcon, UserIcon } from "@/assets/icons";
import { USER_ROLE_VALUE } from "@/constants/common";
import { STORAGE_KEY } from "@/constants/storage-constant";
import { DropDownItem, SelectOptionType } from "@/model/drop-down-list";
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
    case 0:
      return <DashboardIcon />
    case 1:
      return <IndicationIcon />
    case 4:

      return <SponsorIcon />
    case 7:
      return <SiteIcon />
    case 10:
      return <StudyInformationIcon />
    case 13:
      return <IdIcon />
    case 16:
      return <UserIcon />
    case 19:
      return <ChangeRequestIcon />
    case 24:
      return <SubjectManagementIcon />
    case 30:
      return <StudyCompoundIcon />
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

export const getUserRoleFromValue = (role: string) => {
  switch(parseInt(role)){
    case USER_ROLE_VALUE.site_user:
      return 'Site User';
    case USER_ROLE_VALUE.sys_admin:
      return 'Sys Admin';
    case USER_ROLE_VALUE.sponsor:
      return 'Sponsor';
    default:
      return 'Site User';
  }
}
export const convertTypeToSelectOption = (data: DropDownItem[]): SelectOptionType[] => (
  data?.map((item: DropDownItem) => ({
    label: item.text,
    value: item.value,
  }))
);

export const formateTableDate = (date: string) => {
  return dayjs(date).format("DD-MMM-YYYY");
};