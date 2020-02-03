/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useEffect, useState } from 'react'
import { theme, ThemeProvider, Box, Text, Image, Button, Stack, Spinner } from '@chakra-ui/core'
import './App.css'
import NewGuestForm from './components/NewGuestForm'
import GuestList from './components/GuestList'
import GitePhotosGallery from './components/GitePhotosGallery'
import browserUUID from './lib/browserUUID'
import me from './images/me.png'
import apiUrl from './lib/apiUrl'
function App () {
  const [guests, setGuests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    window.fetch(`${apiUrl}/guests`)
      .then(res => res.json())
      .then(data => {
        setGuests(data)
        setIsLoading(false)
      })
  }, [])
  const addGuest = (guest) => {
    setGuests([guest, ...guests])
  }
  const currentGuest = guests.find(g => g.browser_uuid === browserUUID)
  return (
    <ThemeProvider theme={theme}>
      <Box maxWidth={500} margin='auto' p={2} paddingBottom={50} backgroundColor='#fff'>
        <Stack spacing={30}>
          <Box p={3}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <Image src={me} maxWidth={60} animation='spin infinite 2s linear' borderRadius={50} marginRight={5} />
              <Text as='h1' fontSize='lg'>30 ans Adri</Text>
              <Image src={me} maxWidth={60} animation='spin-backwards infinite 2s linear' borderRadius={50} marginLeft={5} />
            </Box>
            <Text>
              Vous êtes chaleureusement convié·es à un week-end pour fêter mon
              passage à l'âge adulte. J'ai envie de réunir la famille et les différents groupes d'amis pour faire la fête tous ensemble !
            </Text>
            <Text fontSize='xl' textAlign='center'>🎉</Text>
            <Text>Facebook c'est has-been donc toutes les infos se trouvent ici et tu es invité·e à t'inscrire tout en bas</Text>
          </Box>
          <Box>
            <Text as='h2' className='when'>
              📅 C'est <strong>quand</strong> ?
            </Text>
            <Text>Du vendredi 17 juillet après-midi au dimanche 19 après-midi</Text>
            <a href='/30_ans_Adrien.ics'>
              Ajoute à ton calendrier numérique 2.0
            </a>
          </Box>
          <Box>
            <Text as='h2' className='where'>
              🌎 C'est <strong>où</strong> ?
            </Text>
            <Text>au Moulin des Gondrillers, à 1h30 à l'ouest de Paris</Text>
            <GitePhotosGallery />
            <Text>Adresse: 61300 St Martin d'Ecublei - Orne</Text>
            {/* <Image src={Map} alt='Map St Martin Ecublei' maxWidth={400} /> */}
            <Box p={3}>
              <iframe
                title='map'
                width='100%'
                height='350'
                frameBorder='0'
                scrolling='no'
                marginHeight='0'
                marginWidth='0'
                src='https://www.openstreetmap.org/export/embed.html?bbox=-3.043212890625%2C46.392411189814645%2C4.427490234375001%2C51.08282186160978&amp;layer=mapnik&amp;marker=48.79239019646409%2C0.692138671875'
              />
              <br />
              <small>
                <a href='https://www.openstreetmap.org/?mlat=48.792&amp;mlon=0.692#map=7/48.792/0.692'>
                  Voir la carte en grand
                </a>
              </small>
            </Box>
          </Box>
          <Box>
            <Text as='h2' className='activities'>
            🎳 Qu'est-ce qu'on va <strong>faire</strong> ?
            </Text>
            <ul>
              <li>Se la kiffer dans la piscine</li>
              <li>Se la kiffer dehors</li>
              <li>Se la kiffer dedans</li>
              <li>La fête</li>
              <li>Apéro fluvial sur les barques</li>
              <li>Piste de ski artificielle dans le moulin</li>
              <li>Lucha Libre</li>
              <li>노래방</li>
              <li>Atelier "J'apprends les noeuds marins" animé par Louis</li>
              <li>Découverte de la chasse au gibier conviviale</li>
            </ul>
          </Box>
          <Box>
            <Text as='h2' className='welcome'>
              🤼‍♀️ Qui est <strong>invité</strong> ?
            </Text>
            <Text>Tout le monde qui arrive ici est convié !</Text>
            <Text>
              Les enfants et les +1 sont les bienvenus.
              Il y a 30 couchages officiels, et si on est plus on s'arrangera
              avec des matelas ou on tirera à la courte-paille ceux qui dorment sur les barques.
            </Text>
          </Box>
          <Box>
            <Text as='h2' className='price'>
            💰 Combien ça <strong>coûte</strong> ?
            </Text>
            <Text>Le gîte est à la charge d'OUT OF SCREEN 🚀 merci l'informatique.</Text>
            <Text>
              Il vous reste donc le transport et on fera probablement une petite
              collecte pour les vivres et les produits liquides festifs.
            </Text>
          </Box>
          <Box>
            <Text as='h2' className='guests'>
              🤚 <strong>Qui</strong> sera là ?
            </Text>
            {isLoading &&
              <Box textAlign='center' p={5}>
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                />
              </Box>}
            {!isLoading &&
              <GuestList
                guests={guests}
                currentGuest={currentGuest}
                setGuests={setGuests}
              />}
          </Box>
          {!isLoading && !currentGuest &&
            <NewGuestForm addGuest={addGuest} apiUrl={apiUrl} />}
        </Stack>
      </Box>
    </ThemeProvider>
  )
}

export default App
