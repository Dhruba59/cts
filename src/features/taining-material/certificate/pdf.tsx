import { CTS_LOGO_BASE64 } from "@/assets/image/base64-image";
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
  const attendDate = dayjs(data?.data?.quizAttendDate).format("MMM DD, YYYY");
 
  return (
    <Document style={{}} title={` Certificate of Completion for ${data?.data?.trainingName} issued by ${data?.data?.userName}`}>
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