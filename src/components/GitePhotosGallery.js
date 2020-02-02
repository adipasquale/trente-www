import React, { useState } from 'react'
import { Box, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/core'

import p1 from '../images/gite/gite1.jpg'
import p2 from '../images/gite/gite2.jpg'
import p3 from '../images/gite/gite3.jpg'
import p4 from '../images/gite/gite4.jpg'
import p5 from '../images/gite/gite5.jpg'
import p6 from '../images/gite/gite6.jpg'
import p7 from '../images/gite/gite7.jpg'
import p8 from '../images/gite/gite8.jpg'
import p9 from '../images/gite/gite9.jpg'
import p10 from '../images/gite/gite10.jpg'
import p11 from '../images/gite/gite11.jpg'
const photos = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11]

const GitePhotosGallery = () => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [displayedPhoto, setDisplayedPhoto] = useState()

  return (
    <>
      <Box display='flex' overflowY='scroll' paddingBottom={3}>
        {photos.map((photo, idx) =>
          <Box
            key={idx}
            flexShrink={0}
            width={250}
            height={250}
            rounded='lg'
            overflow='hidden'
            marginLeft={idx > 0 ? 2 : 0}
            p={0}
          >
            <Image
              width='100%'
              height='100%'
              objectFit='cover'
              src={photo}
              m={0}
              onClick={(e) => {
                setDisplayedPhoto(photo)
                onModalOpen()
              }}
            />
          </Box>
        )}
      </Box>
      <Modal
        isCentered
        maxWidth='80vh'
        size='4xl'
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <ModalOverlay />
        <ModalContent p={3} backgroundColor='rgba(255,255,255, 0.5)'>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign='center'>
              <Image
                src={displayedPhoto}
                maxWidth='100%'
                maxHeight='80vh'
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GitePhotosGallery
