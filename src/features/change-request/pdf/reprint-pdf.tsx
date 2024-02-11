import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet, Svg } from '@react-pdf/renderer';
import { BookIcon } from '@/assets/icons';
// import Image from 'next/image';
// import logo from "@/assets/image/cts-logo.png";
import logo from '@/assets/image/cts-logo.png';
import Spinner from '@/components/ui/spinner';
import { CTS_LOGO_BASE64 } from '@/assets/image/base64-image';
import Check from '@/components/icons/check';
import { Cross } from 'recharts';
import dayjs from 'dayjs';
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

interface SearchProps {
  data: { 
    indication: string;
    subjectNumber: string;
    initials: string;
    dob: string;
    gender: string;
  }
}

interface HeaderProps {
  data: { 
    date: string;
    site: string;
    protocol: string;
  }
}

interface FooterProps {
  printTime: string;
}

const ReprintPdf = ({ data }: ReprintPdfProps) => {
  const printTime = dayjs(new Date()).format("DD-MMM-YY HH:mm A");
  return (
    <Document style={{ }}>
    <Page size="A4" style={styles.page} >
      <Header data={data?.headerInfo}/>
      {/* horizontal bar */}
      <View style={{  height: "3px", backgroundColor: '#5581c9', width: '100%' }}></View>
      <SearchInfo data={data?.searchInfo} />
      <View style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%'}}>
        <ReportTable title='Virtually Certain Matches' titleColor="red" data={data?.certainMatches}/>
        <ReportTable title='Possible  Matches' titleColor="blue" data={data?.possibleMatches}/>
        <ReportTable title='Probable  Matches' titleColor="blue" data={data?.probableMatches}/>
      </View>
      <Comment comment={data?.comments} />  
      <Footer printTime={printTime}/>  
    </Page>
  </Document>
  );
}

export default ReprintPdf;

interface CommentProps {
  comment: string;
}

const Comment = ({ comment }: CommentProps) => (
  <View style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
    <View style={{ width: '80px', height: '20px', backgroundColor: '#5581c9', color: 'white', fontSize: '10px' }}><Text style={{ margin: 'auto' }}>Comments</Text></View>
    <Text style={{ fontSize: '8px', backgroundColor: '#e3dddc', padding: '2px' }}>{comment}</Text>
  </View>
);


const SearchInfo = ({ data }: SearchProps) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', marginTop: '14px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto', alignItems:'center', rowGap: '5px', width: '80%', paddingTop: '10px', paddingBottom: '10px', borderTop: '.5px', borderBottom: '.5px'}}>
    <Text style={{ fontSize: '10px', margin: 'auto', fontStyle: 'italic' }}>Search Parameters:</Text>
    <View style={{ display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
      <Text style={{ fontSize: '12px' }}>Indication: <Text style={{ fontSize: '10px' }}>{data?.indication}</Text></Text>
      <Text style={{ fontSize: '12px' }}>Subject Number: <Text style={{ fontSize: '10px' }}>{data?.subjectNumber}</Text></Text>
    </View>
    <View style={{ display: 'flex', flexDirection: 'row', columnGap: '15px', justifyContent: 'center' }}>
      <Text style={{ fontSize: '12px' }}>Initials: <Text style={{ fontSize: '10px' }}>{data?.initials}</Text></Text>
      <Text style={{ fontSize: '12px' }}>DOB: <Text style={{ fontSize: '10px' }}>{data?.dob}</Text></Text>
      <Text style={{ fontSize: '12px' }}>Sex: <Text style={{ fontSize: '10px' }}>{data?.gender}</Text></Text>
    </View>
  </View>
  )
}


const Header = ({ data }: HeaderProps) => {
  return(
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginBottom: '20px'}}>
           {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={{ width: '100px' , height: '40px'}} src={CTS_LOGO_BASE64}/>
          <View style={{display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '17%'}}>
            <View style={{marginTop: 'auto'}}>
              <Text>CTSdatabase</Text>
              <Text>Match Report</Text>
            </View>
            <View style={{height: '60px', width: '1px', backgroundColor: 'black', marginLeft: '10px', marginRight: '10px'}}></View>
            <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
              <Text style={{fontSize: '12px'}}>Date: <Text style={{fontSize: '10px'}}>{data?.date}</Text></Text>
              <Text style={{fontSize: '12px'}}>Site: <Text style={{fontSize: '10px'}}>{data?.site}</Text></Text>
              <Text style={{fontSize: '12px'}}>Protocol: <Text style={{fontSize: '10px'}}>{data?.protocol}</Text></Text>
            </View>
          </View>
          
      </View>
  )
}

const Footer = ({ printTime } : FooterProps) => (
  <View style={{ marginTop: 'auto', marginBottom: '20px' }}>
    <Text style={{fontSize: '8px'}}>Disclaimer: These are statistical estimates only. It is possible that a subject may be a database match and yet not have participated in the studies described above. 
      All dates and times are in GMT
    </Text>
    <Text style={{ fontSize: '8px', marginLeft: 'auto' }}>
      Printed On: {printTime}
    </Text>
  </View>
)


const ReportTable = ({ title, data, titleColor}: any) => {
  
  if(!data || data?.length < 1) {
    return <></>;
  }

  return (
    <View>
      <Text style={{ fontSize:'10px', color: titleColor, marginBottom: '8px'}}>{title} | <Text style={{ color: 'black'}}> Identifiers matched closely enough that the odds are less than 1 in 10 million to occur by chance</Text> </Text>
      <View>
        {/* header */}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', fontSize: '11px', padding: '3px'}}>
          <Text>Visit Information</Text>
          <Text>Identifiers Reported</Text>
          <Text>Site Information</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#f9e5e6', padding: '3px', border: '1px', borderColor: 'red'}}>
          <View style={{ width: '70px'}}>
            <Text style={{ fontSize: '10px', margin: 'auto'}}>Initial Visit</Text>
          </View>
          <View style={{ width: '120px'}}>
            <Text style={{ fontSize: '10px', margin: 'auto'}}>Indication</Text>
          </View>
          <View style={{ width: '70px'}}>
            <Text style={{ fontSize: '10px', margin: 'auto'}}>Last Status</Text>
          </View>
          <View style={{ width: '50px'}}>
            <Text style={{ fontSize: '10px', margin: 'auto'}}>Initials</Text>
          </View>
          <View style={{ width: '70px'}}>
            <Text style={{ fontSize: '10px', margin: 'auto'}}>DOB</Text>
          </View>
          <View style={{ width: '50px'}}>
            <Text style={{ fontSize: '10px', margin: 'auto'}}>ID Match</Text>
          </View>
          <View style={{ width: '70px'}}>
            <Text style={{ fontSize: '10px', margin: 'auto'}}>Site Name</Text>
          </View>
          <View style={{ width: '60px'}}>
            <Text style={{ fontSize: '10px', margin: 'auto'}}>Site Zip</Text>
          </View>
          <View style={{ width: '70px'}}>
            <Text style={{ fontSize: '10px', margin: 'auto'}}>Site Phone</Text>
          </View>
        </View>
        {/* table body */}    
        <View>                
          {data?.map((item: any, index: number) => (
            <View style={{ display: 'flex', flexDirection: 'row', fontSize: '8px', borderLeft: '1px', borderRight:'1px', borderBottom: '1px' }} key={index}>
              <Text style={{ width: '70px', padding: '2px', textAlign: 'center' }}>{item?.initialVisit}</Text>
              <Text style={{ width: '120px', padding: '2px',textAlign: 'center' }}>{item?.indications?.join(', ')}</Text>
              <Text style={{ width: '70px', padding: '2px', textAlign: 'center' }}>{item?.lastStatus}</Text>
              <Text style={{ width: '50px', padding: '2px', borderLeft: '1px', borderColor: 'red', textAlign: 'center' }}>{item?.initials}</Text>
              <Text style={{ width: '70px', padding: '2px', textAlign: 'center' }}>{item?.dob}</Text>
              <Text style={{ width: '50px', padding: '2px', borderRight: '1px', borderColor: 'red', textAlign: 'center' }}>
                {item?.idMatch ? 'Yes' : 'No'}
              </Text>
              <Text style={{ width: '70px', padding: '2px', textAlign: 'center' }}>{item?.siteName}</Text>
              <Text style={{ width: '60px', padding: '2px', textAlign: 'center' }}>{item?.siteZip}</Text>
              <Text style={{ width: '70px', padding: '2px', textAlign: 'center' }}>{item?.sitePhone}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}