import { ArrowSwapHorizontal, SettingsIcon, SettingsIcon2 } from "@/assets/icons";
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
  }
}