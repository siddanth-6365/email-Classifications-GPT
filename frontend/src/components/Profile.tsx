import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProfileProps } from '@/lib/interfaces';

const Profile: React.FC<ProfileProps> = ({ emailAddress }) => (
  <div className="flex items-center space-x-2">
    <Avatar>
      <AvatarImage src="" alt="Profile" />
      <AvatarFallback>DP</AvatarFallback>
    </Avatar>
    <div>
      <div className="text-gray-400">{emailAddress}</div>
    </div>
  </div>
);

export default Profile;
