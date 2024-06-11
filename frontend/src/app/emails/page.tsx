"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Profile from '@/components/Profile';
import EmailCard from '@/components/EmailCard';
import EmailDrawer from '@/components/EmailDrawer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useFetch } from '@/hooks/useFetch';
import { EmailData } from '@/lib/interfaces';

const EmailsPage: React.FC = () => {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [maxResults, setMaxResults] = useState(15);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
  const [isClassify, setIsClassify] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(false);
  // const [accessToken, setAccessToken] = useState<string | null>(null);

  const router = useRouter();
  // const searchParams = useSearchParams();
  const CURRENT_STATE = "production";
  const BACKEND_URL = CURRENT_STATE == "production" ? "https://email-classifications-gpt.onrender.com" : "http://localhost:8000";

  const { data: profileData } = useFetch(`${BACKEND_URL}/api/profile`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  useEffect(() => {
    if (profileData) setProfile(profileData);
  }, [profileData]);

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${BACKEND_URL}/api/mails?maxResults=${maxResults}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!response.ok) throw new Error('Failed to fetch emails');
        const data = await response.json();
        setEmails(data);
      } catch (err) {
        console.error('Error fetching emails:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [maxResults]);

  // useEffect(()=>{
  //   const accessToken = localStorage.getItem('accessToken');
  //   if (!token) {
  //     alert('Access token not found, try logging again');
  //     router.push('/');
  //   } else {
  //     setAccessToken(token);
  //   }
  // },[])

  const handleCardClick = async (email: EmailData) => {
    setLoading(true);
    try {
      if (isClassify) {
        const res = emails.find((em: EmailData) => em.id === email.id);
        if (res) {
          setSelectedEmail(res);
        } else {
          console.error('Email not found');
        }
        setIsDrawerOpen(true);
        setLoading(false);
        return;
      }
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${BACKEND_URL}/api/mails/${email.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ isFilter: true }),
      });
      if (!response.ok) throw new Error('Failed to fetch email details');
      const data = await response.json();
      setSelectedEmail(data);
      setIsDrawerOpen(true);
    } catch (err) {
      console.error('Error fetching email:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedEmail(null);
  };

  const handleSelectChange = (value: string) => setMaxResults(Number(value));

  const handleClassify = async () => {
    setLoading(true);
    try {
      const openAIKey = localStorage.getItem('openAIKey');
      if (!openAIKey) {
        alert('OpenAI API key not found, please enter the key');
        router.push('/openai');
        return;
      }
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${BACKEND_URL}/api/classify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ emails, openAIKey }),
      });
      if (!response.ok) throw new Error('Failed to classify emails');
      const data = await response.json();
      setEmails(data);
      setIsClassify(true);
    } catch (err) {
      console.error('Error fetching emails:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {loading ? (
        <LoadingSpinner className="animate-spin" />
      ) : (
        <>
          <nav className="flex items-center justify-between w-full max-w-4xl p-4">
            <Profile emailAddress={profile?.emailAddress} />
            <Button variant="secondary" onClick={handleClassify}>
              Classify
            </Button>
          </nav>
          <div className="flex flex-col items-start w-full max-w-2xl p-4 space-y-4">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger id="dropdown" aria-label="Select number of messages">
                <SelectValue placeholder={String(maxResults)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col w-full space-y-3">
              {emails.map((email) => (
                <EmailCard key={email.id} email={email} onClick={handleCardClick} />
              ))}
            </div>
          </div>
        </>
      )}
      <EmailDrawer email={selectedEmail} isOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </div>
  );
};

export default EmailsPage;
