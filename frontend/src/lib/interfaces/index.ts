export interface EmailData {
  id: string;
  snippet: string;
  historyId?: string;
  subject?: string;
  from?: string;
  category?: string;
}

export interface EmailCardProps {
  email: EmailData;
  onClick: (email: EmailData) => void;
}

export interface EmailDrawerProps {
  email: EmailData | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface ProfileProps {
  emailAddress: string;
}
