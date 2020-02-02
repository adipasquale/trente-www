import React from 'react'
import { Box, Text, Image } from '@chakra-ui/core'
import Jess from '../images/jess.png'
import Kanye from '../images/kanye.png'
import Barak from '../images/barak.png'

const GuestList = ({ guests, currentGuest }) => {
  const fakeGuests = [
    { src: Barak, title: 'Bob' },
    { src: Kanye, title: 'K' },
    { src: Jess, title: 'Jess' }
  ]
  const allGuests = guests.concat(fakeGuests)
  const guestsPhotos = guests.map(g => ({ title: g.name, src: g.photoUrl }))
    .concat(fakeGuests)
  return (
    <Box>
      {currentGuest &&
        <Text>
          On est {allGuests.length} pour l'instant, avec toi
        </Text>}
      {!currentGuest &&
        <Text>
          On est {allGuests.length} pour l'instant, on n'attend que toi
        </Text>}
      <Box display='flex' overflow='scroll' paddingBottom={3}>
        {guestsPhotos.map(({ src, title }, idx) =>
          <Box
            key={idx}
            flexShrink={0}
            width={150}
            border='1px solid #ccc'
            rounded='lg'
            overflow='hidden'
            marginLeft={idx > 0 ? 2 : 0}
          >
            <Image objectFit='cover' maxHeight={150} src={src} />
            {title &&
              <Box p={2} textAlign='center'>
                <Text>{title}</Text>
              </Box>}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default GuestList
