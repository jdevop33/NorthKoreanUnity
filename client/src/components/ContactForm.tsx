import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const contactFormSchema = z.object({
  Name: z.string().min(2, '이름을 입력해주세요').max(50),
  Email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  Message: z.string().min(5, '메시지를 입력해주세요').max(500)
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
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
    
    try {
      const response = await fetch('https://public.herotofu.com/v1/cb3ceee0-1058-11f0-8dc2-010227905b4a', {
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
      } else {
        console.error('Form submission error:', await response.text());
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-warm-gray-light p-8 rounded-lg shadow-lg">
      {formSubmitted ? (
        <div className="text-center py-8">
          <div className="mb-6 text-primary-red">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif-kr font-bold mb-4 text-warm-gray-dark">감사합니다!</h3>
          <p className="text-text-primary mb-6">귀하의 메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.</p>
          <button 
            onClick={() => setFormSubmitted(false)}
            className="btn btn-primary"
          >
            다른 메시지 보내기
          </button>
        </div>
      ) : (
        <>
          <h3 className="font-serif-kr text-2xl font-semibold mb-6 text-warm-gray-dark text-center">연락하기</h3>
          <p className="text-text-primary mb-8 text-center">
            질문이나 제안이 있으신가요? 아래 양식을 작성하시면 빠른 시일내에 답변 드리겠습니다.
          </p>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-warm-gray-dark">
                이름 <span className="text-primary-red">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red"
                {...form.register('Name')}
                required
              />
              {form.formState.errors.Name && (
                <p className="mt-1 text-primary-red text-sm">{form.formState.errors.Name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-warm-gray-dark">
                이메일 <span className="text-primary-red">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red"
                {...form.register('Email')}
                required
              />
              {form.formState.errors.Email && (
                <p className="mt-1 text-primary-red text-sm">{form.formState.errors.Email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-warm-gray-dark">
                메시지 <span className="text-primary-red">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red"
                {...form.register('Message')}
                required
              ></textarea>
              {form.formState.errors.Message && (
                <p className="mt-1 text-primary-red text-sm">{form.formState.errors.Message.message}</p>
              )}
            </div>
            
            {/* Honeypot field */}
            <div style={{ display: 'none' }}>
              <input type="text" name="_gotcha" tabIndex={-1} />
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="btn btn-primary py-3 px-8 font-medium text-base transition-transform hover:scale-105 inline-flex items-center shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    처리 중...
                  </>
                ) : (
                  '메시지 보내기'
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}