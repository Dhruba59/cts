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
        <ReportTable title='Virtually Certain Matches' primaryColor="red" data={data?.certainMatches}/>
        <ReportTable title='Possible  Matches' primaryColor="blue" data={data?.possibleMatches}/>
        <ReportTable title='Probable  Matches' primaryColor="blue" data={data?.probableMatches}/>
      </View>
      <StatusDisclaimer data={data}/>
      <Comment comment={data?.comments} />
      <View wrap={false} style={{ width: '100%,', margin: 'auto', display:"flex", justifyContent:"center", alignItems: 'center' }}>
        <View style={{ width: '80%,', marginTop: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap:'1px', alignItems: 'center', borderTop: '1px', borderBottom: '1px', padding: '10px 0px' }}>
          <Text style={{fontSize: '10px'}}>PS = Prescreen, EOT = End Of Treatment</Text>
          <Text style={{fontSize: '10px'}}>Please print a copy of subject file</Text>
          <Text style={{fontSize: '8px'}}>If any of above information is incorrect, please contact us at support@ctsdatabase.com</Text>
          <Text style={{fontSize: '8px'}}>or 1-855 CTS-CTSd(1-855-287-2873)</Text>
        </View>
      </View>
      
      <Footer printTime={printTime}/>  
    </Page>
  </Document>
  );
}

export default ReprintPdf;

interface CommentProps {
  comment: string;
}

const StatusDisclaimer = ({ data }: any) => {
  const isAnyTableDataExist = data?.certainMatches?.length > 0 || data?.possibleMatches?.length > 0 || data?.probableMatches?.length > 0;
  if(isAnyTableDataExist) return (
    <Text wrap={false} style={{ fontSize: '8px', textAlign: 'center', margin: '10px'}}>
      * Any statuses that are blank have not yet been reported to CTSdatabase. You may need to call this site for more information.
    </Text>
  );
  return <></>;
}

const Comment = ({ comment }: CommentProps) => (
  <View wrap={false}  style={{ display: 'flex', flexDirection: 'column', gap: '', marginTop: '6px' }}>
    <View style={{ width: '80px', marginLeft:'6px', height: '20px', backgroundColor: '#5581c9', color: 'white', fontSize: '10px' }}><Text style={{ margin: 'auto' }}>Comments</Text></View>
    <Text style={{ fontSize: '8px', backgroundColor: '#e3dddc', padding: '2px', minHeight: '18px' }}>{comment}</Text>
  </View>
);


const SearchInfo = ({ data }: SearchProps) => {
  return (
    <View wrap={false}  style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', marginTop: '14px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto', alignItems:'center', rowGap: '3px', width: '80%', paddingTop: '10px', paddingBottom: '10px', borderTop: '.5px', borderBottom: '.5px'}}>
      <Text style={{ fontSize: '10px', margin: 'auto', fontStyle: 'italic' }}>Search Parameters:</Text>
      <View style={{ display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
        <Text style={{ fontSize: '10px', color: '#404040' }}>Indication: <Text style={{ fontSize: '10px', color: 'black' }}>{data?.indication}</Text></Text>
        <Text style={{ fontSize: '10px', color: '#404040' }}>Subject Number: <Text style={{ fontSize: '10px', color: 'black' }}>{data?.subjectNumber}</Text></Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', columnGap: '15px', justifyContent: 'center' }}>
        <Text style={{ fontSize: '10px', color: '#404040' }}>Initials: <Text style={{ fontSize: '10px', color: 'black' }}>{data?.initials}</Text></Text>
        <Text style={{ fontSize: '10px', color: '#404040' }}>DOB: <Text style={{ fontSize: '10px', color: 'black' }}>{data?.dob}</Text></Text>
        <Text style={{ fontSize: '10px', color: '#404040' }}>Sex: <Text style={{ fontSize: '10px', color: 'black' }}>{data?.gender}</Text></Text>
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
          <Text style={{ fontSize: '14px', marginLeft: 'auto', color: '#404040' }}>Match Report</Text>
        </View>
        <View style={{height: '60px', width: '1px', backgroundColor: 'black', marginLeft: '10px', marginRight: '10px'}}></View>
        <View style={{marginTop: 'auto', marginBottom: 'auto', display: 'flex', flexDirection: 'column', gap: '2px'}}>
          <Text style={{fontSize: '10px',  color: '#404040'}}>Date: <Text style={{fontSize: '10px', color: 'black'}}>{data?.date}</Text></Text>
          <Text style={{fontSize: '10px', color: '#404040'}}>Site: <Text style={{fontSize: '10px', color: 'black'}}>{data?.site}</Text></Text>
          <Text style={{fontSize: '10px', color: '#404040'}}>Protocol: <Text style={{fontSize: '10px', color: 'black'}}>{data?.protocol}</Text></Text>
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


const ReportTable = ({ title, data, primaryColor}: any) => {
  
  if(!data || data?.length < 1) {
    return <></>;
  }

  return (
    <View wrap={false} >
      <Text style={{ fontSize:'10px', color: primaryColor, marginBottom: '8px' }}>{title} | <Text style={{ color: 'black'}}> Identifiers matched closely enough that the odds are less than 1 in 10 million to occur by chance</Text> </Text>
      <View>
        {/* header */}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', fontSize: '11px', padding: '3px'}}>
          <Text>Visit Information</Text>
          <Text style={{ paddingLeft: '10px'}}>Identifiers Reported</Text>
          <Text>Site Information</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: primaryColor === 'red' ? '#f9e5e6' : '#EEF6FB', padding: '3px', border: '1px', borderColor: primaryColor === 'red' ? 'red' : 'blue' }}>
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