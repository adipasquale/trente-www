/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useEffect, useState } from 'react'
import { theme, ThemeProvider, Box, Text, Image, Button } from '@chakra-ui/core'
import './App.css'
import NewGuestForm from './components/NewGuestForm'
import Jess from './images/jess.png'
import Kanye from './images/kanye.png'
import Barak from './images/barak.png'
import gite1 from './images/gite/gite1.jpg'
import gite2 from './images/gite/gite2.jpg'
import gite3 from './images/gite/gite3.jpg'
import gite4 from './images/gite/gite4.jpg'
import gite5 from './images/gite/gite5.jpg'
import gite6 from './images/gite/gite6.jpg'
const srcGite = [gite1, gite2, gite3, gite4, gite4, gite5, gite6]
const photosGite = srcGite.map(src => ({ src }))

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.trente.dipasquale.fr/v1' : 'http://localhost:3001/v1'

const Gallery = ({ photos, photoSize = 150 }) => (
  <Box display='flex' overflow='scroll' paddingBottom={3}>
    {photos.map(({ src, title }, idx) =>
      <Box
        key={idx}
        flexShrink={0}
        width={photoSize}
        border='1px solid #ccc'
        rounded='lg'
        overflow='hidden'
        marginLeft={idx > 0 ? 2 : 0}
      >
        <Image objectFit='cover' maxHeight={photoSize} src={src} />
        {title &&
          <Box p={2} textAlign='center'>
            <Text>{title}</Text>
          </Box>}
      </Box>
    )}
  </Box>
)

function App () {
  const [guests, setGuests] = useState([])
  useEffect(() => {
    window.fetch(`${apiUrl}/guests`)
      .then(res => res.json())
      .then(data => setGuests(data))
  }, [])
  const addGuest = (guest) => {
    setGuests([guest, ...guests])
  }
  const guestsPhotos = (
    guests.map(g => ({ title: g.name, src: g.photoUrl }))
      .concat(
        [
          { src: Barak, title: 'Bob' },
          { src: Kanye, title: 'K' },
          { src: Jess, title: 'Jess' }
        ]
      )
  )
  return (
    <ThemeProvider theme={theme}>
      <Box maxWidth={500} margin='auto' p={2} paddingBottom={6}>
        <Box>
          <Text as='h1'>🎉 30 ans d'Adrien 🎉</Text>
          <Text>
            Vous êtes chaleureusement conviés à un week-end pour fêter mon
            passage à l'âge adulte (peut-être). Famille, amis, anciens et nouveaux ça devrait teufer
          </Text>
        </Box>
        <Box>
          <Text as='h2'>C'est quand ?</Text>
          <Text>Du vendredi 17 juillet après-midi au dimanche 18 après-midi</Text>
          <Button variant='link'>Ajouter au calendrier</Button>
        </Box>
        <Box>
          <Text as='h2'>C'est où ?</Text>
          <Text>au Moulin des Gondrillers, à 1h30 à l'ouest de Paris</Text>
          <Gallery photos={photosGite} photoSize={250} />
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
          <Text as='h2'>Qu'est-ce qu'on va faire ?</Text>
          <ul>
            <li>Se la kiffer dans la piscine</li>
            <li>Se la kiffer dehors</li>
            <li>Se la kiffer dedans</li>
            <li>La fête</li>
            <li>Apéros fluvial sur barques</li>
            <li>Piste de ski artificiel dans le moulin</li>
            <li>Lucha Libre</li>
            <li>Norebang</li>
            <li>Atelier "J'apprends les noeuds marins" animé par Louis</li>
          </ul>
        </Box>
        <Box>
          <Text as='h2'>Qui est invité ?</Text>
          <Text>Tout le monde qui arrive ici est convié !</Text>
          <Text>
            Les enfants et les +1 sont les bienvenus.
            Il y a 30 couchages officiels, et si on est plus on s'arrangera
            avec des matelas ou on enverra David dormir sur une barque.
          </Text>
        </Box>
        <Box>
          <Text as='h2'>Combien ça coûte ?</Text>
          <Text>Le gîte est à la charge d'OUT OF SCREEN 🚀 merci l'informatique.</Text>
          <Text>
            Il vous reste donc le transport et on fera probablement une petite
            collecte pour les vivres et les produits liquides festifs.
          </Text>
        </Box>
        <Box>
          <Text as='h2'>Qui sera là ?</Text>
          <Text>
            On est {guests.length} pour l'instant, on n'attend que toi
          </Text>
          <Gallery photos={guestsPhotos} />
        </Box>
        <NewGuestForm addGuest={addGuest} apiUrl={apiUrl} />
      </Box>
    </ThemeProvider>
  )
}

export default App
