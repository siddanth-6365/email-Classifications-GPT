import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { EmailDrawerProps } from '@/lib/interfaces';

const EmailDrawer: React.FC<EmailDrawerProps> = ({ email, isOpen, onClose }) => (
  <Drawer open={isOpen} onClose={onClose}>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{email?.subject}</DrawerTitle>
        <DrawerDescription>From: {email?.from}</DrawerDescription>
        {email?.category && <DrawerDescription>Category: {email.category}</DrawerDescription>}
      </DrawerHeader>
      <div className="px-4 prose prose-sm prose-gray dark:prose-invert max-w-none">
        <p>{email?.snippet}</p>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export default EmailDrawer;
