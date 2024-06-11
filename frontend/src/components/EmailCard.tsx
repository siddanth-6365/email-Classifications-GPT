import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EmailCardProps } from '@/lib/interfaces';

const EmailCard: React.FC<EmailCardProps> = ({ email, onClick }) => (
  <Card onClick={() => onClick(email)} className="bg-gray-800 p-4 border border-gray-700">
    <CardContent>
      <div className="text-white flex justify-between">
        <p>Email ID: {email.id}</p>
        {email.category && <p className="font-semibold">{email.category}</p>}
      </div>
      <p className="text-gray-400">{email.snippet}</p>
    </CardContent>
  </Card>
);

export default EmailCard;