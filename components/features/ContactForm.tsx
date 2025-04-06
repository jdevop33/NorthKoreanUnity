'use client';

import { useState } from 'react';
import { z } from 'zod';
// Import ControllerRenderProps for explicit typing
import { useForm, ControllerRenderProps, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

// Form validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be 100 characters or less'),
  email: z.string()
    .email('Please enter a valid email address'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be 1000 characters or less')
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// HeroTofu endpoint from the requirement
const FORM_ENDPOINT = "https://public.herotofu.com/v1/cb3ceee0-1058-11f0-8dc2-010227905b4a";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create FormData for submission
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);
      
      // Post directly to HeroTofu endpoint
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormSubmitted(true);
        form.reset();
        toast({ 
          title: "Message Sent!", 
          description: "We will get back to you soon."
        });
      } else {
        const errorData = await response.text();
        console.error('Form submission error:', response.status, errorData);
        toast({ 
          title: "Submission Error", 
          description: "Failed to send message. Please try again.",
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({ 
        title: "Submission Error", 
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (formSubmitted) {
    return (
      <div className="text-center py-8 bg-white p-8 rounded-lg shadow-lg border border-green-200 flex flex-col items-center justify-center min-h-[400px]">
        <div className="mb-6 text-green-500">
          <CheckCircle2 className="h-16 w-16 mx-auto" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-serif-kr font-bold mb-4 text-warm-gray-dark">
          Thank you!
        </h3>
        <p className="text-text-primary mb-6 max-w-sm">
          Your message has been sent successfully. We will contact you soon.
        </p>
        <Button 
          onClick={() => setFormSubmitted(false)}
          variant="outline" // Assuming 'outline' is a valid variant defined in buttonVariants
          className="py-3 px-8"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <div className="mb-8 text-center">
        <h3 className="font-serif-kr text-3xl font-bold mb-3 text-primary-red">
          Contact Us
        </h3>
        <p className="text-text-primary text-lg font-medium">
          Questions or suggestions? Fill out the form below.
        </p>
      </div>
      
      {/* Primary form for client-side validation */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            // Add explicit type for the 'field' parameter
            render={({ field }: { field: ControllerRenderProps<ContactFormValues, 'name'> }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-warm-gray-dark">
                  Name <span className="text-primary-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your Name" 
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
            name="email"
            // Add explicit type for the 'field' parameter
            render={({ field }: { field: ControllerRenderProps<ContactFormValues, 'email'> }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-warm-gray-dark">
                  Email <span className="text-primary-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com"
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
            name="message"
            // Add explicit type for the 'field' parameter
            render={({ field }: { field: ControllerRenderProps<ContactFormValues, 'message'> }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-warm-gray-dark">
                  Message <span className="text-primary-red">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    rows={5} 
                    placeholder="Your message here..." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Honeypot field for spam prevention */}
          <div className="hidden" aria-hidden="true">
            <Label htmlFor="_gotcha">Don&apos;t fill this out if you&apos;re human:</Label>
            <Input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </div>
          
          {/* Fallback form that points directly to HeroTofu (for non-JS environments) */}
          <noscript>
            <div className="mt-4 p-4 bg-yellow-50 rounded-md">
              <p className="text-yellow-800 text-sm">JavaScript is disabled. Please use the form below.</p>
              <form 
                action={FORM_ENDPOINT}
                method="post" 
                acceptCharset="UTF-8"
                className="mt-4"
              >
                <Input name="name" placeholder="Your Name" required className="mb-2" />
                <Input name="email" type="email" placeholder="your.email@example.com" required className="mb-2" />
                <Textarea name="message" placeholder="Your message here..." required className="mb-2" />
                <Button type="submit">Send Message</Button>
              </form>
            </div>
          </noscript>
          
          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              size="lg" // Assuming 'lg' is a valid size defined in buttonVariants
              className="bg-primary-red hover:bg-red-700 text-white py-4 px-10 text-lg font-bold transition-all hover:scale-105 shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Processing...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
