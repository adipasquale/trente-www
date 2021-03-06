import React, { useState } from 'react'
import { Box, Text, Image, Button } from '@chakra-ui/core'
import ConfirmDeleteGuest from './ConfirmDeleteGuest'

const GuestList = ({ guests, currentGuest, setGuests }) => {
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState()

  const guestsPhotos = guests.map(g => ({
    name: g.name,
    src: g.photoUrl,
    isCurrent: g === currentGuest
  }))
  return (
    <>
      <Text>
        On est {guests.length} pour l'instant,
        {currentGuest ? ' en te comptant' : ' on n\'attend que toi !'}
      </Text>
      <Box display='flex' overflow='scroll' paddingBottom={3}>
        {guestsPhotos.map(({ src, name, isCurrent, id }, idx) =>
          <Box
            key={id}
            flexShrink={0}
            width={150}
            border='1px'
            borderColor={isCurrent ? '#ff0000' : '#ccc'}
            rounded='lg'
            overflow='hidden'
            marginLeft={idx > 0 ? 2 : 0}
          >
            <Image width='100%' height={150} objectFit='cover' src={src} />
            <Box textAlign='center' padding={2}>
              <Text marginBottom={1} whiteSpace='nowrap' overflow='hidden'>
                {name}
              </Text>
              {isCurrent &&
                <Button size='xs' onClick={() => setConfirmDeleteModalIsOpen(true)}>
                  Désinscription
                </Button>}
            </Box>
          </Box>
        )}
      </Box>
      <ConfirmDeleteGuest
        isOpen={confirmDeleteModalIsOpen}
        setIsOpen={setConfirmDeleteModalIsOpen}
        currentGuest={currentGuest}
        guests={guests}
        setGuests={setGuests}
      />
    </>
  )
}

export default GuestList
