'use server'

import { z } from 'zod'
import { ContactFormData } from '@/types'

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be 100 characters or less' }),
  email: z.string()
    .email({ message: 'Please enter a valid email address' }),
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be 1000 characters or less' })
})

// Type for the server action result
interface ContactFormResult {
  success: boolean
  message: string
  data?: ContactFormData
}

/**
 * Server Action to handle contact form submissions
 */
export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  // Validate honeypot field for spam prevention
  const honeypot = formData.get('_gotcha')
  if (honeypot && honeypot.toString().length > 0) {
    // This is likely a bot submission
    return {
      success: false,
      message: 'Form submission rejected',
    }
  }

  try {
    // Extract form data
    const data = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    }

    // Validate form data
    const validatedData = contactFormSchema.safeParse(data)
    
    if (!validatedData.success) {
      // Return validation errors
      const errorMessage = validatedData.error.errors[0]?.message || 'Invalid form data'
      return {
        success: false,
        message: errorMessage,
      }
    }

    // Here you would typically:
    // 1. Send an email
    // 2. Store in database
    // 3. Forward to an API
    
    // For now, we'll just simulate a successful submission
    console.log('Contact form submission:', validatedData.data)
    
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      success: true,
      message: 'Thank you! Your message has been received.',
      data: validatedData.data,
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    }
  }
}