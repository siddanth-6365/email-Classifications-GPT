"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface EmailData {
  id: string;
  snippet: string;
  historyId: string;
}

const EmailsPage: React.FC = () => {
  const [emails, setEmails] = useState([]);
  const [maxResults, setMaxResults] = useState(15);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [isclassify, setisclassify] = useState(false)
  const [profile, setProfile] = useState<any>({});

  const router = useRouter();
  const searchParams = useSearchParams();
  // const BACKEND_URL = "http://localhost:8000"; // local
  const BACKEND_URL = "https://email-classifications-gpt.onrender.com"

  const fetchProfile = async () => {
    console.log("fetching profile")
    setIsLoading(true)
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(`${BACKEND_URL}/api/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      });

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchEmails = async () => {
    console.log("fetching emails")
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `${BACKEND_URL}/api/mails?maxResults=${maxResults}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }
      const data = await response.json();
      setEmails(data);
    } catch (err) {
      console.error("Error fetching emails:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = async (email: EmailData) => {
    setIsLoading(true);
    if (isclassify) {
      const res = emails.find((em: any) => em.id === email.id);
      if (res) {
        setSelectedEmail(res);
      } else {
        console.error("Email not found");
      }
      setIsDrawerOpen(true);
      setIsLoading(false);
    } else {

      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          router.push("/");
          return;
        }

        const response = await fetch(`${BACKEND_URL}/api/mails/${email.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ isFilter: true }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch email details");
        }

        const data = await response.json();
        setSelectedEmail(data);
        setIsDrawerOpen(true);
      } catch (err) {
        console.error("Error fetching email:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedEmail(null);
  };

  const handleSelectChange = (value: string) => {
    setMaxResults(Number(value));
  };

  const handleClassify = async () => {
    setIsLoading(true)
    try {
      const accessToken = localStorage.getItem("accessToken");
      const openAIKey = localStorage.getItem("openAIKey")
      if (!accessToken || !openAIKey) {
        router.push("/");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/api/classify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ emails: emails, openAIKey: openAIKey }),
      });

      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to classify emails");
      }
      const data = await response.json();
      setEmails(data);
      setisclassify(true)
    } catch (err) {
      console.error("Error fetching emails:", err);
    } finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    fetchEmails();
  }, [maxResults]);

  useEffect(() => {
    const accessTokenFromUrl = searchParams.get("accessToken");
    if (accessTokenFromUrl) {
      localStorage.setItem("accessToken", accessTokenFromUrl);
      fetchProfile();
      fetchEmails();
    } else {
      console.log("no accessToken")
      router.push("/");
    }
  }, []);

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {loading ? (
        <LoadingSpinner className="animate-spin" />
      ) : (
        <>
          <nav className="flex items-center justify-between w-full max-w-4xl p-4">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="" alt="Deadpool" />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
              <div>
                {/* <div className="text-white">{profile.name}</div> */}
                <div className="text-gray-400">{profile?.emailAddress}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="secondary" onClick={handleClassify} >Classify</Button>
            </div>
          </nav>
          <div className="flex flex-col items-start w-full max-w-2xl p-4 space-y-4">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger id="dropdown" aria-label="Select number of messages">
                <SelectValue placeholder={maxResults} />
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
              {emails.map((email: any) => (
                <Card key={email.id} onClick={() => handleCardClick(email)} className="bg-gray-800 p-4 border border-gray-700">
                  <CardContent >
                    <div className="text-white flex justify-between"><p>Email ID: {email.id}</p>
                      {email.category && (
                        <p className=" font-semibold">{email.category}</p>
                      )}
                    </div>
                    <p className="text-gray-400">{email.snippet}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      <Drawer open={isDrawerOpen} onClose={handleDrawerClose}>
        <DrawerContent>
          <DrawerHeader>

            <DrawerTitle>{selectedEmail?.subject}</DrawerTitle>
            <DrawerDescription>From: {selectedEmail?.from}</DrawerDescription>
            <DrawerDescription>
              {selectedEmail?.category && `Category: ${selectedEmail.category}`}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 prose prose-sm prose-gray dark:prose-invert max-w-none">
            <p>{selectedEmail?.snippet}</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleDrawerClose}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>

  );
};

export default EmailsPage;
