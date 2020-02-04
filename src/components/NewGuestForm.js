/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from 'react'
import { Box, Text, Button, Input, Stack, Spinner, useToast } from '@chakra-ui/core'
import browserUUID from '../lib/browserUUID'

const NewGuestForm = ({ addGuest, apiUrl }) => {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState([])
  const formElt = React.createRef()

  const onSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isSubmitting) return
    setIsSubmitting(true)
    window.fetch(`${apiUrl}/guests`, {
      method: 'POST',
      body: new window.FormData(formElt.current)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          addGuest(data.guest)
          toast({
            title: 'Merciiii à vite 😘',
            status: 'success'
          })
        } else if (data.errors) {
          setErrors(data.errors)
        }
        setIsSubmitting(false)
      })
      .catch(() => {
        window.alert('déso il y a eu un petit souci ... écris moi !')
        setIsSubmitting(false)
      })
    return false
  }

  return (
    <Box>
      <Text as='h2' className='register'>
        🙋🏽‍♀️ <strong>OK</strong> je viens !
      </Text>
      <Text>
        Bon choix ! inscris-toi <i>per favore</i>, c'est plus simple pour organiser 🙇‍♂️
      </Text>
      <Text>
        Les selfies <b>inédits</b> sont obligatoires pour cause de divertissement personnel. Contrôles à l'entrée du moulin par Melak le videur et ses biceps hors-normes.
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              {Object.keys(errors).indexOf('photo') >= 0 &&
                <Text marginTop={0} color='red.600'>{errors.photo[0]}</Text>}
            </Box>
          </Box>
          <input type='hidden' name='guest[browser_uuid]' value={browserUUID} />
          <Button type='submit' disabled={isSubmitting}>
            {!isSubmitting && 'Inscription ⭐️'}
            {isSubmitting &&
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='sm'
              />}
          </Button>
        </Stack>
        <Box marginTop={3} color='#666'>
          <small>
            mais, mais, mais je m'appelle David j'ai pas de smartphone,{' '}
            <a
              href='#'
              style={{ color: '#666' }}
              onClick={e => {
                e.preventDefault()
                window.alert('débrouille-toi 😘')
              }}
            >
              comment fais-je ?
            </a>
          </small>
        </Box>
      </form>
    </Box>
  )
}
export default NewGuestForm
