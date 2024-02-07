import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { BookIcon } from '@/assets/icons';
// import Image from 'next/image';
// import logo from "@/assets/image/cts-logo.png";
import logo from '@/assets/image/cts-logo.png';
import Spinner from '@/components/ui/spinner';
import { CTS_LOGO_BASE64 } from '@/assets/image/base64-image';
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

interface ReprintPdfProps {
  data: any;
}

const ReprintPdf = ({ data }: ReprintPdfProps) => {

  return (
    <Document style={{ }}>
    <Page size="A4" style={styles.page} >
      {/* address */}
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginBottom: '30px'}}>
          {/* <Logo />  */}
           {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={{ width: '100px' , height: '40px'}} src={CTS_LOGO_BASE64}/>
          {/* <View style={{ display: 'flex', flexDirection: 'column', rowGap: '6px', fontSize: '12px'}}>
            <Text>CTSdatabase, LLC.</Text>
            <Text>4835 Van Nuys Blvd., Ste 104</Text>
            <Text>Sherman Oaks, CA 91403</Text>
            <Text>Ph: 855 287-2873</Text>
          </View> */}
          
          <View style={{display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '17%'}}>
            <View style={{marginTop: 'auto'}}>
              <Text>CTSdatabase</Text>
              <Text>Match Report</Text>
            </View>
            <View style={{height: '60px', width: '2px', backgroundColor: 'black', marginLeft: '10px', marginRight: '10px'}}></View>
            <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
              <Text style={{fontSize: '12px'}}>Date: <Text style={{fontSize: '10px'}}>02-Feb-24</Text></Text>
              <Text style={{fontSize: '12px'}}>Site: <Text style={{fontSize: '10px'}}>CITrials- Bellflower</Text></Text>
              <Text style={{fontSize: '12px'}}>Protocol: <Text style={{fontSize: '10px'}}>PS ANX</Text></Text>
            </View>
          </View>
          
      </View>
        
      {/* horizontal bar */}
      <View style={{  height: "3px", marginBottom: '20px', backgroundColor: '#5581c9', width: '100%' }}></View>
      {/* <View style={{  height: "1px", backgroundColor: 'black', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}></View> */}

         {/* title */}
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', marginLeft: 'auto', marginRight: 'auto', alignItems:'center', rowGap: '5px', width: '80%', paddingTop: '10px', paddingBottom: '10px', borderTop: '.5px', borderBottom: '.5px'}}>
        <Text style={{ fontSize: '10px', margin: 'auto', fontStyle: 'italic' }}>Search Parameters:</Text>
        <View style={{ display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
          <Text style={{ fontSize: '12px' }}>Indication: <Text style={{ fontSize: '10px' }}>Prescreen- Anxiety</Text></Text>
          <Text style={{ fontSize: '12px' }}>Subject Number: <Text style={{ fontSize: '10px' }}>new123</Text></Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', columnGap: '15px', justifyContent: 'center' }}>
          <Text style={{ fontSize: '12px' }}>Initials: <Text style={{ fontSize: '10px' }}>J-R</Text></Text>
          <Text style={{ fontSize: '12px' }}>DOB: <Text style={{ fontSize: '10px' }}>02-Feb-88</Text></Text>
          <Text style={{ fontSize: '12px' }}>Sex: <Text style={{ fontSize: '10px' }}>M</Text></Text>
        </View>
      </View>

      {/* body */}
      <View style={{ width: '100%'}}>
        <Text style={{ fontSize:'10px', color: 'red'}}>Virtually Certain Matches | <Text style={{ color: 'black'}}> Identifiers matched closely enough that the odds are less than 1 in 10 million to occur by chance</Text> </Text>
      </View>
    </Page>
  </Document>
  );
}

export default ReprintPdf;