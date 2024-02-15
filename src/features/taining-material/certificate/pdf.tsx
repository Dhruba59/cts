import { CTS_LOGO_BASE64 } from "@/assets/image/base64-image";
import { formatDate } from "@/utils/helpers";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    paddingTop: '60px',
    paddingBottom: '60px'
  },
  section: {
    margin: 10,
    padding: 10,
    // flexGrow: 1
  },

});

const CertificatePdf = ({ data }: any) => {
  console.log(data);
  const attendDate = dayjs(data?.data?.quizAttendDate).format("MMM DD, YYYY");
  // const printTime = dayjs(new Date()).format("DD-MMM-YY HH:mm A");
  return (
    <Document style={{}}>
      <Page size="A4" orientation="landscape" style={styles.page}>
      {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}> */}
        <View style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
          <Text style={{fontSize: '30px', textAlign: 'center', textTransform: 'uppercase'}}>Certificate Of Completion</Text>
          <View style={{ height: "6px", backgroundColor: '#d11d2f', width: '100%', marginTop: '8px' }}></View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: '#404040'}}>
          <Text style={{ fontSize: '18px'}}>This is HEREBY GRANTED TO</Text>
          <Text style={{ fontSize: '44px', marginBottom: '18px', color: 'black'}}>{data?.data?.userName}</Text>
          <Text style={{ fontSize: '18px' }}>certifying successful completion of CTSDatabase Training for</Text>
          <Text style={{ fontSize: '18px'}}>{data?.data?.trainingName} on {attendDate}</Text>
        </View>
        <View style={{ width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginLeft: 'auto', marginRight: 'auto'}}>
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
            <Text style={{ fontSize: '14px', color: '#d11d2f' }}>Dr. Thomas Shiovits</Text>
            <Text style={{textTransform: 'uppercase', fontSize: '14px', color: '#404040'}}>President</Text>
          </View>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={{ width: '120px' , height: '80px'}} src={CTS_LOGO_BASE64}/>
        </View>
      {/* </View> */}
      </Page>
    </Document>
  );
}

export default CertificatePdf;








// <Header data={data?.headerInfo}/>
// {/* horizontal bar */}
// <View style={{  height: "3px", backgroundColor: '#5581c9', width: '100%' }}></View>
// <SearchInfo data={data?.searchInfo} />
// <View style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%'}}>
//   <ReportTable title='Virtually Certain Matches' primaryColor="red" data={data?.certainMatches}/>
//   <ReportTable title='Possible  Matches' primaryColor="blue" data={data?.possibleMatches}/>
//   <ReportTable title='Probable  Matches' primaryColor="blue" data={data?.probableMatches}/>
// </View>
// <StatusDisclaimer data={data}/>
// <Comment comment={data?.comments} />
// <View wrap={false} style={{ width: '100%,', margin: 'auto', display:"flex", justifyContent:"center", alignItems: 'center' }}>
//   <View style={{ width: '80%,', marginTop: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap:'1px', alignItems: 'center', borderTop: '1px', borderBottom: '1px', padding: '10px 0px' }}>
//     <Text style={{fontSize: '10px'}}>PS = Prescreen, EOT = End Of Treatment</Text>
//     <Text style={{fontSize: '10px'}}>Please print a copy of subject file</Text>
//     <Text style={{fontSize: '8px'}}>If any of above information is incorrect, please contact us at support@ctsdatabase.com</Text>
//     <Text style={{fontSize: '8px'}}>or 1-855 CTS-CTSd(1-855-287-2873)</Text>
//   </View>
// </View>

// <Footer printTime={printTime}/>  