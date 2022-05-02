import React ,{FC} from 'react'
import { Box, Button, Icon, IconButton, SimpleGrid, useTheme} from '@chakra-ui/react'
import {FaVideoSlash,FaDownload,FaCamera} from 'react-icons/fa'

//@ts-ignore
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc'
import { useState } from 'react'
//@ts-ignore
import {Player} from 'video-react'
import 'video-react/dist/video-react.css'
import {saveAs} from 'file-saver'




type RecordType='video'| 'screen'


const MainRecoder: FC = ()=> {
 const theme = useTheme()
const [recorder,setRecorder]=useState<RecordRTC | null>()
const [stream,setStream]=useState<MediaStream | null>()
const [videoBlob,setVideoBlob]=useState<Blob | null>()
const [type,setType]=useState<RecordType>('video')


 const startRecording = async() =>{
     const mediaDevices = navigator.mediaDevices
     const stream: MediaStream= type === 'video' ?
       await mediaDevices.getUserMedia({
         video:true,
         audio:true,
     }) 
     : await (mediaDevices as any ).getDisplayMedia({
         video: true,
         audio:false,
        })
     let RecordRTC = require('recordrtc')
    const recorder = new RecordRTC. RecordRTCPromisesHandler(stream,{
        type:'video',
    })
        await recorder.startRecording()
        
        setRecorder(recorder) 
        setStream(stream)
       
 }

 const stopRecording = async() =>{
     if(recorder){

         await recorder.stopRecording()
         const blob: Blob = await recorder.getBlob()
         setVideoBlob(blob);
        (stream as any).stop()
         setStream(null)
         setRecorder(null)
        }
 }

const changeType = () => {
    if(type === 'screen'){
        setType('video')
    } else{
        setType('screen')
    }
}

const downloadVideo = () => {
    if(videoBlob){
        saveAs(videoBlob,`video.${Date.now()}.webm`)

    }
}


  return (
      <div>
          <SimpleGrid p="5" spacing ="5">

          <Box 
          display="flex"
          justifyContent="center"
          flexDirection={[
              'column',
              'row',
              'row',
              'row',
          ]}
          >
              <Button
               m='1' 
               bg={theme.colors.red[800]} 
               size="lg" 
               color="white"
               onClick={changeType}
               >
                  {type === 'video'? 'Record Video' : 'RecordScreen'}
              </Button>

              <IconButton 
              m="1"
            bg={theme.colors.green[500]}
              size="lg"
              aria-label="start recording"
              icon={<Icon as={FaCamera} />}
              onClick={startRecording}
              disabled={!!recorder} 
              />
             <IconButton 
              m="1"
            bg={theme.colors.green[500]}
              size="lg"
              aria-label="stop recording"
              icon={<Icon as={FaVideoSlash} />}
              disabled={recorder ? false : true}
              onClick={stopRecording}
              />
              <IconButton 
              m="1"
            bg={theme.colors.green[500]}
              size="lg"
              aria-label="download recording"
              icon={<Icon as={FaDownload} />}
              disabled={!videoBlob}
              onClick={downloadVideo}
              />

          </Box>
          <Box display="flex" justifyContent="center" >
<Box h="50vh" width={['100','100','80vw','50vh']} m='10' bg={!! videoBlob ? 'inherit' : 'blue.50'}>
    { !! videoBlob &&  <Player src={window.URL.createObjectURL(videoBlob)} />}

</Box>
          </Box>
          </SimpleGrid>
      </div>
  )
}

export default MainRecoder