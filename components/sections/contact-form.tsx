"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage, type Locale } from '@/contexts/language-context'

const contactCopy: Record<Locale, {
  name: string
  email: string
  subject: string
  message: string
  send: string
  sending: string
  success: string
  error: string
}> = {
  en: {
    name: 'Name *',
    email: 'Email *',
    subject: 'Subject *',
    message: 'Message *',
    send: 'Send Message',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Failed to send message. Please try again.',
  },
  ro: {
    name: 'Nume *',
    email: 'Email *',
    subject: 'Subiect *',
    message: 'Mesaj *',
    send: 'Trimite mesajul',
    sending: 'Se trimite...',
    success: 'Mesaj trimis cu succes!',
    error: 'Mesajul nu a putut fi trimis. Incearca din nou.',
  },
}

export function ContactForm() {
  const { locale } = useLanguage()
  const copy = contactCopy[locale]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage(copy.success)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitMessage(data.error || copy.error)
      }
    } catch (error) {
      setSubmitMessage(copy.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {copy.name}
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {copy.email}
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            {copy.subject}
          </label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            {copy.message}
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full"
          />
        </div>

        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-soft-blue hover:bg-soft-blue-dark text-white font-poppins font-medium"
          >
            {isSubmitting ? copy.sending : copy.send}
          </Button>
        </div>

        {submitMessage && (
          <div className={`text-center p-4 rounded-lg ${
            submitMessage.includes(locale === 'ro' ? 'succes' : 'successfully')
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  )
}