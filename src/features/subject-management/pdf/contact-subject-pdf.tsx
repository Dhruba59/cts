import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { BookIcon } from '@/assets/icons';
// import Image from 'next/image';
// import logo from "@/assets/image/cts-logo.png";
import logo from '@/assets/image/cts-logo.png';
import Spinner from '@/components/ui/spinner';
import { LastSubjectPdfData } from '@/model/subject';
import { formateTableDate, formateTableDateTime } from '@/utils/helpers';
// import logo from '../../assets/image/cts-logo.png'

const Br = () => "\n";
// Create styles
const styles = StyleSheet.create({
  page: {
    // display: 'flex',
    // flexDirection: 'column',
    // backgroundColor: '#E4E4E4',
    padding: '10px'
  },
  section: {
    margin: 10,
    padding: 10,
    // flexGrow: 1
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
          <Image style={{ width: '100px' , height: '40px'}} src={`data:image/png;base64,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`}/>
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
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', width: '45%', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Sponsor Subject Id</Text>
            </View>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium', flexGrow: 1,}}>
              <Text>{data?.sponsorSubjectId}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', width: '45%', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Site Code</Text>
            </View>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium', flexGrow: 1,}}>
              <Text>{data?.siteCode}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', width: '45%', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Report Run Time (GMT)</Text>
            </View>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium', flexGrow: 1,}}>
              <Text>{formateTableDateTime(data?.reportRunTime)}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', width: '45%', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Protocol</Text>
            </View>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium', flexGrow: 1,}}>
              <Text>{data?.protocol}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', width: '45%', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Date of Birth</Text>
            </View>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium', flexGrow: 1,}}>
              <Text>{formateTableDate(data?.dob)}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '49%'}}>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', width: '45%', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', fontWeight: 'bold', backgroundColor: '#DEDEDE'}}>
              <Text>Initials</Text>
            </View>
            <View style={{ border: '1px', padding: '4px 0px 4px 4px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', fontWeight: 'medium', flexGrow: 1,}}>
              <Text>{data?.intitials}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{  }}>
        <Text style={{ margin: '10px 0px 10px 0px ', borderBottom: '1px', width: '180px', fontSize: '12px' }}>Last Subject Contact Information</Text>
        <View style={{ display: 'flex', flexDirection: 'column', gap: '4px' , justifyContent:'center', fontSize: '10px' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ border: '1px', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', padding: '4px', fontWeight: 'bold', width: '45%', backgroundColor: '#DEDEDE'}}>
              <Text>Last Subject Contact Date</Text>
            </View>
            <View style={{ border: '1px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', padding: '4px', fontWeight: 'extralight', flexGrow: 1, fontSize: '10px'}}>
              <Text>{formateTableDate(data?.lastSubjectContactDate)}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ border: '1px', borderBottomLeftRadius: '4px', borderTopLeftRadius: '4px', padding: '4px', fontWeight: 'bold', width: '45%', backgroundColor: '#DEDEDE'}}>
              <Text>Last Subject Contact Type</Text>
            </View>
            <View style={{ border: '1px', borderBottomRightRadius: '4px', borderTopRightRadius: '4px', padding: '4px', fontWeight: 'medium', flexGrow: 1}}>
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
