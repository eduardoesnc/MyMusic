import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LogBox } from 'react-native';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player.js'


export default function App() {

  LogBox.ignoreAllLogs(true);


  const [audioIndex, setarAudioIndex] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [audio,setarAudio] = useState(null);

  const [musicas, setarMusicas] = useState([

    {
      nome: 'Sweet child of mine',
      artista: 'Guns N Roses',
      playing: false,
      file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'},
    },
    {
      nome: 'Freio da blazer',
      artista: 'L7nnon',
      playing: false,
      file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3'},
    },
    {
      nome: 'M4 gritando meu nome',
      artista: 'Teto',
      playing: false,
      file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'},
    },
  ])

  const changeMusic = async (id) => {

    let curFile = null;

    let newMusic = musicas.filter((val, k)=> {
      if(id == k){
        musicas[k].playing = true;
        curFile = musicas[k].file
        setPlaying(true);
        setarAudioIndex(id);
      } else {
        musicas[k].playing = false;
      }

      return musicas[k];

    })

    if(audio != null){
      audio.unloadAsync();
    }
    
    let curAudio = new Audio.Sound();

    try{
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    }catch(error){}

    setarAudio(curAudio);
    setarMusicas(newMusic);
  }


  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.container}>
        <StatusBar hidden/>
        <View style={styles.header}>
          <Text style={{textAlign: 'center', color:'white', fontSize:25}}>MyMusic</Text>
        </View>

        <View style={styles.table}>
          <Text style={{width: '50%', color:'rgb(200,200,200)'}}>Música</Text>
          <Text style={{width: '50%', color:'rgb(200,200,200)'}}>Artista</Text>
        </View>
        
        {
          musicas.map((val, k)=>{
            
            if(val.playing){
              return(
              <View style={styles.table}>
                <TouchableOpacity onPress={()=> changeMusic(k)} style={{width: '100%', flexDirection: 'row' }}>
                  <Text style={styles.tableTextSelected}><AntDesign name="play" size={15} color="#fc8014" /> {val.nome}</Text>
                  <Text style={styles.tableTextSelected}>{val.artista}</Text>
                </TouchableOpacity>
              </View>
              );
            }else {
              return(
                <View style={styles.table}>
                <TouchableOpacity onPress={()=> changeMusic(k)} style={{width: '100%', flexDirection: 'row' }}>
                  <Text style={styles.tableText}><AntDesign name="play" size={15} color="white" /> {val.nome}</Text>
                  <Text style={styles.tableText}>{val.artista}</Text>
                </TouchableOpacity>
                </View>
                );
            }

          })

        }

        <View style={{paddingBottom: 200}}></View>
      </ScrollView>
      <Player playing={playing} setPlaying={setPlaying} audioIndex={audioIndex} setarAudioIndex={setarAudioIndex} musicas={musicas}
        setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}>

        </Player>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    backgroundColor: '#fc8014',
    width: '100%',
    padding: 20,
  },
  table: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  tableTextSelected: {
    width: '50%',
    color:'#fc8014',
  },
  tableText: {
    width: '50%',
    color:'white',
  },
});
