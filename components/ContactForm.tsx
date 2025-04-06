"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useTranslation } from 'react-i18next'; // Removed i18n
import { CheckCircle2, Loader2 } from 'lucide-react'; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast"; 
// Removed unused import: import { cn } from "@/lib/utils";

// Define a more specific type for the translation function
type TranslationFunc = (key: string, fallback: string) => string;

// Placeholder function for t
const t: TranslationFunc = (key: string, fallback: string) => fallback;

const createContactFormSchema = (tFunc: TranslationFunc) => z.object({
  Name: z.string()
    .min(2, { message: tFunc('contact.errors.name.min', 'Name must be at least 2 characters.') })
    .max(50, { message: tFunc('contact.errors.name.max', 'Name must be 50 characters or less.') }),
  Email: z.string()
    .email({ message: tFunc('contact.errors.email', 'Please enter a valid email address.') }),
  Message: z.string()
    .min(5, { message: tFunc('contact.errors.message.min', 'Message must be at least 5 characters.') })
    .max(500, { message: tFunc('contact.errors.message.max', 'Message must be 500 characters or less.') })
});

type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

export function ContactForm() {
  // const { t } = useTranslation(); // Removed i18n
  const contactFormSchema = createContactFormSchema(t); // Use placeholder t

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      Name: '',
      Email: '',
      Message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    if (!FORM_ENDPOINT) {
        console.error("Contact form endpoint URL is not configured.");
        toast({ title: t('contact.errors.submit.title', "Submission Error"), description: t('contact.errors.config', 'Form configuration error. Please contact support.'), variant: "destructive" });
        setIsSubmitting(false);
        return;
    }
    
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setFormSubmitted(true);
        form.reset(); 
        toast({ title: t('contact.success.toast.title', "Message Sent!"), description: t('contact.success.toast.desc', 'We will get back to you soon.') });
      } else {
        const errorText = await response.text();
        console.error('Form submission error:', response.status, errorText);
        toast({ title: t('contact.errors.submit.title', "Submission Error"), description: t('contact.errors.submit', 'Failed to send message. Please try again.'), variant: "destructive" });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({ title: t('contact.errors.submit.title', "Submission Error"), description: t('contact.errors.submit.network', 'An unexpected network error occurred. Please try again.'), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted) {
     return (
      <div className="text-center py-8 bg-white p-8 rounded-lg shadow-lg border border-green-200 flex flex-col items-center justify-center min-h-[400px]">
        <div className="mb-6 text-green-500">
          <CheckCircle2 className="h-16 w-16 mx-auto" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-serif-kr font-bold mb-4 text-warm-gray-dark">
          {t('contact.success', 'Thank you!')}
        </h3>
        <p className="text-text-primary mb-6 max-w-sm">
          {t('contact.successMessage', 'Your message has been sent successfully. We will contact you soon.')}
        </p>
        <Button 
          onClick={() => setFormSubmitted(false)}
          variant="outline"
          className="py-3 px-8"
        >
          {t('contact.sendAnother', 'Send Another Message')}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <div className="mb-8 text-center">
        <h3 className="font-serif-kr text-3xl font-bold mb-3 text-primary-red">
          {t('contact.title', 'Contact Us')}
        </h3>
        <p className="text-text-primary text-lg font-medium">
          {t('contact.description', 'Questions or suggestions? Fill out the form...')}
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-warm-gray-dark">
                  {t('contact.name', 'Name')} <span className="text-primary-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t('contact.name.placeholder', 'Your Name')} 
                    {...field} 
                    className="py-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-warm-gray-dark">
                  {t('contact.email', 'Email')} <span className="text-primary-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={t('contact.email.placeholder', 'your.email@example.com')}
                    {...field} 
                    className="py-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-warm-gray-dark">
                  {t('contact.message', 'Message')} <span className="text-primary-red">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    rows={5} 
                    placeholder={t('contact.message.placeholder', 'Your message here...')} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="hidden" aria-hidden="true">
            <Label htmlFor="_gotcha">Don&apos;t fill this out if you&apos;re human:</Label>
            <Input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="bg-primary-red hover:bg-red-700 text-white py-4 px-10 text-lg font-bold transition-all hover:scale-105 shadow-lg"
              disabled={isSubmitting || !FORM_ENDPOINT} 
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  {t('contact.processing', 'Processing...')}
                </>
              ) : (
                t('contact.submit', 'Send Message')
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
