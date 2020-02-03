import React, { useState } from 'react'
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, Button, AlertDialogBody, Text, useToast, Spinner } from '@chakra-ui/core'
import apiUrl from '../lib/apiUrl'
import browserUUID from '../lib/browserUUID'

const ConfirmDeleteGuest = ({ isOpen, setIsOpen, currentGuest, guests, setGuests }) => {
  const toast = useToast()
  const onClose = () => setIsOpen(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cancelCurrentGuest = async () => {
    if (!currentGuest || isSubmitting) return
    setIsSubmitting(true)
    const formData = new window.FormData()
    formData.set('browser_uuid', currentGuest.browser_uuid)
    const res = await window.fetch(
      `${apiUrl}/guests/${currentGuest.id}`,
      { method: 'DELETE', mode: 'cors', body: formData }
    )
    const data = await res.json()
    if (data.success) {
      setGuests(guests.filter(g => g.browser_uuid !== browserUUID))
      toast({
        title: 'désinscription confirmée !',
        status: 'success'
      })
      setIsOpen(false)
    } else {
      toast({
        title: 'erreur',
        description: data.errors[0],
        status: 'error'
      })
    }
  }
  const cancelRef = React.useRef()

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Désinscription
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              T'es sûr·e? 😭
              Tu peux toujours te réincrire après, pas de soucis !
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Retour
            </Button>
            <Button
              variantColor='red'
              onClick={cancelCurrentGuest} ml={3}
              disabled={isSubmitting}
            >
              {!isSubmitting && 'Confirmer désinscription'}
              {isSubmitting &&
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='sm'
                />}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ConfirmDeleteGuest
