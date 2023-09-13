import type { ThemeConfig } from 'antd';

const customTheme: ThemeConfig = {
  token: {
    fontSize: 16,
      // Seed Token
      //colorPrimary: '#EC1C24',
      borderRadius: 2,
      
      // Alias Token
      //colorBgContainer: '#f6ffed',
  },
  components: {
    
    Button: {
      colorPrimary: '#00b96b',
    },
    Input: {
      colorPrimary: '#eb2f96',
    },
    Layout: {
      colorPrimary: '#EC1C24',
      lightTriggerBg: "#EC1C24",
      lightSiderBg: "#ffffff",
      siderBg: "#001529"
    },
   
  }
};

export default customTheme;
