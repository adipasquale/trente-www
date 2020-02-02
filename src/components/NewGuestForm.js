/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from 'react'
import { Box, Text, Button, Input, Stack } from '@chakra-ui/core'
import browserUUID from '../lib/browserUUID'

const NewGuestForm = ({ addGuest, apiUrl }) => {
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([])
  const formElt = React.createRef()

  const onSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    window.fetch(`${apiUrl}/guests`, {
      method: 'POST',
      body: new window.FormData(formElt.current)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          addGuest(data.guest)
          setSuccess(true)
        } else if (data.errors) {
          setErrors(data.errors)
        }
      })
      .catch(() =>
        window.alert('déso il y a eu un petit souci ... écris moi !')
      )
    return false
  }
  if (success) {
    return (
      <Box padding={6} textAlign='center'>
        Merciiii à vite 😘
      </Box>
    )
  }
  return (
    <Box>
      <Text as='h2' className='register'>
        🙋🏽‍♀️ <strong>OK</strong> je viens !
      </Text>
      <Text>
        Bon choix ! inscris-toi <i>per favore</i>, c'est plus simple pour organiser 🙇‍♂️ Les selfies sont obligatoires pour cause de divertissement personnel.
      </Text>
      <form onSubmit={onSubmit} ref={formElt}>
        <Stack spacing={3}>
          <Box display='flex'>
            <Box minWidth={60} marginRight={2} paddingTop={3} textAlign='right'>
              <label htmlFor='guest[name]'>
                Nom(s)
              </label>
            </Box>
            <Box flex={1} display='flex' flexDirection='column'>
              <Input
                width='auto'
                name='guest[name]'
                isInvalid={Object.keys(errors).indexOf('name') >= 0}
                placeholder='Martin'
                id='name'
              />
              {Object.keys(errors).indexOf('name') >= 0 &&
                <Text marginTop={0} color='red.600'>{errors.name[0]}</Text>}
            </Box>
          </Box>
          <Box display='flex'>
            <Box minWidth={60} marginRight={2} textAlign='right' paddingTop={3}>
              <label htmlFor='guest[email]'>
                Email
              </label>
            </Box>
            <Box flex={1} display='flex' flexDirection='column'>
              <Input
                width='auto'
                isInvalid={Object.keys(errors).indexOf('email') >= 0}
                name='guest[email]'
                placeholder='martin@scorsese.com'
                id='email'
              />
              {Object.keys(errors).indexOf('email') >= 0 &&
                <Text marginTop={0} color='red.600'>{errors.email[0]}</Text>}
            </Box>
          </Box>
          <Box display='flex' alignItems='baseline'>
            <Box minWidth={60} marginRight={2} textAlign='right'>
              <label htmlFor='guest[photo]'>
                Selfie
              </label>
            </Box>
            <Box flex={1} display='flex' flexDirection='column'>
              <input
                name='guest[photo]'
                type='file'
                id='photo'
                accept='image/*'
                capture='user'
                border={0}
                style={{ paddingLeft: 0 }}
              />
              {Object.keys(errors).indexOf('photo') >= 0 &&
                <Text marginTop={0} color='red.600'>{errors.photo[0]}</Text>}
            </Box>
          </Box>
          <input type='hidden' name='guest[browser_uuid]' value={browserUUID} />
          <Button type='submit'>Inscription ⭐️</Button>
        </Stack>
      </form>
    </Box>
  )
}
export default NewGuestForm
