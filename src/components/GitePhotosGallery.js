import React from 'react'
import { Box, Image } from '@chakra-ui/core'

import p1 from '../images/gite/gite1.jpg'
import p2 from '../images/gite/gite2.jpg'
import p3 from '../images/gite/gite3.jpg'
import p4 from '../images/gite/gite4.jpg'
import p5 from '../images/gite/gite5.jpg'
import p6 from '../images/gite/gite6.jpg'
const photos = [p1, p2, p3, p4, p4, p5, p6]

const GitePhotosGallery = () => (
  <Box display='flex' overflow='scroll' paddingBottom={3}>
    {photos.map((photo, idx) =>
      <Box
        key={idx}
        flexShrink={0}
        width={250}
        border='1px solid #ccc'
        rounded='lg'
        overflow='hidden'
        marginLeft={idx > 0 ? 2 : 0}
      >
        <Image objectFit='cover' maxHeight={250} src={photo} />
      </Box>
    )}
  </Box>
)

export default GitePhotosGallery
