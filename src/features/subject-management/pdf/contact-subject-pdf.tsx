import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';

import { CTS_LOGO_BASE64 } from '../../../../public/base64-image';
import { LastSubjectPdfData } from '@/model/subject';
import { formateTableDate, formateTableDateTime } from '@/utils/helpers';

const Br = () => "\n";
// Create styles
const styles = StyleSheet.create({
  page: {
    padding: '10px'
  },
  section: {
    margin: 10,
    padding: 10,
  },

});

interface LastContactSubjectsPdfProps {
  data: LastSubjectPdfData | undefined;
  isLoadingData: boolean;
}

// Create Document Component
const LastContactSubjectsPdf = ({ data }: LastContactSubjectsPdfProps) => {  
  const printTime = formateTableDateTime(new Date());
  return (
    <Document style={{ }} title={` Last Subject Contact (${data?.sponsorSubjectId})`}>
    <Page size="A4" style={styles.page} >
      {/* address */}
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginBottom: '30px'}}>
          {/* <Logo />  */}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={{ width: '100px' , height: '40px'}} src={CTS_LOGO_BASE64}/>
          <View style={{ display: 'flex', flexDirection: 'column', rowGap: '6px', fontSize: '12px'}}>
            <Text>CTSdatabase, LLC.</Text>
            <Text>4835 Van Nuys Blvd., Ste 104</Text>
            <Text>Sherman Oaks, CA 91403</Text>
            <Text>Ph: 855 287-2873</Text>
          </View>
      </View>
        
      {/* title */}
      <View style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', marginBottom: '10px'}}>
          <Text>CTSdatabase : Last Subject Contact</Text>
      </View>
      {/* horizontal bar */}
      <View style={{  height: "2px", marginBottom: '4px', backgroundColor: 'red', width: '100%' }}></View>
      <View style={{  height: "4px", backgroundColor: '#5976de', width: '100%' }}></View>

      {/* body */}
      <View style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', marginTop: '20px', marginBottom: '26px'}}>
        <Text style={{ margin: '10px 0px 10px 0px ', borderBottom: '1px', width: '110px', fontSize: '12px'  }}>Search Parameters</Text>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', gap: '4px', width: '100%', fontSize: '10px' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ border: '1px', flex: 1, padding: '4px 0px 4px 4px', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Sponsor Subject Id</Text>
            </View>
            <View style={{ width: '100%', flex: 1, border: '1px', borderLeft: '0px',  padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium' }}>
              <Text>{data?.sponsorSubjectId}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ flex: 1, border: '1px', padding: '4px 0px 4px 4px', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Site Code</Text>
            </View>
            <View style={{ width: '100%', flex: 1, border: '1px', borderLeft: '0px',  padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium' }}>
              <Text>{data?.siteCode}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ flex: 1, border: '1px', padding: '4px 0px 4px 4px', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE' }}>
              <Text>Report Run Time (GMT)</Text>
            </View>
            <View style={{ width: '100%', flex: 1, border: '1px', borderLeft: '0px',  padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium' }}>
              <Text>{formateTableDateTime(data?.reportRunTime)}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ flex: 1, border: '1px', padding: '4px 0px 4px 4px', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE' }}>
              <Text>Protocol</Text>
            </View>
            <View style={{ width: '100%', flex: 1, border: '1px', borderLeft: '0px',  padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium' }}>
              <Text>{data?.protocol}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ flex: 1, border: '1px', padding: '4px 0px 4px 4px', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE' }}>
              <Text>Date of Birth</Text>
            </View>
            <View style={{ width: '100%', flex: 1, border: '1px', borderLeft: '0px',  padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium' }}>
              <Text>{formateTableDate(data?.dob)}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ flex: 1, border: '1px', padding: '4px 0px 4px 4px', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Initials</Text>
            </View>
            <View style={{ width: '100%', flex: 1, border: '1px', borderLeft: '0px', padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium' }}>
              <Text>{data?.intitials}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{  }}>
        <Text style={{ margin: '10px 0px 10px 0px ', borderBottom: '1px', width: '180px', fontSize: '12px' }}>Last Subject Contact Information</Text>
        <View style={{ display: 'flex', flexDirection: 'column', gap: '4px' , justifyContent:'center', fontSize: '10px' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 1, border: '1px', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', padding: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Last Subject Contact Date</Text>
            </View>
            <View style={{ width: '100%', flex: 1, border: '1px', borderLeft: '0px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', padding: '4px', fontWeight: 'extralight', fontSize: '10px'}}>
              <Text>{formateTableDate(data?.lastSubjectContactDate)}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 1, border: '1px', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', padding: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Last Subject Contact Type</Text>
            </View>
            <View style={{ width: '100%', flex: 1, border: '1px', borderLeft: '0px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', padding: '4px', fontWeight: 'medium' }}>
              <Text>{data?.lastSubjectContactType}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* footer */}
      <View style={{ marginTop: 'auto' }}>
        <Text style={{ textAlign: 'center', marginBottom: '16px', fontSize:"14px", fontWeight: 'heavy' }}>Please print a copy for subject file.</Text>
        <Text style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'heavy', marginBottom: '20px' }}>If any of the above information is incorrect, please contact us at <Br/> support@ctsdatabase.com <Br/>
          or 1-855 CTS-CTSd (1-855-287-2873)
        </Text>
        <Text style={{ fontSize: '12px', marginBottom: '30px', color: 'gray'}}>
          Disclaimer: These are statistical estimates only. It is possible that a subject may be a database match and yet not have participated in the studies described above.
          All dates and times are in GMT
        </Text>
        <Text style={{ fontSize: '10px' }}>Printed on {'     '} {printTime}</Text>
      </View>
    </Page>
  </Document>
  );
}

export default LastContactSubjectsPdf;



// const styles = StyleSheet.create({
//   page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },

//   spaceBetween : {flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" },

//   titleContainer: {flexDirection: 'row',marginTop: 24},
  
//   logo: { width: 90 },

//   reportTitle: {  fontSize: 16,  textAlign: 'center' },

//   addressTitle : {fontSize: 11,fontStyle: 'bold'}, 
  
//   invoice : {fontWeight: 'bold',fontSize: 20},
  
//   invoiceNumber : {fontSize: 11,fontWeight: 'bold'}, 
  
//   address : { fontWeight: 400, fontSize: 10},
  
//   theader : {marginTop : 20,fontSize : 10,fontStyle: 'bold',paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:20,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

//   theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

//   tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

//   total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

//   tbody2:{ flex:2, borderRightWidth:1, }
  
// });
