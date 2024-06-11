import { useRouter } from "next/navigation";
import { EmailData } from "../interfaces";

export const fetchEmails = async (
  maxResults: number,
  setIsLoading: (loading: boolean) => void,
  setEmails: (emails: EmailData[]) => void,
  router: ReturnType<typeof useRouter>
) => {
  setIsLoading(true);
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/");
      return;
    }
    const response = await fetch(
      `http://localhost:8000/api/mails?maxResults=${maxResults}`,
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

export const handleCardClick = async (
  email: EmailData,
  isclassify: boolean,
  emails: EmailData[],
  setSelectedEmail: (email: EmailData | null) => void,
  setIsDrawerOpen: (open: boolean) => void,
  setIsLoading: (loading: boolean) => void,
  router: ReturnType<typeof useRouter>
) => {
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

      const response = await fetch(
        `http://localhost:8000/api/mails/${email.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ isFilter: true }),
        }
      );

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

export const fetchProfile = async (
  setProfile: (profile: any) => void,
  setIsLoading: (loading: boolean) => void
) => {
  setIsLoading(true);
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:8000/api/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch emails");
    }

    const data = await response.json();
    setProfile(data);
  } catch (err) {
    console.error("Error fetching profile:", err);
  } finally {
    setIsLoading(false);
  }
};
